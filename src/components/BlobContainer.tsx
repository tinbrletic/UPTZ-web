import Blob from './Blob';

interface BlobContainerProps {
  animationType?: 'normal' | 'reverse' | 'slow';
  className?: string;
}

export default function BlobContainer({
  animationType = 'normal',
  className = ''
}: BlobContainerProps) {
  return (
    <div className={`absolute inset-0 ${className}`}>
      <Blob
        variant={1}
        size="lg"
        animationType={animationType}
        animationDelay={0}
        className="top-0 left-0"
      />
      <Blob
        variant={2}
        size="md"
        animationType={animationType}
        animationDelay={-5}
        className="top-1/4 right-0"
      />
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
    </div>
  );
}
