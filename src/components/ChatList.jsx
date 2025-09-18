import React from "react";
import { formatDistanceToNow } from "date-fns";
import clsx from "clsx";

function ChatRow({ chat, customer, active, onClick }) {
  return (
    <div
      onClick={onClick}
      className={clsx(
        "px-4 py-3 border-b hover:bg-white/5 cursor-pointer flex items-center gap-3",
        active ? "bg-white/5" : "bg-transparent"
      )}
    >
      <div className="w-11 h-11 flex items-center justify-center rounded-lg bg-white/10 text-white/90 font-medium">
        { (customer?.name || chat.customerId || "C").toString().slice(0,2).toUpperCase() }
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <div className="text-sm font-medium text-white/95 truncate">{customer?.name || "Unknown"}</div>
          <div className="text-xs text-white/50 ml-auto">{formatDistanceToNow(chat.lastTimestamp || Date.now(), { addSuffix: true })}</div>
        </div>
        <div className="text-sm text-white/60 truncate mt-1">{chat.lastMessage}</div>
      </div>

      {chat.unreadCount > 0 && (
        <div className="ml-2 bg-rose-500 text-white text-xs rounded-full px-2 py-0.5">
          {chat.unreadCount}
        </div>
      )}
    </div>
  );
}

export default function ChatList({ chats, customers, selectedChatId, onSelect }) {
  return (
    <div className="h-full flex flex-col bg-sidebar/80 text-white">
      <div className="p-4 border-b border-white/6">
        <div className="text-lg font-semibold">Inbox</div>
        <div className="text-sm text-white/60">All conversations</div>
      </div>

      <div className="overflow-y-auto flex-1 chat-scroll p-2 space-y-1">
        {chats.map((c) => {
          const customer = customers.find((x) => x.id === c.customerId);
          return (
            <div key={c.id} className="rounded-lg overflow-hidden">
              <ChatRow
                chat={c}
                customer={customer}
                active={c.id === selectedChatId}
                onClick={() => onSelect(c.id)}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
