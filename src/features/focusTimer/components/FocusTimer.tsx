import { Eye } from "lucide-react";

import { cn } from "@/utils/cn";

interface IFocusTimerProps {
    className?: string
}

export function FocusTimer({ className }: IFocusTimerProps) {
    return (
        <div className={cn("border-gray-200 border rounded-md p-4 flex flex-col", className)}>
            <div className="timer-part flex justify-center">
                <div className="h-64 w-64 rounded-full border border-amber-400 flex flex-col items-center pt-15">
                    <Eye />
                    <h2 className="text-4xl font-bold">15:02</h2>
                    <span className="text-xs">FOCUS</span>
                </div>
            </div>
            <div className="controls-part">
                <button>Start</button>
            </div>
        </div>

    );
}
