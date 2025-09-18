import React from "react";
import clsx from "clsx";
import { format } from "date-fns";

export default function MessageBubble({ message }) {
  const time = format(new Date(message.time), "hh:mm a");

  if (message.from === "agent") {
    return (
      <div className="flex justify-end mb-3">
        <div className="max-w-[70%] px-3 py-2 rounded-xl shadow-sm"
             style={{ background: "linear-gradient(135deg,var(--tw-color-brand1,#6d28d9),var(--tw-color-brand2,#ec4899))", color: "white" }}>
          <div className="whitespace-pre-wrap">{message.text}</div>
          <div className="text-xs mt-1 flex items-center justify-end gap-2 opacity-90">
            <span>{time}</span>
            <span className="text-green-200">✓✓</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-start mb-3">
      <div className="max-w-[70%] bg-white shadow-sm px-3 py-2 rounded-xl border border-white/30">
        <div className="whitespace-pre-wrap text-slate-700">{message.text}</div>
        <div className="text-xs text-slate-400 mt-1">{time}</div>
      </div>
    </div>
  );
}
