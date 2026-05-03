import { useState, useRef, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function AssistantPastorUI() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const bottomRef = useRef(null);

  const quickPrompts = [
    "Pray for me",
    "Explain a Bible verse",
    "I need life advice",
    "Help me prepare a sermon",
  ];

  // 🔽 Auto scroll
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async (text) => {
    if (!text.trim() || loading) return;

    const newMessages = [...messages, { role: "user", content: text }];

    setMessages(newMessages);
    setInput("");
    setLoading(true);

    // 👇 Add temporary loading message
    setMessages((prev) => [
      ...newMessages,
      { role: "assistant", content: "Typing..." },
    ]);

    try {
      const res = await fetch(
        "https://assistant-pastor.onrender.com/api/spiritual",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userPrompt: text,
          }),
        },
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Something went wrong");
      }

      // 👇 Replace "Typing..." with real response
      setMessages((prev) => [
        ...prev.slice(0, -1),
        { role: "assistant", content: data.message },
      ]);
    } catch (err) {
      setMessages((prev) => [
        ...prev.slice(0, -1),
        {
          role: "assistant",
          content: `⚠️ ${err.message || "Error occurred"}`,
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f7f4ef] flex flex-col items-center p-4">
      {/* Top Bar */}
      <div className="w-full max-w-2xl text-center mb-4">
        <h1 className="text-2xl font-semibold text-purple-800">
          Assistant Pastor 🙏
        </h1>
        <p className="text-gray-500 text-sm">
          Ask for guidance, prayer, or scripture
        </p>
      </div>

      {/* Chat Area */}
      <div className="w-full max-w-2xl flex-1 space-y-3 overflow-y-auto mb-4">
        {messages.map((msg, i) => (
          <Card
            key={i}
            className={`p-3 ${
              msg.role === "user" ? "bg-purple-100 text-right" : "bg-white"
            }`}
          >
            <CardContent className="whitespace-pre-wrap">
              {msg.content}
            </CardContent>
          </Card>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Quick Actions */}
      <div className="w-full max-w-2xl flex flex-wrap gap-2 mb-4 justify-center">
        {quickPrompts.map((q, i) => (
          <Button
            key={i}
            variant="outline"
            disabled={loading}
            onClick={() => sendMessage(q)}
          >
            {q}
          </Button>
        ))}
      </div>

      {/* Input */}
      <div className="w-full max-w-2xl flex gap-2">
        <Input
          value={input}
          disabled={loading}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
          onKeyDown={(e) => {
            if (e.key === "Enter") sendMessage(input);
          }}
        />
        <Button disabled={loading} onClick={() => sendMessage(input)}>
          {loading ? "..." : "Send"}
        </Button>
      </div>
    </div>
  );
}
