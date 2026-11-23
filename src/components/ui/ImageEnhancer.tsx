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

    const images = containerRef.current.querySelectorAll('img');

    const openImage = (img: HTMLImageElement) => {
      setLightboxImage({
        src: img.src,
        alt: img.alt
      });
    };

    const handleImageClick = (event: Event) => openImage(event.currentTarget as HTMLImageElement);
    const handleImageKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Enter' && event.key !== ' ') return;
      event.preventDefault();
      openImage(event.currentTarget as HTMLImageElement);
    };

    images.forEach((img) => {
      if (!img.alt.trim()) return;
      img.style.cursor = 'pointer';
      img.tabIndex = 0;
      img.setAttribute('role', 'button');
      img.setAttribute('aria-label', `Open image: ${img.alt}`);
      img.addEventListener('click', handleImageClick);
      img.addEventListener('keydown', handleImageKeyDown);
    });

    return () => {
      images.forEach((img) => {
        img.removeEventListener('click', handleImageClick);
        img.removeEventListener('keydown', handleImageKeyDown);
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
