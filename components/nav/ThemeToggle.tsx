'use client';

import { useSyncExternalStore } from 'react';
import { MoonIcon, SunIcon } from '@/components/nav/icons';

// Theme state lives on <html data-theme> (set pre-paint by the root layout's
// no-flash script). A custom event keeps every mounted toggle in sync.
const THEME_EVENT = 'sjanga:themechange';

function subscribe(callback: () => void) {
  window.addEventListener(THEME_EVENT, callback);
  return () => window.removeEventListener(THEME_EVENT, callback);
}

function getSnapshot(): 'dark' | 'light' {
  return document.documentElement.dataset.theme === 'light' ? 'light' : 'dark';
}

function getServerSnapshot(): 'dark' | 'light' {
  return 'dark';
}

export default function ThemeToggle() {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const toggle = () => {
    const next = theme === 'light' ? 'dark' : 'light';
    if (next === 'light') {
      document.documentElement.dataset.theme = 'light';
    } else {
      delete document.documentElement.dataset.theme;
    }
    try {
      localStorage.setItem('theme', next);
    } catch {
      // Storage unavailable (private mode) — theme still applies for the visit.
    }
    window.dispatchEvent(new Event(THEME_EVENT));
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={
        theme === 'light' ? 'Switch to dark theme' : 'Switch to light theme'
      }
      className="rounded-btn p-2 text-ink-muted transition-colors duration-200 hover:bg-surface-raised hover:text-ink"
    >
      {theme === 'light' ? (
        <SunIcon className="size-4.5" />
      ) : (
        <MoonIcon className="size-4.5" />
      )}
    </button>
  );
}
