import React, { useState } from "react";

export default function CustomerCard({ customer }) {
  const [tagInput, setTagInput] = useState("");
  if (!customer) {
    return <div className="p-6 text-slate-400">No customer selected</div>;
  }

  const suggestions = ["Order", "Repeat Buyer", "VIP", "Refund", "Urgent"];

  function addTag(t) {
    if (!t?.trim()) return;
    if (customer.tags.includes(t)) return;
    customer.tags.push(t);
    setTagInput("");
  }

  return (
    <div className="p-6">
      <div className="bg-white rounded-lg shadow px-4 py-5">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-brand1 to-brand2 text-white flex items-center justify-center text-2xl font-bold">
            {customer.name.slice(0,1).toUpperCase()}
          </div>
          <div>
            <div className="font-semibold text-lg">{customer.name}</div>
            <div className="text-sm text-slate-500">{customer.phone}</div>
          </div>
        </div>

        <div className="mt-4">
          <div className="text-xs text-slate-400">Order ID</div>
          <div className="font-medium">{customer.orderId}</div>
        </div>

        <div className="mt-4">
          <div className="text-xs text-slate-400">Tags</div>
          <div className="flex gap-2 mt-2 flex-wrap">
            {customer.tags.map((t, i) => (
              <div key={i} className="text-xs bg-slate-100 px-2 py-1 rounded-full">{t}</div>
            ))}
          </div>

          <div className="mt-3">
            <input value={tagInput} onChange={(e)=>setTagInput(e.target.value)} placeholder='Add tag (e.g. "Order")' className="w-full border px-2 py-2 rounded" onKeyDown={(e)=> { if(e.key==="Enter"){ addTag(tagInput) }}} />
            <div className="flex gap-2 mt-2 flex-wrap">
              {suggestions.map(s => (<button key={s} onClick={()=>addTag(s)} className="text-xs px-2 py-1 rounded bg-gray-50 border">{s}</button>))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
