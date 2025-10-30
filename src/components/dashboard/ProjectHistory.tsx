import { FolderOpen, Clock, CheckCircle2, Loader2 } from 'lucide-react';

interface Project {
  id: string;
  title: string;
  description: string;
  createdAt: Date;
  status: 'pending' | 'in-progress' | 'completed';
}

interface ProjectHistoryProps {
  projects: Project[];
}

const statusConfig = {
  pending: { icon: Clock, color: 'text-yellow-400', bg: 'bg-yellow-400/10' },
  'in-progress': { icon: Loader2, color: 'text-blue-400', bg: 'bg-blue-400/10' },
  completed: { icon: CheckCircle2, color: 'text-green-400', bg: 'bg-green-400/10' }
};

export default function ProjectHistory({ projects }: ProjectHistoryProps) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-3xl backdrop-blur-sm p-6 animate-slide-up-delay-2">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-white font-semibold text-lg flex items-center space-x-2">
          <FolderOpen className="w-5 h-5" />
          <span>My Projects</span>
        </h2>
        <span className="text-white/60 text-sm">{projects.length} total</span>
      </div>

      <div className="space-y-3 max-h-[540px] overflow-y-auto">
        {projects.length > 0 ? (
          projects.map((project) => {
            const StatusIcon = statusConfig[project.status].icon;
            return (
              <div
                key={project.id}
                className="p-4 rounded-xl transition-all duration-300 border bg-white/5 border-white/10 hover:bg-white/10 cursor-pointer"
              >
                <div className="flex items-start justify-between mb-2">
                  <p className="text-white font-medium text-sm truncate flex-1 pr-2">
                    {project.title}
                  </p>
                  <div className={`p-1.5 rounded-lg ${statusConfig[project.status].bg}`}>
                    <StatusIcon className={`w-4 h-4 ${statusConfig[project.status].color}`} />
                  </div>
                </div>
                <p className="text-white/40 text-xs">
                  {project.createdAt.toLocaleDateString()}
                </p>
              </div>
            );
          })
        ) : (
          <div className="text-center py-12">
            <FolderOpen className="w-12 h-12 text-white/20 mx-auto mb-3" />
            <p className="text-white/40 text-sm">No projects yet</p>
            <p className="text-white/30 text-xs mt-1">Create your first project to get started</p>
          </div>
        )}
      </div>
    </div>
  );
}