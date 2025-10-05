"use client";

import { useState, useEffect } from 'react';
import Modal from 'react-modal';

interface ImageLightboxProps {
  isOpen: boolean;
  imageSrc: string;
  imageAlt?: string;
  onClose: () => void;
}

// Set app element for accessibility
if (typeof window !== 'undefined') {
  Modal.setAppElement('body');
}

export function ImageLightbox({
  isOpen,
  imageSrc,
  imageAlt = "Image",
  onClose
}: ImageLightboxProps) {
  const [zoom, setZoom] = useState(1);

  // Reset zoom when modal opens
  useEffect(() => {
    if (isOpen) {
      setZoom(1);
    }
  }, [isOpen]);

  // Handle keyboard shortcuts
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === '+' || e.key === '=') {
        zoomIn();
      } else if (e.key === '-') {
        zoomOut();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, zoom]);

  const zoomIn = () => {
    setZoom((prev) => Math.min(prev + 0.25, 3));
  };

  const zoomOut = () => {
    setZoom((prev) => Math.max(prev - 0.25, 0.5));
  };

  const resetZoom = () => {
    setZoom(1);
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      shouldCloseOnOverlayClick={true}
      shouldCloseOnEsc={true}
      style={{
        overlay: {
          backgroundColor: 'rgba(0, 0, 0, 0.85)',
          backdropFilter: 'blur(8px)',
          zIndex: 100,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '2rem',
        },
        content: {
          position: 'relative',
          inset: 'auto',
          border: 'none',
          background: 'transparent',
          overflow: 'visible',
          borderRadius: 0,
          padding: 0,
          maxWidth: '90vw',
          maxHeight: '90vh',
        }
      }}
      contentLabel={imageAlt}
    >
      {/* Control Buttons */}
      <div className="fixed top-4 right-4 flex gap-2 z-10">
        {/* Zoom Out Button */}
        <button
          onClick={zoomOut}
          disabled={zoom <= 0.5}
          className="bg-black/50 hover:bg-black/70 text-white p-3 rounded-lg backdrop-blur-sm transition-all disabled:opacity-30 disabled:cursor-not-allowed"
          aria-label="Zoom out"
          title="Zoom out (-)"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM13 10H7" />
          </svg>
        </button>

        {/* Reset Zoom Button */}
        <button
          onClick={resetZoom}
          className="bg-black/50 hover:bg-black/70 text-white px-3 py-2 rounded-lg backdrop-blur-sm transition-all text-sm font-medium"
          aria-label="Reset zoom"
          title="Reset zoom (100%)"
        >
          {Math.round(zoom * 100)}%
        </button>

        {/* Zoom In Button */}
        <button
          onClick={zoomIn}
          disabled={zoom >= 3}
          className="bg-black/50 hover:bg-black/70 text-white p-3 rounded-lg backdrop-blur-sm transition-all disabled:opacity-30 disabled:cursor-not-allowed"
          aria-label="Zoom in"
          title="Zoom in (+)"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7" />
          </svg>
        </button>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="bg-black/50 hover:bg-black/70 text-white p-3 rounded-lg backdrop-blur-sm transition-all"
          aria-label="Close"
          title="Close (ESC)"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Image Container */}
      <div className="flex items-center justify-center w-full h-full overflow-auto">
        <img
          src={imageSrc}
          alt={imageAlt}
          className="max-w-full max-h-full object-contain transition-transform duration-200 cursor-move"
          style={{
            transform: `scale(${zoom})`,
          }}
          draggable={false}
        />
      </div>

      {/* Keyboard Shortcuts Hint */}
      <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-black/50 text-white px-4 py-2 rounded-lg backdrop-blur-sm text-sm">
        <span className="hidden md:inline">ESC to close • +/- to zoom</span>
        <span className="md:hidden">Tap to close</span>
      </div>
    </Modal>
  );
}
