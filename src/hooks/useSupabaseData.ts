import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';

export interface UserProfile {
  id: string;
  email: string;
  full_name: string | null;
  avatar_url: string | null;
  membership: 'free' | 'pro' | 'enterprise';
  credits: number;
  created_at: string;
}

export interface Project {
  id: string;
  user_id: string;
  title: string;
  description: string | null;
  status: 'pending' | 'in-progress' | 'completed';
  is_public: boolean;
  created_at: string;
  updated_at: string;
}

export interface CommunityProject extends Project {
  profiles: {
    full_name: string | null;
    email: string;
  };
  likes_count: number;
  views_count: number;
}

export function useUserProfile() {
  const { user } = useAuth();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user) {
      setProfile(null);
      setLoading(false);
      return;
    }

    async function fetchProfile() {
      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user!.id)
          .single();

        if (error) throw error;
        setProfile(data);
      } catch (err: any) {
        setError(err.message);
        console.error('Error fetching profile:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchProfile();
  }, [user]);

  return { profile, loading, error };
}

export function useUserProjects() {
  const { user } = useAuth();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user) {
      setProjects([]);
      setLoading(false);
      return;
    }

    async function fetchProjects() {
      try {
        const { data, error } = await supabase
          .from('projects')
          .select('*')
          .eq('user_id', user!.id)
          .order('created_at', { ascending: false });

        if (error) throw error;
        setProjects(data || []);
      } catch (err: any) {
        setError(err.message);
        console.error('Error fetching projects:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchProjects();
  }, [user]);

  const createProject = async (title: string, description: string) => {
    if (!user) return null;

    try {
      const { data, error } = await supabase
        .from('projects')
        .insert([
          {
            user_id: user.id,
            title,
            description,
            status: 'pending'
          }
        ])
        .select()
        .single();

      if (error) throw error;
      setProjects((prev) => [data, ...prev]);
      return data;
    } catch (err: any) {
      console.error('Error creating project:', err);
      return null;
    }
  };

  return { projects, loading, error, createProject };
}

export function useCommunityProjects() {
  const [projects, setProjects] = useState<CommunityProject[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchCommunityProjects() {
      try {
        const { data: projectsData, error: projectsError } = await supabase
          .from('projects')
          .select(`
            *,
            profiles!inner (full_name, email)
          `)
          .eq('is_public', true)
          .order('created_at', { ascending: false })
          .limit(6);

        if (projectsError) throw projectsError;

        // Get likes and views count for each project
        const projectsWithStats = await Promise.all(
          (projectsData || []).map(async (project) => {
            const [likesResult, viewsResult] = await Promise.all([
              supabase
                .from('project_likes')
                .select('id', { count: 'exact', head: true })
                .eq('project_id', project.id),
              supabase
                .from('project_views')
                .select('id', { count: 'exact', head: true })
                .eq('project_id', project.id)
            ]);

            return {
              ...project,
              likes_count: likesResult.count || 0,
              views_count: viewsResult.count || 0
            };
          })
        );

        setProjects(projectsWithStats as CommunityProject[]);
      } catch (err: any) {
        setError(err.message);
        console.error('Error fetching community projects:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchCommunityProjects();
  }, []);

  return { projects, loading, error };
}
