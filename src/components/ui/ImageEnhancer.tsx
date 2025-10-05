"use client";

import { useRef, useEffect, useState, type ReactNode } from 'react';
import { ImageLightbox } from './ImageLightbox';

interface ImageEnhancerProps {
  children: ReactNode;
}

export function ImageEnhancer({ children }: ImageEnhancerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [lightboxImage, setLightboxImage] = useState<{
    src: string;
    alt: string;
  } | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Find all images within the container
    const images = containerRef.current.querySelectorAll('img');

    const handleImageClick = (event: Event) => {
      const img = event.currentTarget as HTMLImageElement;
      setLightboxImage({
        src: img.src,
        alt: img.alt || 'Project image'
      });
    };

    // Add click handlers and cursor style to all images
    images.forEach((img) => {
      img.style.cursor = 'pointer';
      img.setAttribute('title', 'Click to view fullscreen');
      img.addEventListener('click', handleImageClick);
    });

    // Cleanup
    return () => {
      images.forEach((img) => {
        img.removeEventListener('click', handleImageClick);
      });
    };
  }, [children]);

  return (
    <>
      <div ref={containerRef}>
        {children}
      </div>

      {lightboxImage && (
        <ImageLightbox
          isOpen={true}
          imageSrc={lightboxImage.src}
          imageAlt={lightboxImage.alt}
          onClose={() => setLightboxImage(null)}
        />
      )}
    </>
  );
}
