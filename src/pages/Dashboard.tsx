import { useState } from 'react';
import DashboardNav from '../components/dashboard/DashboardNav';
import PromptBox from '../components/dashboard/PromptBox';
import ChatHistory from '../components/dashboard/ChatHistory';
import { mockUser, mockChats } from '../mock/dashboardMock';

export default function Dashboard() {
  const [chats, setChats] = useState(mockChats);
  const [currentChat, setCurrentChat] = useState<string | null>(null);

  const handleSendMessage = (message: string) => {
    console.log('Sending message:', message);
    // For now, just add to chat history with mock response
    const newMessage = {
      id: Date.now().toString(),
      role: 'user' as const,
      content: message,
      timestamp: new Date()
    };
    
    const aiResponse = {
      id: (Date.now() + 1).toString(),
      role: 'assistant' as const,
      content: 'This is a mock AI response. Backend integration will enable real AI interactions.',
      timestamp: new Date()
    };

    if (currentChat) {
      setChats(prev => prev.map(chat => 
        chat.id === currentChat 
          ? { ...chat, messages: [...chat.messages, newMessage, aiResponse] }
          : chat
      ));
    } else {
      const newChat = {
        id: Date.now().toString(),
        title: message.slice(0, 50),
        messages: [newMessage, aiResponse],
        createdAt: new Date()
      };
      setChats(prev => [newChat, ...prev]);
      setCurrentChat(newChat.id);
    }
  };

  const currentMessages = currentChat 
    ? chats.find(chat => chat.id === currentChat)?.messages || []
    : [];

  return (
    <div className="min-h-screen bg-black">
      <DashboardNav user={mockUser} />
      
      <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-24 pb-12">
        <div className="text-center mb-12 animate-slide-up">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-4">
            Welcome back,
            <br />
            <span className="hero-gradient">{mockUser.name}</span>
          </h1>
          <p className="text-xl text-white/60 max-w-2xl mx-auto">
            What would you like to create today?
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2">
            <PromptBox 
              onSend={handleSendMessage}
              messages={currentMessages}
            />
          </div>
          
          <div className="lg:col-span-1">
            <ChatHistory 
              chats={chats}
              currentChat={currentChat}
              onSelectChat={setCurrentChat}
            />
          </div>
        </div>
      </div>
    </div>
  );
}