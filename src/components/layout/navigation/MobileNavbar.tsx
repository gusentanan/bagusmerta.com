"use client";

import { useEffect, useState } from "react";
import { Drawer, DrawerContent, DrawerTrigger } from "../Drawer";
import { routes } from "./routes";
import { navbarRouteItem } from "./styles";

type Props = React.ComponentPropsWithoutRef<"button">;

export function MobileDrawerButton({ className, ...props }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const close = () => setIsOpen(false);

  useEffect(() => {
    const handleRouteChange = () => close();
    window.addEventListener("popstate", handleRouteChange);
    return () => window.removeEventListener("popstate", handleRouteChange);
  }, []);

  const handleClick = (href: string) => {
    window.location.href = href;
    close();
  };

  return (
    <Drawer
      dismissible
      fixed
      modal
      onOpenChange={setIsOpen}
      open={isOpen}
      preventScrollRestoration
      shouldScaleBackground={false}
    >
      <DrawerTrigger asChild>
        <button
          className={navbarRouteItem + " " + className}
          {...props}
          style={{ backgroundColor: 'transparent' }}
        >
          Open Menu
        </button>
      </DrawerTrigger>
      <DrawerContent>
        <ul
          className="mx-auto w-full max-w-sm py-10 flex flex-col items-center justify-center text-center text-xl gap-8"
        >
          {routes.map((route, i) => (
            <li key={i}>
              <a
                href={route.href}
                className={(window.location.pathname === route.href ? "text-blue-500" : "")}
                onClick={(e) => {
                  e.preventDefault();
                  handleClick(route.href);
                }}
              >
                {route.children}
              </a>
            </li>
          ))}
        </ul>
      </DrawerContent>
    </Drawer>
  );
}
