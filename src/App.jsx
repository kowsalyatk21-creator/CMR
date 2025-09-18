import React, { useState, useMemo } from "react";
import { defaultChats, customers } from "./data/mockData";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import ChatList from "./components/ChatList";
import ChatWindow from "./components/ChatWindow";
import CustomerCard from "./components/CustomerCard";

export default function App() {
  const [chats, setChats] = useState(defaultChats);
  const [selectedChatId, setSelectedChatId] = useState(chats[0]?.id || null);

  const selectedChat = useMemo(
    () => chats.find((c) => c.id === selectedChatId) || null,
    [chats, selectedChatId]
  );

  const selectedCustomer = useMemo(
    () => customers.find((c) => c.id === selectedChat?.customerId) || null,
    [selectedChat]
  );

  function handleSend(chatId, text) {
    if (!text.trim()) return;
    setChats((prev) =>
      prev.map((c) => {
        if (c.id !== chatId) return c;
        const msg = {
          id: "m" + Date.now(),
          from: "agent",
          text,
          time: Date.now(),
          read: false,
        };
        return {
          ...c,
          messages: [...c.messages, msg],
          lastMessage: text,
          lastTimestamp: Date.now(),
        };
      })
    );
    // simulate reply after 1.2s
    setTimeout(() => {
      setChats((prev) =>
        prev.map((c) => {
          if (c.id !== chatId) return c;
          const reply = {
            id: "m" + (Date.now() + 1),
            from: "customer",
            text: "Thanks! We'll check and update you.",
            time: Date.now(),
            read: false,
          };
          return {
            ...c,
            messages: [...c.messages, reply],
            lastMessage: reply.text,
            lastTimestamp: Date.now(),
            unreadCount: (c.unreadCount || 0) + 1,
          };
        })
      );
    }, 1200);
  }

  function markRead(chatId) {
    setChats((prev) =>
      prev.map((c) => {
        if (c.id !== chatId) return c;
        return {
          ...c,
          unreadCount: 0,
          messages: c.messages.map((m) => ({ ...m, read: true })),
        };
      })
    );
  }

  return (
    <div className="h-screen flex bg-slate-50 text-slate-900">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <div className="flex flex-1 overflow-hidden">
          <div className="w-80 min-w-[18rem] border-r bg-white">
            <ChatList
              chats={chats}
              customers={customers}
              selectedChatId={selectedChatId}
              onSelect={(id) => {
                setSelectedChatId(id);
                markRead(id);
              }}
            />
          </div>
          <div className="flex-1 flex flex-col">
            {/* ✅ FIXED: customer prop passed here */}
            <ChatWindow
              chat={selectedChat}
              customer={selectedCustomer}
              onSend={handleSend}
            />
          </div>
          <div className="w-80 min-w-[18rem] border-l bg-white hidden md:block">
            <CustomerCard customer={selectedCustomer} />
          </div>
        </div>
      </div>
    </div>
  );
}
