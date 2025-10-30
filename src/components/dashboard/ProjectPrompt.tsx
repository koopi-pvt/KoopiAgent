import { useState, useRef, useEffect } from 'react';
import { Sparkles, Rocket } from 'lucide-react';

interface ProjectPromptProps {
  onSubmit: (prompt: string) => void;
}

export default function ProjectPrompt({ onSubmit }: ProjectPromptProps) {
  const [input, setInput] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
    }
  }, [input]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && !isSubmitting) {
      setIsSubmitting(true);
      onSubmit(input.trim());
      setInput('');
      setTimeout(() => setIsSubmitting(false), 1000);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="bg-white/5 border border-white/10 rounded-3xl backdrop-blur-sm p-8 animate-slide-up-delay">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center">
          <Sparkles className="w-6 h-6 text-white" />
        </div>
        <div>
          <h2 className="text-white font-semibold text-xl">Create New Project</h2>
          <p className="text-white/60 text-sm">Describe your project and bring it to life</p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <textarea
          ref={textareaRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="E.g., Build a modern e-commerce website with product listings, shopping cart, and checkout..."
          className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-white/20 resize-none min-h-[200px] transition-all duration-300 mb-4"
          rows={8}
        />
        
        <div className="flex items-center justify-between">
          <p className="text-white/40 text-xs">Press Enter to submit, Shift + Enter for new line</p>
          <button
            type="submit"
            disabled={!input.trim() || isSubmitting}
            className="px-8 py-4 bg-white text-black rounded-2xl font-semibold hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 transition-all duration-300 flex items-center space-x-2"
          >
            <span>Create Project</span>
            <Rocket className="w-5 h-5" />
          </button>
        </div>
      </form>
    </div>
  );
}