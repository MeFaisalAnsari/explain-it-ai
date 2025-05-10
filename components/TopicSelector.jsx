import { SendHorizontal } from "lucide-react";
import React from "react";

const TopicSelector = () => {
  return (
    <div>
      <h2 className="font-semibold text-3xl">Explain It Like I'm Five 👶</h2>
      <p className="mt-4 text-foreground/50">
        Struggling to simplify complex ideas? This app lets you practice by
        explaining any topic like you're talking to a 5-year-old. Just enter a
        topic, chat with AI, and get feedback on how clear and simple your
        explanation is.
      </p>

      <div className="border shadow-md rounded-full p-4 pl-6 mt-8 w-full flex items-center gap-6">
        <input
          type="text"
          className="flex-1 outline-none text-lg font-medium placeholder:text-foreground/50"
          placeholder="Enter a topic (e.g., Black Holes, Inflation)"
        />
        <button className="bg-primary text-background rounded-full h-10 w-10 flex items-center justify-center hover:opacity-80 transition-opacity">
          <SendHorizontal />
        </button>
      </div>
    </div>
  );
};

export default TopicSelector;
