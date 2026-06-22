import { X, ExternalLink } from "lucide-react";
import { toDrivePreview } from "@/lib/drive";
import { useEffect } from "react";

export function DrivePdfViewer({ url, title, onClose }: { url: string; title?: string; onClose: () => void }) {
  const preview = toDrivePreview(url);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => { window.removeEventListener("keydown", onKey); document.body.style.overflow = ""; };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm grid place-items-center p-4" onClick={onClose}>
      <div className="glass-strong rounded-2xl w-full max-w-5xl h-[88vh] flex flex-col overflow-hidden" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center gap-3 px-4 py-3 border-b border-white/10">
          <div className="font-serif text-lg truncate flex-1">{title ?? "Document"}</div>
          <a href={url} target="_blank" rel="noreferrer" className="text-xs flex items-center gap-1.5 text-muted-foreground hover:text-rose-gold"><ExternalLink className="w-3.5 h-3.5" /> Open in Drive</a>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground p-1.5"><X className="w-5 h-5" /></button>
        </div>
        <div className="flex-1 bg-black">
          {preview ? (
            <iframe src={preview} className="w-full h-full" allow="autoplay" title={title ?? "PDF"} />
          ) : (
            <div className="h-full grid place-items-center text-sm text-muted-foreground p-8 text-center">
              This isn't a recognized Google Drive link. <a href={url} target="_blank" rel="noreferrer" className="text-rose-gold underline ml-1">Open it directly</a>.
            </div>
          )}
        </div>
        <div className="px-4 py-2 border-t border-white/10 text-[11px] text-muted-foreground font-mono">
          Tip: file must be shared as "Anyone with the link" for the embed to load.
        </div>
      </div>
    </div>
  );
}
