import type { Metadata } from 'next';
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import Footer from '@/components/Footer';
import MobileNav from '@/components/nav/MobileNav';
import Sidebar from '@/components/nav/Sidebar';
import SearchDialog from '@/components/search/SearchDialog';
import { getSettings } from '@/lib/settings';
import './globals.css';

export function generateMetadata(): Metadata {
  const settings = getSettings();
  const title = settings.seoTitle || settings.siteTitle;
  return {
    title: {
      default: title,
      template: `%s — ${settings.siteTitle}`,
    },
    description: settings.seoDescription || settings.description,
  };
}

// Applies a stored light-theme preference before first paint (dark is the
// default and needs no attribute).
const themeInit = `(function(){try{if(localStorage.getItem('theme')==='light'){document.documentElement.dataset.theme='light';}}catch(e){}})();`;

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const settings = getSettings();

  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${GeistSans.variable} ${GeistMono.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInit }} />
      </head>
      <body>
        <a
          href="#content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded-btn focus:border focus:border-border-strong focus:bg-surface focus:px-4 focus:py-2 focus:text-sm"
        >
          Skip to content
        </a>
        <Sidebar />
        <MobileNav
          handle={settings.handle}
          github={settings.github}
          linkedin={settings.linkedin}
        />
        <SearchDialog />
        <div id="content" className="pt-14 lg:pt-0 lg:pl-60">
          {children}
          <Footer />
        </div>
      </body>
    </html>
  );
}
