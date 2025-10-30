import { useEffect } from 'react';
import DashboardNav from '../components/dashboard/DashboardNav';
import ProjectPrompt from '../components/dashboard/ProjectPrompt';
import ProjectHistory from '../components/dashboard/ProjectHistory';
import CommunityProjects from '../components/dashboard/CommunityProjects';
import Loader from '../components/common/Loader';
import { useUserProfile, useUserProjects, useCommunityProjects } from '../hooks/useSupabaseData';
import { AlertCircle } from 'lucide-react';

export default function Dashboard() {
  const { profile, loading: profileLoading, error: profileError } = useUserProfile();
  const { projects, loading: projectsLoading, createProject } = useUserProjects();
  const { projects: communityProjects, loading: communityLoading } = useCommunityProjects();

  const handleCreateProject = async (prompt: string) => {
    const title = prompt.slice(0, 100);
    const description = prompt;
    await createProject(title, description);
  };

  if (profileLoading) {
    return (
      <div className="min-h-screen bg-black">
        <Loader fullScreen text="Loading your dashboard..." />
      </div>
    );
  }

  if (profileError) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center px-6">
        <div className="max-w-md w-full">
          <div className="bg-red-500/10 border border-red-500/20 rounded-3xl p-8 text-center">
            <AlertCircle className="w-16 h-16 text-red-400 mx-auto mb-4" />
            <h2 className="text-white font-semibold text-2xl mb-2">Error Loading Dashboard</h2>
            <p className="text-white/60 mb-4">{profileError}</p>
            <button
              onClick={() => window.location.reload()}
              className="bg-white text-black px-6 py-3 rounded-xl font-semibold hover:scale-105 transition-transform"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  const userName = profile?.full_name || profile?.email?.split('@')[0] || 'there';
  const userCredits = profile?.credits || 0;
  const userMembership = profile?.membership || 'free';

  return (
    <div className="min-h-screen bg-black">
      <DashboardNav 
        user={{
          name: userName,
          email: profile?.email || '',
          membership: userMembership.charAt(0).toUpperCase() + userMembership.slice(1),
          credits: userCredits,
          avatar: profile?.avatar_url || ''
        }} 
      />
      
      <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-24 pb-12">
        <div className="text-center mb-12 animate-slide-up">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-4">
            Welcome back,
            <br />
            <span className="hero-gradient">{userName}</span>
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
            {projectsLoading ? (
              <div className="bg-white/5 border border-white/10 rounded-3xl p-8">
                <Loader text="Loading projects..." />
              </div>
            ) : (
              <ProjectHistory projects={projects.map(p => ({
                id: p.id,
                title: p.title,
                description: p.description || '',
                createdAt: new Date(p.created_at),
                status: p.status
              }))} />
            )}
          </div>
        </div>

        {communityLoading ? (
          <div className="bg-white/5 border border-white/10 rounded-3xl p-8">
            <Loader text="Loading community projects..." />
          </div>
        ) : (
          <CommunityProjects 
            projects={communityProjects.map(p => ({
              id: p.id,
              title: p.title,
              description: p.description || '',
              author: p.profiles?.full_name || p.profiles?.email?.split('@')[0] || 'Anonymous',
              likes: p.likes_count,
              views: p.views_count,
              thumbnail: '',
              tags: [] // You can add tags if needed
            }))}
          />
        )}
      </div>
    </div>
  );
}
