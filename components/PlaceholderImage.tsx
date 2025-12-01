import Image from "next/image";
import { useState } from "react";

interface PlaceholderImageProps {
  src?: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  seed?: string;
  category?: 'tech' | 'profile' | 'project' | 'abstract';
}

export function PlaceholderImage({ 
  src, 
  alt, 
  width, 
  height, 
  className = "",
  seed,
  category = 'tech'
}: PlaceholderImageProps) {
  const [error, setError] = useState(false);
  
  const getPlaceholderUrl = () => {
    if (src && !error) return src;
    
    const imageId = seed || Math.floor(Math.random() * 1000);
    
    return `https://picsum.photos/seed/${imageId}/${width}/${height}?grayscale&blur=1`;
  };

  const gradients = {
    tech: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    profile: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    project: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    abstract: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
  };

  return (
    <div className={`relative overflow-hidden ${className}`} style={{ width, height }}>
      {src && !error ? (
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover"
          onError={() => setError(true)}
        />
      ) : (
        <div 
          className="absolute inset-0 flex items-center justify-center"
          style={{ 
            background: gradients[category],
            opacity: 0.2 
          }}
        >
          <div className="text-grey text-sm font-medium opacity-50">
            {alt}
          </div>
        </div>
      )}
    </div>
  );
}

