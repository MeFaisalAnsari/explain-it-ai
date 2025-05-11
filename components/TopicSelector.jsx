"use client";
import { useChatStore } from "@/stores/useChatStore";
import { SendHorizontal } from "lucide-react";
import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import FadeInUp from "./FadeInUp";

const TopicSelector = () => {
  const [topic, setTopic] = useState("");
  const [loading, setLoading] = useState(false);
  const { addChat, setSelectedChatId } = useChatStore();

  const handleStartChat = async () => {
    if (!topic?.trim()) return;

    const newChat = {
      id: uuidv4(),
      topic,
      messages: [
        {
          role: "assistant",
          content: `Hi! I'm just five, but I'm super curious. Can you explain "${topic}" to me?`,
        },
      ],
      createdAt: Date.now(),
    };
    setSelectedChatId(newChat.id);
    addChat(newChat);
    setTopic("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !loading) {
      handleStartChat();
    }
  };

  return (
    <div className="h-full max-w-3xl mx-auto text-center flex justify-center items-center p-6">
      <div>
        <FadeInUp>
          <h2 className="font-kid text-5xl text-primary">
            Explain It Like I'm Five 👶
          </h2>
        </FadeInUp>
        <FadeInUp delay={0.1} className="mt-4 text-foreground/50">
          Struggling to simplify complex ideas? This app lets you practice by
          explaining any topic like you're talking to a 5-year-old. Just enter a
          topic, chat with AI, and get feedback on how clear and simple your
          explanation is.
        </FadeInUp>

        <FadeInUp delay={0.2} className="mt-8">
          <div className="shadow-2xl rounded-full p-2 w-full flex items-center gap-6 bg-white dark:bg-white/5">
            <input
              autoFocus
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              type="text"
              onKeyDown={handleKeyDown}
              disabled={loading}
              className="flex-1 outline-none placeholder:text-foreground/50 pl-4"
              placeholder="Enter a topic (e.g., Black Holes, Inflation)"
            />
            <button
              onClick={handleStartChat}
              disabled={loading}
              className="bg-primary shadow  text-background rounded-full h-12 w-12 flex items-center justify-center hover:opacity-80 transition-opacity"
            >
              <SendHorizontal />
            </button>
          </div>
        </FadeInUp>
      </div>
    </div>
  );
};

export default TopicSelector;
