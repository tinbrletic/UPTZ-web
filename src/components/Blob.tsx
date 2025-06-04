interface BlobProps {
  variant: 1 | 2 | 3 | 4;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  animationType?: 'normal' | 'reverse' | 'slow';
  animationDelay?: number;
  className?: string;
}

export default function Blob({
  variant,
  size = 'md',
  animationType = 'normal',
  animationDelay = 0,
  className = ''
}: BlobProps) {
  const gradients = {
    1: 'linear-gradient(0deg, #2D99D8 0%, #34ECD7 100%)',
    2: 'linear-gradient(180deg, #9BF8F4 0%, #6F7BF7 100%)',
    3: 'linear-gradient(180deg, #B597F6 0%, #96C6EA 100%)',
    4: 'linear-gradient(180deg, #9FCCFA 0%, #0974F1 100%)'
  };

  const sizes = {
    sm: 'w-64 h-64',
    md: 'w-80 h-80',
    lg: 'w-96 h-96',
    xl: 'w-[28rem] h-[28rem]'
  };

  const animationClasses = {
    normal: {
      1: 'animate-blob-1',
      2: 'animate-blob-2',
      3: 'animate-blob-3',
      4: 'animate-blob-4'
    },
    reverse: {
      1: 'animate-blob-reverse-1',
      2: 'animate-blob-reverse-2',
      3: 'animate-blob-reverse-3',
      4: 'animate-blob-reverse-4'
    },
    slow: {
      1: 'animate-blob-slow-1',
      2: 'animate-blob-slow-2',
      3: 'animate-blob-slow-3',
      4: 'animate-blob-slow-4'
    }
  };

  return (
    <div
      className={`absolute ${sizes[size]} rounded-full blur-3xl opacity-30 ${animationClasses[animationType][variant]} ${className}`}
      style={{
        background: gradients[variant],
        animationDelay: `${animationDelay}s`
      }}
    />
  );
}
