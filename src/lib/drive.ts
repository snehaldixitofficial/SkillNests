// Convert a Google Drive share URL to its inline-preview URL.
// Supports:
//   https://drive.google.com/file/d/{ID}/view?...
//   https://drive.google.com/open?id={ID}
//   https://drive.google.com/uc?id={ID}
// Returns null if the URL is not a recognizable Drive file URL.
export function toDrivePreview(url: string): string | null {
  if (!url) return null;
  try {
    const m = url.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
    if (m) return `https://drive.google.com/file/d/${m[1]}/preview`;
    const u = new URL(url);
    const id = u.searchParams.get("id");
    if (id && u.hostname.includes("drive.google.com")) {
      return `https://drive.google.com/file/d/${id}/preview`;
    }
  } catch { /* not a URL */ }
  return null;
}

export function isDriveUrl(url: string): boolean {
  return !!toDrivePreview(url);
}
