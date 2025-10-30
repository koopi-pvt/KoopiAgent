import { useState } from 'react';
import DashboardNav from '../components/dashboard/DashboardNav';
import ProjectPrompt from '../components/dashboard/ProjectPrompt';
import ProjectHistory from '../components/dashboard/ProjectHistory';
import CommunityProjects from '../components/dashboard/CommunityProjects';
import { mockUser, mockProjects, mockCommunityProjects } from '../mock/dashboardMock';

export default function Dashboard() {
  const [projects, setProjects] = useState(mockProjects);

  const handleCreateProject = (prompt: string) => {
    console.log('Creating project:', prompt);
    const newProject = {
      id: Date.now().toString(),
      title: prompt.slice(0, 50),
      description: prompt,
      createdAt: new Date(),
      status: 'pending' as const
    };
    setProjects(prev => [newProject, ...prev]);
  };

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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
          <div className="lg:col-span-2">
            <ProjectPrompt onSubmit={handleCreateProject} />
          </div>
          
          <div className="lg:col-span-1">
            <ProjectHistory projects={projects} />
          </div>
        </div>

        <CommunityProjects projects={mockCommunityProjects} />
      </div>
    </div>
  );
}