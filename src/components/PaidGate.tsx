import { Link } from "@tanstack/react-router";
import { Lock } from "lucide-react";
import { useAuth } from "@/lib/auth";

/**
 * Wrap any premium UI in <PaidGate> to lock free users out.
 * Free users see a soft overlay + "Unlock for ₹49" CTA.
 * Admins always pass through.
 */
export function PaidGate({ children, label = "Locked", className = "" }: { children: React.ReactNode; label?: string; className?: string }) {
  const { isPaid, isAdmin } = useAuth();
  if (isPaid || isAdmin) return <>{children}</>;
  return (
    <div className={`relative ${className}`}>
      <div className="pointer-events-none opacity-40 blur-[1.5px] select-none">{children}</div>
      <div className="absolute inset-0 grid place-items-center">
        <Link to="/upgrade" className="glass-strong rounded-full px-5 py-2.5 text-xs flex items-center gap-2 text-rose-gold border-rose-gold/40 hover:bg-rose-gold/10 transition">
          <Lock className="w-3.5 h-3.5" /> {label} — Unlock for ₹49/month
        </Link>
      </div>
    </div>
  );
}

/** Page-level lock: shows a friendly upgrade screen instead of the page content. */
export function PaidPageGate({ children, peek }: { children: React.ReactNode; peek?: React.ReactNode }) {
  const { isPaid, isAdmin } = useAuth();
  if (isPaid || isAdmin) return <>{children}</>;
  return (
    <div className="relative">
      {peek && <div className="pointer-events-none opacity-30 blur-[2px] select-none">{peek}</div>}
      <div className={peek ? "absolute inset-0 grid place-items-center p-6" : "pt-32 pb-16 px-4"}>
        <div className="glass-strong rounded-3xl p-8 max-w-md mx-auto text-center">
          <Lock className="w-8 h-8 text-rose-gold mx-auto mb-4" strokeWidth={1.2} />
          <h2 className="font-serif text-2xl mb-2">Members-only</h2>
          <p className="text-sm text-muted-foreground mb-5">Unlock all of skillnests for ₹49/month. PYQs, notes, career guidance, MUN, olympiads, and coding — renew monthly to keep access.</p>
          <Link to="/upgrade" className="btn-phoenix rounded-full px-6 py-3 text-sm inline-flex items-center gap-2">Unlock for ₹49/month</Link>
        </div>
      </div>
    </div>
  );
}
