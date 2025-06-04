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
      />
      <Blob
        variant={2}
        size="md"
        animationType={animationType}
        animationDelay={-5}
      />
      <Blob
        variant={3}
        size="xl"
        animationType={animationType}
        animationDelay={-10}
      />
      <Blob
        variant={4}
        size="sm"
        animationType={animationType}
        animationDelay={-15}
      />
    </div>
  );
}
