import React from "react";

export default function Header() {
  return (
    <header className="h-14 flex items-center px-6 border-b" style={{ background: "linear-gradient(90deg,#6d28d9,#ec4899)" }}>
      <div className="text-white text-xl font-semibold">Mini CRM</div>
      <div className="text-white/80 ml-3 hidden sm:block">Inbox</div>

      <div className="ml-auto hidden md:flex items-center gap-3">
        <input className="px-4 py-2 rounded-full w-64 border border-white/20 bg-white/10 text-white placeholder-white/60" placeholder="Search chats..." />
      </div>
    </header>
  );
}
