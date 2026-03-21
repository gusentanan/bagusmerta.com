export function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-center gap-6 sm:gap-10 px-4 sm:px-10 py-4 bg-[hsl(60,29%,95%)]">
      <a
        href="/blog"
        className="text-sm font-medium text-foreground hover:opacity-60 transition-opacity"
      >
        Blog
      </a>

      <a href="/" className="w-12 h-12 bg-black flex items-center justify-center flex-shrink-0">
        <span className="text-white text-xl font-bold leading-none">B</span>
      </a>

      <a
        href="/projects"
        className="text-sm font-medium text-foreground hover:opacity-60 transition-opacity"
      >
        Projects
      </a>
    </nav>
  );
}