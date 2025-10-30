export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black border-t border-white/10 py-12">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center space-x-2">
            <span className="text-white text-2xl font-bold">K</span>
            <span className="text-white/60">KoopiAgent</span>
          </div>

          <div className="flex items-center space-x-8">
            <a href="#privacy" className="text-white/60 hover:text-white transition-colors duration-300 text-sm">
              Privacy
            </a>
            <a href="#terms" className="text-white/60 hover:text-white transition-colors duration-300 text-sm">
              Terms
            </a>
            <a href="#docs" className="text-white/60 hover:text-white transition-colors duration-300 text-sm">
              Documentation
            </a>
            <a href="#support" className="text-white/60 hover:text-white transition-colors duration-300 text-sm">
              Support
            </a>
          </div>

          <div className="text-white/40 text-sm">
            © {currentYear} KoopiAgent. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
