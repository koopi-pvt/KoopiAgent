export const mockUser = {
  name: 'John Doe',
  email: 'john.doe@example.com',
  membership: 'Pro',
  credits: 1250,
  avatar: ''
};

export const mockProjects = [
  {
    id: '1',
    title: 'E-commerce Platform with Payment Integration',
    description: 'Build a modern e-commerce website with product listings, shopping cart, and checkout',
    createdAt: new Date('2025-01-15T10:00:00'),
    status: 'completed' as const
  },
  {
    id: '2',
    title: 'Portfolio Website for Creative Agency',
    description: 'Create a stunning portfolio website with animations and project showcase',
    createdAt: new Date('2025-01-14T15:30:00'),
    status: 'in-progress' as const
  },
  {
    id: '3',
    title: 'Blog Platform with CMS',
    description: 'Build a blog platform with content management system',
    createdAt: new Date('2025-01-13T09:15:00'),
    status: 'pending' as const
  }
];

export const mockCommunityProjects = [
  {
    id: '1',
    title: 'SaaS Landing Page',
    description: 'Modern landing page for SaaS products with pricing tables and feature sections',
    author: 'Sarah Chen',
    likes: 234,
    views: 1520,
    thumbnail: '',
    tags: ['Landing Page', 'SaaS', 'React']
  },
  {
    id: '2',
    title: 'AI Chatbot Interface',
    description: 'Beautiful chatbot interface with AI-powered responses and conversation history',
    author: 'Michael Park',
    likes: 189,
    views: 987,
    thumbnail: '',
    tags: ['AI', 'Chatbot', 'UI/UX']
  },
  {
    id: '3',
    title: 'Dashboard Analytics',
    description: 'Comprehensive analytics dashboard with charts, graphs, and real-time data',
    author: 'Emily Rodriguez',
    likes: 312,
    views: 2104,
    thumbnail: '',
    tags: ['Dashboard', 'Analytics', 'Data Viz']
  },
  {
    id: '4',
    title: 'Food Delivery App',
    description: 'Mobile-first food delivery app with restaurant listings and order tracking',
    author: 'James Wilson',
    likes: 156,
    views: 843,
    thumbnail: '',
    tags: ['Mobile', 'E-commerce', 'Food']
  },
  {
    id: '5',
    title: 'Social Media Platform',
    description: 'Complete social media platform with posts, comments, and user profiles',
    author: 'Lisa Thompson',
    likes: 421,
    views: 3201,
    thumbnail: '',
    tags: ['Social', 'Community', 'Web App']
  },
  {
    id: '6',
    title: 'Real Estate Marketplace',
    description: 'Property listing platform with search filters and virtual tours',
    author: 'David Kim',
    likes: 267,
    views: 1654,
    thumbnail: '',
    tags: ['Marketplace', 'Real Estate', 'Search']
  }
];