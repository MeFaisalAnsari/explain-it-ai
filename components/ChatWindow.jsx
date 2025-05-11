"use client";
import { useChatStore } from "@/stores/useChatStore";
import { SendHorizontal, UserRound } from "lucide-react";
import React, { use, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import clsx from "clsx";

const ChatWindow = () => {
  const { chats, selectedChatId, updateChatMessages } = useChatStore();
  const selectedChat = chats.find((chat) => chat.id === selectedChatId);
  const { messages } = selectedChat || {};
  const [loading, setLoading] = useState(false);

  const [userInput, setUserInput] = useState("");

  const inputRef = useRef(null);
  const bottomRef = useRef(null);

  const handleSendMessage = async () => {
    if (!userInput.trim() || loading) return;
    const newMessage = {
      role: "user",
      content: userInput,
    };
    const updatedMessages = [...(messages || []), newMessage];
    updateChatMessages(selectedChatId, updatedMessages);
    setUserInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: updatedMessages }),
      });

      if (!res.ok) throw new Error("Failed to fetch AI response");

      const data = await res.json();

      if (data?.message) {
        updateChatMessages(selectedChatId, [
          ...updatedMessages,
          { role: "assistant", content: data.message },
        ]);
      }
    } catch (error) {
      updateChatMessages(selectedChatId, [
        ...updatedMessages,
        {
          role: "assistant",
          content: "Something went wrong. Try again later.",
        },
      ]);
    } finally {
      setLoading(false);
      if (inputRef.current) {
        setTimeout(() => inputRef.current.focus(), 300);
      }
    }
  };

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
    }
  }, [messages]);

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({
        block: "end",
      });
    }
  }, [selectedChatId]);

  return (
    <motion.div
      key={selectedChatId}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="h-full flex flex-col"
    >
      <div className="flex-1 overflow-y-auto pt-6">
        {messages?.length > 0 && (
          <div className="max-w-3xl mx-auto px-6 space-y-8">
            {messages.map((message, index) => (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
                key={index}
                className="flex gap-4 items-start"
              >
                <div
                  className={clsx(
                    "w-8 h-8 rounded-full flex justify-center items-center shrink-0",
                    message.role === "user" && "bg-primary text-background"
                  )}
                >
                  {message.role === "assistant" ? (
                    <span className="text-xl">👶</span>
                  ) : (
                    <UserRound size={16} />
                  )}
                </div>
                <p
                  className={clsx(
                    "mt-1",
                    message.role === "assistant" && "font-kid tracking-wide"
                  )}
                >
                  {message.content}
                </p>
              </motion.div>
            ))}
            {loading && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2, delay: 0.1 }}
                className="flex gap-4 items-start"
              >
                <div className="w-8 h-8 rounded-full flex justify-center items-center">
                  <span className="text-xl">👶</span>
                </div>
                <p className="animate-pulse text-2xl">...</p>
              </motion.div>
            )}
          </div>
        )}
        <div ref={bottomRef} className="h-10" />
      </div>

      <div className="shadow-2xl rounded-full p-2 w-full flex items-center gap-4 bg-white dark:bg-white/5 max-w-3xl mx-auto ">
        <input
          autoFocus
          ref={inputRef}
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          type="text"
          onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
          disabled={loading}
          className="flex-1 outline-none placeholder:text-foreground/50 pl-4"
          placeholder="Type your message..."
        />
        <button
          onClick={handleSendMessage}
          disabled={loading}
          className="bg-primary shadow text-background rounded-full h-12 w-12 flex items-center justify-center hover:opacity-80 transition-opacity"
        >
          <SendHorizontal />
        </button>
      </div>
    </motion.div>
  );
};

export default ChatWindow;
