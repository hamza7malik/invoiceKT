import { useState, useEffect } from "react";

/**
 * Custom hook to detect screen size
 * @param {string} query - Media query string (e.g., '(max-width: 768px)')
 * @returns {boolean} - True if query matches
 */
export function useMediaQuery(query) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);

    // Set initial value
    if (media.matches !== matches) {
      setMatches(media.matches);
    }

    // Create listener
    const listener = (e) => setMatches(e.matches);

    // Add listener (modern way)
    media.addEventListener("change", listener);

    // Cleanup
    return () => media.removeEventListener("change", listener);
  }, [matches, query]);

  return matches;
}

// Preset breakpoints for convenience
export const useIsMobile = () => useMediaQuery("(max-width: 768px)");
export const useIsTablet = () => useMediaQuery("(max-width: 1024px)");
export const useIsDesktop = () => useMediaQuery("(min-width: 1025px)");
