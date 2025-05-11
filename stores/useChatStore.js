const { create } = require("zustand");

export const useChatStore = create((set, get) => ({
  chats: [],
  selectedChatId: null,

  selectedChat: () => {
    const { chats, selectedChatId } = get();
    return chats.find((chat) => chat.id === selectedChatId) || null;
  },

  setChats: (newChats) => set({ chats: newChats }),

  addChat: (chat) => set((state) => ({ chats: [...state.chats, chat] })),

  updateChatMessages: (chatId, messages) =>
    set((state) => ({
      chats: state.chats.map((chat) =>
        chat.id === chatId ? { ...chat, messages } : chat
      ),
    })),

  updateChatFeedback: (chatId, feedback) =>
    set((state) => ({
      chats: state.chats.map((chat) =>
        chat.id === chatId ? { ...chat, feedback } : chat
      ),
    })),

  setSelectedChatId: (id) => set({ selectedChatId: id }),

  deleteChat: (chatId) =>
    set((state) => ({
      chats: state.chats.filter((chat) => chat.id !== chatId),
      selectedChatId:
        state.selectedChatId === chatId ? null : state.selectedChatId,
    })),
}));
