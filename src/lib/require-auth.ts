import { redirect } from "@tanstack/react-router";
import { isAuthenticatedClient } from "@/lib/auth";

export async function requireAuth(location: { href: string }) {
  if (typeof window === "undefined") return; // skip during SSR/prerender
  if (!isAuthenticatedClient()) {
    throw redirect({ to: "/auth", search: { redirect: location.href } as any });
  }
}
