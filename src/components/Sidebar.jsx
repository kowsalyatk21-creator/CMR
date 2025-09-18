import React from "react";

const Icon = ({ children, label }) => (
  <div title={label} className="w-11 h-11 flex items-center justify-center rounded-lg hover:bg-white/5 cursor-pointer text-white/90">
    {children}
  </div>
);

export default function Sidebar() {
  return (
    <aside className="w-16 bg-sidebar text-white flex flex-col items-center py-6 gap-4 shadow-inner">
      <div className="text-2xl">🦋</div>
      <Icon label="Inbox">📥</Icon>
      <Icon label="Orders">📦</Icon>
      <Icon label="Settings">⚙️</Icon>
      <div className="mt-auto text-xs text-white/40">v1.0</div>
    </aside>
  );
}
