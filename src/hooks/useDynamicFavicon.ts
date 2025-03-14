import { useEffect } from "react";
import faviconDefault from "@/assets/favicon-default.svg";
import faviconLost from "@/assets/favicon-lost.svg";
import faviconStreak from "@/assets/favicon-streak.svg";

export default function useDynamicFavicon({streak, lost}: {streak: number, lost: boolean}) {
  useEffect(() => {
    const existingLink = document.querySelector("link[rel~='icon']") as HTMLLinkElement | null;
    const link: HTMLLinkElement = existingLink || document.createElement('link');
    link.type = 'image/x-icon';
    link.rel = 'shortcut icon';
    
    if (streak >= 20) {
      link.href = faviconStreak;
    } else if (lost) {
      link.href = faviconLost;
    } else {
      link.href = faviconDefault;
    }

    document.head.appendChild(link);
  }, [streak, lost])
}