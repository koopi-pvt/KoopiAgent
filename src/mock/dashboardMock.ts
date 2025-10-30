export const mockUser = {
  name: 'John Doe',
  email: 'john.doe@example.com',
  membership: 'Pro',
  credits: 1250,
  avatar: ''
};

export const mockChats = [
  {
    id: '1',
    title: 'Build a landing page for SaaS product',
    messages: [
      {
        id: '1-1',
        role: 'user' as const,
        content: 'Build a landing page for SaaS product',
        timestamp: new Date('2025-01-15T10:00:00')
      },
      {
        id: '1-2',
        role: 'assistant' as const,
        content: "I'll help you build a landing page for your SaaS product. Let me create a modern design with hero section, features, and pricing.",
        timestamp: new Date('2025-01-15T10:00:05')
      }
    ],
    createdAt: new Date('2025-01-15T10:00:00')
  },
  {
    id: '2',
    title: 'Create a blog layout',
    messages: [
      {
        id: '2-1',
        role: 'user' as const,
        content: 'Create a blog layout with sidebar',
        timestamp: new Date('2025-01-14T15:30:00')
      },
      {
        id: '2-2',
        role: 'assistant' as const,
        content: "I'll create a blog layout with a sidebar for you. This will include article cards, categories, and recent posts.",
        timestamp: new Date('2025-01-14T15:30:05')
      }
    ],
    createdAt: new Date('2025-01-14T15:30:00')
  }
];