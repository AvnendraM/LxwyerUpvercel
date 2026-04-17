from fastapi import APIRouter, Depends, HTTPException, Query
from typing import List
from datetime import datetime, timezone, timedelta
import uuid
import asyncio

from models.network import NetworkMessage, NetworkMessageCreate
from models.user import User
from services.database import db
from routes.auth import get_current_user

router = APIRouter(prefix="/network", tags=["Network"])

# ── Simple in-memory user-info cache (avoids repeated DB lookups on every 3-second poll) ──
_user_cache: dict = {}          # id -> (data, expiry_datetime)
_CACHE_TTL = timedelta(seconds=30)

async def _get_user_info(user_id: str) -> dict:
    """Return cached user info, refreshing from DB when stale."""
    entry = _user_cache.get(user_id)
    if entry and entry[1] > datetime.now(timezone.utc):
        return entry[0]
    user = await db.users.find_one({'id': user_id}, {
        'photo': 1, 'unique_id': 1, 'bio': 1,
        'specialization': 1, 'education': 1, '_id': 0
    })
    info = user or {}
    _user_cache[user_id] = (info, datetime.now(timezone.utc) + _CACHE_TTL)
    return info

# Ensure indexes exist (called once on startup via lifespan or first request)
_index_created = False
async def _ensure_indexes():
    global _index_created
    if not _index_created:
        await db.network_messages.create_index(
            [("state", 1), ("timestamp", -1)], background=True
        )
        _index_created = True

@router.post("/messages")
async def send_network_message(
    message_data: NetworkMessageCreate,
    state: str = Query(None),
    current_user: dict = Depends(get_current_user)
):
    """Send a message to the user's state network"""
    # If state is explicitly provided via query (e.g., from Admin Dashboard), use it.
    # Otherwise fallback to the user's own state, or default to Delhi.
    user_state = state if state else current_user.get("state")
    
    # Fallback to Delhi if no state (e.g., legacy users or manual testing)
    if not user_state:
         user_state = "Delhi"

    new_message = NetworkMessage(
        sender_id=current_user["id"],
        sender_name=current_user.get("full_name", "Unknown Lawyer"),
        sender_type=current_user.get("user_type", "lawyer"),
        state=user_state,
        content=message_data.content,
        file_url=message_data.file_url,
        file_name=message_data.file_name,
        file_type=message_data.file_type
    )
    
    # Add sender photo for frontend display - OPTIONAL: Add to model if needed persistent, 
    # but for now we can just rely on joining user data or client fetching profile.
    # Actually, saving it in message is easier for historical context, but data duplication.
    # Let's just return it in the response for immediate UI update.
    
    msg_dict = new_message.model_dump()
    result = await db.network_messages.insert_one(msg_dict)
    
    # Return enriched data for frontend
    msg_dict['_id'] = str(result.inserted_id)
    msg_dict['sender_photo'] = current_user.get('photo')
    msg_dict['sender_unique_id'] = current_user.get('unique_id')
    
    return {"message": "Message sent", "data": msg_dict}

@router.get("/messages", response_model=List[dict])
async def get_network_messages(
    state: str = Query(None),
    current_user: dict = Depends(get_current_user),
    limit: int = Query(80, ge=1, le=100)
):
    """Get messages for the user's state network with sender details"""
    await _ensure_indexes()

    user_state = state if state else current_user.get("state")

    if not user_state or user_state == "All States":
        if user_state == "All States":
            cursor = db.network_messages.find({}).sort("timestamp", -1).limit(limit)
        else:
            user_state = "Delhi"
            cursor = db.network_messages.find({"state": user_state}).sort("timestamp", -1).limit(limit)
    else:
        cursor = db.network_messages.find({"state": user_state}).sort("timestamp", -1).limit(limit)

    messages = await cursor.to_list(length=limit)

    # Enrich messages with cached sender details
    unique_sender_ids = list(set(msg['sender_id'] for msg in messages))
    # Fetch all at once for cache misses, then prime the cache
    cache_misses = [uid for uid in unique_sender_ids if uid not in _user_cache or _user_cache[uid][1] <= datetime.now(timezone.utc)]
    if cache_misses:
        users = await db.users.find(
            {'id': {'$in': cache_misses}},
            {'id': 1, 'photo': 1, 'unique_id': 1, 'bio': 1, 'specialization': 1, 'education': 1, '_id': 0}
        ).to_list(length=len(cache_misses))
        expiry = datetime.now(timezone.utc) + _CACHE_TTL
        for u in users:
            _user_cache[u['id']] = (u, expiry)

    result = []
    for msg in messages:
        if "_id" in msg:
            del msg["_id"]
        sender_entry = _user_cache.get(msg['sender_id'])
        if sender_entry:
            sender = sender_entry[0]
            msg['sender_photo'] = sender.get('photo')
            msg['sender_unique_id'] = sender.get('unique_id')
            msg['sender_bio'] = sender.get('bio')
            msg['sender_specialization'] = sender.get('specialization')
            msg['sender_education'] = sender.get('education')
        result.append(msg)

    return result
