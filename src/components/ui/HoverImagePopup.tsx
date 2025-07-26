"use client";

import { useState, useRef } from 'react';
import { cn } from 'utils/ui';

interface HoverImagePopupProps {
  children: React.ReactNode;
  imageSrc: string;
  imageAlt?: string;
  className?: string;
}

export function HoverImagePopup({ 
  children, 
  imageSrc, 
  imageAlt = "Popup image",
  className = "" 
}: HoverImagePopupProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);
  const [position, setPosition] = useState({ x: -9999, y: -9999 });
  const triggerRef = useRef<HTMLSpanElement>(null);

  const showPopup = (e: React.MouseEvent | React.TouchEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const newPosition = {
      x: rect.left + rect.width / 2, // Center horizontally on text
      y: rect.top - 10, // Above the text with 10px offset
    };
    
    setPosition(newPosition);
    setIsVisible(false); // Start hidden
    setShouldRender(true);
    // Small delay to ensure DOM is updated before animation
    setTimeout(() => {
      setIsVisible(true);
    }, 10);
  };

  const hidePopup = () => {
    setIsVisible(false);
    // Remove from DOM after animation completes
    setTimeout(() => {
      setShouldRender(false);
    }, 300);
  };

  const handleMouseEnter = (e: React.MouseEvent) => {
    showPopup(e);
  };

  const handleMouseLeave = () => {
    hidePopup();
  };

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    showPopup(e);
  };

  return (
    <>
      <span
        ref={triggerRef}
        className={cn(
          "relative inline cursor-help underline decoration-dotted underline-offset-4",
          "text-blue-400 hover:text-blue-300 transition-colors duration-200",
          "select-none", // Prevent text selection on mobile tap
          className
        )}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
        onTouchStart={handleClick}
      >
        {children}
      </span>

      {/* Popup Image - Smooth fade in/out animation */}
      {shouldRender && (
        <div
          className="fixed z-50 pointer-events-none"
          style={{
            left: `${position.x}px`,
            top: `${position.y}px`,
            transform: 'translate(-50%, -100%)', // Center horizontally and position above
          }}
        >
          <div 
            className={cn(
              "relative bg-white/10 backdrop-blur-md rounded-lg border border-white/20 shadow-2xl",
              "transition-all duration-300 ease-out",
              "w-32 h-32 md:w-48 md:h-48",
              isVisible 
                ? "opacity-100 scale-100" 
                : "opacity-0 scale-95"
            )}
          >
            <img
              src={imageSrc}
              alt={imageAlt}
              className="w-full h-full object-cover rounded-lg"
              loading="lazy"
            />
          </div>
        </div>
      )}
    </>
  );
}