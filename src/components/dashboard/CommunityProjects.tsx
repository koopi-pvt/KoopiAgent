import { Globe, Heart, Eye, User } from 'lucide-react';

interface CommunityProject {
  id: string;
  title: string;
  description: string;
  author: string;
  likes: number;
  views: number;
  thumbnail: string;
  tags: string[];
}

interface CommunityProjectsProps {
  projects: CommunityProject[];
}

export default function CommunityProjects({ projects }: CommunityProjectsProps) {
  return (
    <div className="animate-fade-in-up">
      <div className="flex items-center space-x-3 mb-8">
        <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center">
          <Globe className="w-6 h-6 text-white" />
        </div>
        <div>
          <h2 className="text-white font-semibold text-2xl">Community Projects</h2>
          <p className="text-white/60 text-sm">Discover what others are building</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <div
            key={project.id}
            className="group bg-white/5 border border-white/10 rounded-2xl backdrop-blur-sm overflow-hidden hover:bg-white/10 transition-all duration-300 hover:scale-105 cursor-pointer"
          >
            <div className="aspect-video bg-gradient-to-br from-white/10 to-white/5 relative overflow-hidden">
              {project.thumbnail ? (
                <img src={project.thumbnail} alt={project.title} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <Globe className="w-16 h-16 text-white/20" />
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
            
            <div className="p-5">
              <h3 className="text-white font-semibold text-lg mb-2 line-clamp-1">
                {project.title}
              </h3>
              <p className="text-white/60 text-sm mb-4 line-clamp-2">
                {project.description}
              </p>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-white/70 text-xs"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-white/10">
                <div className="flex items-center space-x-2 text-white/60">
                  <User className="w-4 h-4" />
                  <span className="text-sm">{project.author}</span>
                </div>
                <div className="flex items-center space-x-4 text-white/60">
                  <div className="flex items-center space-x-1">
                    <Heart className="w-4 h-4" />
                    <span className="text-sm">{project.likes}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Eye className="w-4 h-4" />
                    <span className="text-sm">{project.views}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}