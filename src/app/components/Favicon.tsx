import { useEffect } from 'react';
import faviconImage from 'figma:asset/8bb5668e30707d11d3e87379b479edd4453594e0.png';

/**
 * Favicon Component
 * Dynamically sets the favicon for the Terminal 404 website
 */
export function Favicon() {
  useEffect(() => {
    // Remove existing favicons
    const existingFavicons = document.querySelectorAll("link[rel*='icon']");
    existingFavicons.forEach(favicon => favicon.remove());

    // Create new favicon link element
    const favicon = document.createElement('link');
    favicon.rel = 'icon';
    favicon.type = 'image/png';
    favicon.href = faviconImage;
    
    // Add to document head
    document.head.appendChild(favicon);

    // Also add apple-touch-icon for iOS devices
    const appleTouchIcon = document.createElement('link');
    appleTouchIcon.rel = 'apple-touch-icon';
    appleTouchIcon.href = faviconImage;
    document.head.appendChild(appleTouchIcon);

    // Update document title
    document.title = 'Terminal 404 | Cyberpunk Tech';

    // Cleanup function
    return () => {
      favicon.remove();
      appleTouchIcon.remove();
    };
  }, []);

  return null; // This component doesn't render anything
}
