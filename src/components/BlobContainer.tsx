import { useEffect, useState } from 'react';
import Blob from './Blob';

interface BlobContainerProps {
  animationType?: 'normal' | 'reverse' | 'slow';
  className?: string;
}

export default function BlobContainer({
  animationType = 'normal',
  className = ''
}: BlobContainerProps) {
  const [isMounted, setIsMounted] = useState(false);
  const [isLargeScreen, setIsLargeScreen] = useState(false);

  useEffect(() => {
    setIsMounted(true);

    const checkScreenSize = () => {
      setIsLargeScreen(window.innerWidth >= 1024);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // Don't render blobs until mounted to prevent hydration issues
  if (!isMounted) return null;

  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`} style={{ contain: 'layout style paint' }}>
      <Blob
        variant={1}
        size={isLargeScreen ? "lg" : "sm"}
        animationType={animationType}
        animationDelay={0}
        className="top-0 left-0"
      />
      <Blob
        variant={2}
        size={isLargeScreen ? "md" : "sm"}
        animationType={animationType}
        animationDelay={-5}
        className="top-1/4 right-0"
      />
      {/* Reduce blob count on mobile */}
      {isLargeScreen && (
        <>
          <Blob
            variant={3}
            size="xl"
            animationType={animationType}
            animationDelay={-10}
            className="top-1/2 left-1/4"
          />
          <Blob
            variant={4}
            size="sm"
            animationType={animationType}
            animationDelay={-15}
            className="top-3/4 right-1/4"
          />
        </>
      )}
    </div>
  );
}
