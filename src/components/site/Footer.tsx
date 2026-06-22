import { Link } from "@tanstack/react-router";

export function Footer() {
  return (
    <footer className="relative z-10 border-t border-white/10 mt-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-10">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <div className="font-serif text-xl italic tracking-tight">
              <span className="text-gradient-gold">skill</span>
              <span className="text-foreground/90">nests</span>
              <span className="text-rose-gold">.in</span>
            </div>
            <p className="mt-2 text-xs text-muted-foreground">
              © {new Date().getFullYear()} SkillNests. Education that completes, not competes.
            </p>
          </div>
          <nav className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
            <Link to="/contact" className="hover:text-rose-gold transition-colors">Contact</Link>
            <Link to="/terms" className="hover:text-rose-gold transition-colors">Terms</Link>
            <Link to="/privacy" className="hover:text-rose-gold transition-colors">Privacy</Link>
            <Link to="/refund" className="hover:text-rose-gold transition-colors">Refund Policy</Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
