"use client";

import { useState, useEffect, useRef } from "react";
import { cn } from "utils/ui";
import { routes } from "./routes";
import { useScrollDirection } from "./useScrollDirection";

export function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const { isVisible } = useScrollDirection();

  const toggleMenu = () => {
    if (isOpen) {
      setIsAnimating(true);
      setTimeout(() => {
        setIsOpen(false);
        setIsAnimating(false);
      }, 300);
    } else {
      setIsOpen(true);
    }
  };

  const closeMenu = () => {
    if (isOpen) {
      setIsAnimating(true);
      setTimeout(() => {
        setIsOpen(false);
        setIsAnimating(false);
      }, 300);
    }
  };

  // Close menu when clicking outside (but not on menu button)
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (
        menuRef.current && 
        !menuRef.current.contains(target) &&
        buttonRef.current &&
        !buttonRef.current.contains(target)
      ) {
        closeMenu();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      // Prevent body scroll when menu is open
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Close menu on route change
  useEffect(() => {
    const handleRouteChange = () => closeMenu();
    window.addEventListener("popstate", handleRouteChange);
    return () => window.removeEventListener("popstate", handleRouteChange);
  }, []);

  const handleNavigation = (href: string) => {
    setIsAnimating(true);
    setTimeout(() => {
      window.location.href = href;
      setIsOpen(false);
      setIsAnimating(false);
    }, 300);
  };

  return (
    <>
      {/* Menu Button - Hide/show with scroll */}
      <div className={cn(
        "sm:hidden fixed top-4 right-4 z-50 transition-transform duration-300 ease-in-out",
        {
          'translate-y-0': isVisible,
          '-translate-y-16': !isVisible,
        }
      )}>
        <button
          ref={buttonRef}
          onClick={toggleMenu}
          className={cn(
            "px-4 py-2 rounded-full text-sm font-medium transition-all duration-200",
            "bg-white/10 backdrop-blur-sm border border-white/20",
            "hover:bg-white/20 hover:border-white/30",
            "shadow-lg flex items-center gap-2"
          )}
        >
          Menu
          <svg
            className={cn(
              "w-4 h-4 transition-transform duration-200",
              isOpen ? "rotate-180" : "rotate-0"
            )}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>
      </div>

      {/* Full Screen Overlay */}
      {(isOpen || isAnimating) && (
        <div
          className={cn(
            "sm:hidden fixed inset-0 z-40",
            "bg-black/30 backdrop-blur-md",
            "transition-all duration-300 ease-in-out",
            isOpen && !isAnimating ? "opacity-100" : "opacity-0"
          )}
        >
          {/* Menu Content - Pure text only */}
          <div
            ref={menuRef}
            className="fixed top-16 right-4"
          >
            {routes.map((route, i) => (
              <div 
                key={i} 
                className={cn(
                  "text-right my-6 px-4",
                  "transition-all duration-300 ease-in-out",
                  isOpen && !isAnimating 
                    ? "opacity-100 translate-x-0" 
                    : "opacity-0 translate-x-4"
                )}
                style={{ 
                  transitionDelay: isOpen && !isAnimating ? `${i * 100}ms` : `${(routes.length - i - 1) * 50}ms`
                }}
              >
                <span
                  onClick={() => handleNavigation(route.href)}
                  className={cn(
                    "text-sm font-medium transition-colors duration-200 cursor-pointer",
                    "text-white/90 hover:text-white",
                    window.location.pathname === route.href 
                      ? "text-blue-400" 
                      : ""
                  )}
                >
                  {route.children}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}