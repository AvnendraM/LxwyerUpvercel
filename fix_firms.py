import re
import random

with open("frontend/src/data/lawFirmsData.js", "r") as f:
    data = f.read()

def replacer(match):
    metrics = f'{{"cases_resolved": {random.randint(100, 800)}, "csat": {round(random.uniform(4.5, 5.0), 1)}}}'
    new_fields = f""",
    managing_partners: [{{name: 'Managing Partner', bar_council_id: 'MH/123/2005', years_experience: 15}}],
    languages_spoken: ['English', 'Hindi'],
    billing_models: ['Hourly', 'Retainer', 'Flat Rate'],
    branch_offices: ['Delhi', 'Mumbai'],
    gstin_number: '27AABCU9603R1Z2',
    bar_council_id_primary: 'D/{random.randint(1000,9999)}/2000',
    kyc_documents: {{ incorporation: 'https://example.com/inc.pdf', pan: 'https://example.com/pan.pdf' }},
    current_capacity_status: 'open',
    average_response_time_mins: {random.randint(5, 30)},
    platform_metrics: {metrics}
  }}"""
    return new_fields

# Replace "  }," with "  ...new_fields }"
# We look for "achievements: '...'\n  }" or similar. Actually, let's just match "\n  }" globally? Better yet, match "  }" that precedes "," or end of array.
processed = re.sub(r'\n  \}', replacer, data)

with open("frontend/src/data/lawFirmsData.js", "w") as f:
    f.write(processed)
print("Data updated!")
