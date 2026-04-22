"use client";

import React from "react";
import { cn } from "../../lib/utils";

export function BeamsBackground({
    className,
    children
}) {
    return (
        <div
            className={cn(
                "relative min-h-screen w-full overflow-hidden bg-[#02050a] flex flex-col items-center justify-center",
                className
            )}
        >
            {/* Pure CSS animated background beams */}
            <div className="absolute inset-0 opacity-50">
                <div 
                    className="absolute inset-0 bg-gradient-to-tr from-blue-900/20 via-transparent to-indigo-900/20"
                />
                <div 
                    className="absolute inset-0 animate-pulse-slow"
                    style={{
                        background: 'radial-gradient(ellipse at top right, rgba(59,130,246,0.15) 0%, transparent 50%), radial-gradient(ellipse at bottom left, rgba(99,102,241,0.15) 0%, transparent 50%)'
                    }}
                />
                <div 
                    className="absolute -inset-[100%] opacity-30 animate-[spin_60s_linear_infinite]"
                    style={{
                        background: 'conic-gradient(from 0deg at 50% 50%, transparent 0deg, rgba(59,130,246,0.1) 45deg, transparent 90deg, transparent 180deg, rgba(99,102,241,0.1) 225deg, transparent 270deg)',
                    }}
                />
            </div>

            <div className="relative z-10 flex h-full w-full items-center justify-center">
                {children}
            </div>
        </div>
    );
}
