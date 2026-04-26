"use client";

import { useState } from "react";
import { routes } from "./routes";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  const open = () => setIsOpen(true);

  const close = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsOpen(false);
      setIsClosing(false);
    }, 300);
  };

  const navigate = (href: string) => {
    close();
    setTimeout(() => { window.location.href = href; }, 300);
  };

  const visible = isOpen && !isClosing;

  return (
    <>
      {/* ── Desktop nav ── */}
      <nav className="fixed top-0 left-0 right-0 z-50 h-20 px-8 bg-[hsl(60,29%,95%)]">
        {/* Desktop: Home | Projects | [B] | Blog | Bookmarks + ⌘K */}
        <div className="hidden sm:flex h-full items-center">
          {/* Left flex spacer */}
          <div className="flex-1" />

          {/* Centered links */}
          <div className="flex items-center gap-8">
            <a href="/" className="text-sm font-medium text-black hover:opacity-60 transition-opacity">
              Home
            </a>
            <a href="/projects" className="text-sm font-medium text-black hover:opacity-60 transition-opacity">
              Projects
            </a>
            <a href="/" className="w-10 h-10 bg-black rounded-lg flex items-center justify-center flex-shrink-0">
              <span className="text-white text-lg font-bold leading-none font-display">B</span>
            </a>
            <a href="/blog" className="text-sm font-medium text-black hover:opacity-60 transition-opacity">
              Blog
            </a>
            <a href="/bookmarks" className="text-sm font-medium text-black hover:opacity-60 transition-opacity">
              Bookmarks
            </a>
          </div>

          {/* Right: ⌘K hint */}
          <div className="flex-1 flex justify-end">
            <div className="flex items-center gap-0.5 text-xs text-black/40 border border-black/15 rounded px-2 py-1 font-primary">
              <span>⌘</span>
              <span>K</span>
            </div>
          </div>
        </div>

        {/* Mobile: centered B only */}
        <div className="flex sm:hidden h-full items-center justify-center">
          <a href="/" className="w-10 h-10 bg-black rounded-lg flex items-center justify-center flex-shrink-0">
            <span className="text-white text-lg font-bold leading-none font-display">B</span>
          </a>
        </div>
      </nav>

      {/* ── Mobile hamburger — vertically centered in navbar height (h-20) ── */}
      <div
        onClick={open}
        className="sm:hidden fixed top-0 right-5 z-50 h-20 flex flex-col items-center justify-center gap-[5px] cursor-pointer"
      >
        <span className="block w-6 h-[2px] bg-black" />
        <span className="block w-6 h-[2px] bg-black" />
      </div>

      {/* ── Full-screen menu overlay ── */}
      {(isOpen) && (
        <div
          className="fixed inset-0 z-[100] bg-black flex flex-col px-8 pb-12"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(-12px)",
            transition: "opacity 300ms ease, transform 300ms ease",
          }}
        >
          {/* X close button — vertically centered at top bar height */}
          <div
            onClick={close}
            className="absolute top-0 right-5 h-20 flex items-center justify-center cursor-pointer"
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M1 1L17 17M17 1L1 17" stroke="white" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </div>

          {/* Nav links */}
          <nav className="flex flex-col gap-0 mt-24">
            {routes.map((route, i) => (
              <div
                key={route.href}
                onClick={() => navigate(route.href)}
                className="py-5 border-b border-white/10 w-full cursor-pointer"
                style={{
                  opacity: visible ? 1 : 0,
                  transform: visible ? "translateY(0)" : "translateY(16px)",
                  transition: `opacity 300ms ease ${i * 60}ms, transform 300ms ease ${i * 60}ms`,
                }}
              >
                <span className="font-display text-2xl text-white">
                  {route.children}
                </span>
              </div>
            ))}
          </nav>
        </div>
      )}
    </>
  );
}
