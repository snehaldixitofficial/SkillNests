import { motion } from "framer-motion";
import logoAsset from "@/assets/skillnestslogo.jpeg";

export function SplashUI({ readyText = "education that completes, not competes" }: { readyText?: string }) {
  return (
    <main className="relative min-h-screen grid place-items-center bg-background overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_hsl(var(--rose-gold)/0.12),_transparent_60%)]" />
      <motion.div
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="relative flex flex-col items-center gap-6"
      >
        <motion.div
          animate={{ rotate: [0, 4, -4, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="h-28 w-28 rounded-full overflow-hidden border border-rose-gold/40 shadow-[0_0_60px_rgba(212,165,116,0.35)]"
        >
          <img src={logoAsset} alt="skillnests" className="h-full w-full object-cover" />
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.7 }}
          className="font-serif text-4xl sm:text-5xl italic tracking-tight"
        >
          <span className="text-gradient-gold">skill</span>
          <span className="text-foreground/90">nests</span>
          <span className="text-rose-gold">.in</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-xs font-mono uppercase tracking-[0.3em] text-muted-foreground"
        >
          {readyText}
        </motion.p>
      </motion.div>
    </main>
  );
}
