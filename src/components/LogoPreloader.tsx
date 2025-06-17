import { memo } from 'react';

// Preload critical SVG logos with highest priority
const LogoPreloader = memo(() => {
  return (
    <>
      <link
        rel="preload"
        href="/UPTZ_navbar_logo.svg"
        as="image"
        type="image/svg+xml"
        fetchPriority="high"
      />
      <link
        rel="preload"
        href="/adria_hydrofoil_navbar_logo.svg"
        as="image"
        type="image/svg+xml"
        fetchPriority="high"
      />
      <script
        dangerouslySetInnerHTML={{
          __html: `
            // Aggressively preload SVGs
            const link1 = document.createElement('link');
            link1.rel = 'prefetch';
            link1.href = '/UPTZ_navbar_logo.svg';
            document.head.appendChild(link1);
            
            const link2 = document.createElement('link');
            link2.rel = 'prefetch';
            link2.href = '/adria_hydrofoil_navbar_logo.svg';
            document.head.appendChild(link2);
          `
        }}
      />
    </>
  );
});

LogoPreloader.displayName = 'LogoPreloader';

export default LogoPreloader;
