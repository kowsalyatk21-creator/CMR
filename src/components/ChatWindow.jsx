import React, { useState, useEffect, useRef } from "react";
import MessageBubble from "./MessageBubble";

export default function ChatWindow({ chat, customer, onSend }) {
  const [text, setText] = useState("");
  const [showEmoji, setShowEmoji] = useState(false);
  const [typing, setTyping] = useState(false);
  const boxRef = useRef();

  useEffect(() => {
    setText("");
  }, [chat?.id]);

  useEffect(() => {
    if (!chat) return;
    const last = chat.messages[chat.messages.length - 1];
    if (last && last.from === "customer" && (chat.unreadCount || 0) > 0) {
      setTyping(true);
      const t = setTimeout(() => setTyping(false), 1200);
      return () => clearTimeout(t);
    } else setTyping(false);
  }, [chat]);

  // ✅ Always scroll to bottom when messages change
  useEffect(() => {
    if (boxRef.current) {
      boxRef.current.scrollTop = boxRef.current.scrollHeight;
    }
  }, [chat?.messages, typing]);

  if (!chat) {
    return (
      <div className="flex-1 flex items-center justify-center text-slate-400">
        Select a chat to start
      </div>
    );
  }

  function handleSend() {
    if (!text.trim()) return;
    onSend(chat.id, text.trim());
    setText("");
  }

  function insertEmoji(emo) {
    setText((t) => t + emo);
    setShowEmoji(false);
  }

  const displayName =
    customer?.name || chat?.name || chat?.customerId || "Customer";

  return (
    <div className="flex-1 flex flex-col bg-chat-surface">
      {/* ✅ Header stays fixed */}
      <div className="px-6 py-4 border-b bg-white flex items-center gap-4 shrink-0">
        <div className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center font-semibold text-lg text-slate-700">
          {displayName.slice(0, 1).toUpperCase()}
        </div>
        <div className="flex flex-col">
          <div className="font-semibold text-slate-900">{displayName}</div>
          <div className="text-xs text-slate-500">Active now</div>
        </div>
      </div>

      {/* ✅ Scroll only messages */}
      <div ref={boxRef} className="flex-1 overflow-y-auto p-6">
        {chat.messages.map((m) => (
          <MessageBubble key={m.id} message={m} />
        ))}
        {typing && (
          <div className="flex items-center gap-2 mt-3">
            <div className="w-8 h-8 rounded-full bg-white/80" />
            <div className="flex items-center gap-1 pl-2">
              <div className="w-2 h-2 bg-slate-400 rounded-full typing-dot" />
              <div
                className="w-2 h-2 bg-slate-400 rounded-full typing-dot"
                style={{ animationDelay: "0.15s" }}
              />
              <div
                className="w-2 h-2 bg-slate-400 rounded-full typing-dot"
                style={{ animationDelay: "0.3s" }}
              />
            </div>
          </div>
        )}
      </div>

      {/* ✅ Input stays fixed */}
      <div className="border-t p-4 bg-white flex items-center gap-3 shrink-0">
        <button
          onClick={() => setShowEmoji((s) => !s)}
          className="p-2 rounded-full hover:bg-slate-100"
        >
          😊
        </button>
        {showEmoji && (
          <div className="absolute bottom-20 left-28 bg-white border rounded shadow-md z-50 p-2 flex gap-1">
            {["👍", "😀", "🎉", "❤️", "🔥"].map((e) => (
              <button
                key={e}
                onClick={() => insertEmoji(e)}
                className="p-1 hover:bg-slate-100 rounded"
              >
                {e}
              </button>
            ))}
          </div>
        )}

        <div className="flex-1 relative">
          <input
            placeholder="Type a message"
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full rounded-full border px-5 py-3"
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSend();
            }}
          />
          <button
            onClick={handleSend}
            className="absolute right-1 top-1/2 -translate-y-1/2 bg-brand1 hover:bg-brand2 text-white w-10 h-10 rounded-full flex items-center justify-center shadow"
          >
            ➤
          </button>
        </div>
      </div>
    </div>
  );
}

