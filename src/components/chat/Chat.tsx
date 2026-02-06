"use client";

import { useState } from "react";

export default function Chat({ initialMessages }: { initialMessages: {
   id: string;
    userId: string;
    role: string;
    content: string;
    createdAt: Date | null;
}[] }) {
  const [messages, setMessages] = useState<{role: string, content: string}[]>(
    initialMessages.map(m => ({ role: m.role, content: m.content }))
  );
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const newUserMessage = { role: "user", content: input };
    setMessages((m) => [...m, newUserMessage]);
    setLoading(true);

    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        messages: [...messages, newUserMessage],
      }),
    });

    const data = await res.json();

    setMessages((m) => [...m, { role: "assistant", content: data.text }]);
    setInput("");
    setLoading(false);
  };

  return (
    <div className="space-y-4">
      {messages.map((m, i) => (
        <p key={i}>{m.role}: {m.content}</p>
      ))}

      <form onSubmit={onSubmit}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="border p-2 w-full"
          disabled={loading}
        />
      </form>

      {loading && <p className="text-sm text-gray-500">Thinking…</p>}
    </div>
  );
}
