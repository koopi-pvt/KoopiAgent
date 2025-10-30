import { MessageSquare, Plus } from 'lucide-react';

interface Chat {
  id: string;
  title: string;
  messages: any[];
  createdAt: Date;
}

interface ChatHistoryProps {
  chats: Chat[];
  currentChat: string | null;
  onSelectChat: (chatId: string | null) => void;
}

export default function ChatHistory({ chats, currentChat, onSelectChat }: ChatHistoryProps) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-3xl backdrop-blur-sm p-6 animate-slide-up-delay-2">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-white font-semibold text-lg flex items-center space-x-2">
          <MessageSquare className="w-5 h-5" />
          <span>Chat History</span>
        </h2>
        <button
          onClick={() => onSelectChat(null)}
          className="p-2 bg-white/5 hover:bg-white/10 rounded-xl transition-all duration-300 border border-white/10"
          title="New Chat"
        >
          <Plus className="w-5 h-5 text-white" />
        </button>
      </div>

      <div className="space-y-2 max-h-[540px] overflow-y-auto">
        {chats.length > 0 ? (
          chats.map((chat) => (
            <button
              key={chat.id}
              onClick={() => onSelectChat(chat.id)}
              className={`w-full text-left p-4 rounded-xl transition-all duration-300 border ${
                currentChat === chat.id
                  ? 'bg-white/10 border-white/20'
                  : 'bg-white/5 border-white/10 hover:bg-white/10'
              }`}
            >
              <p className="text-white font-medium text-sm truncate mb-1">
                {chat.title}
              </p>
              <p className="text-white/40 text-xs">
                {chat.createdAt.toLocaleDateString()} • {chat.messages.length} messages
              </p>
            </button>
          ))
        ) : (
          <div className="text-center py-12">
            <MessageSquare className="w-12 h-12 text-white/20 mx-auto mb-3" />
            <p className="text-white/40 text-sm">No chats yet</p>
            <p className="text-white/30 text-xs mt-1">Start a conversation to see history</p>
          </div>
        )}
      </div>
    </div>
  );
}