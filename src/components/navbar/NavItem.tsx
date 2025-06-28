"use client";

import { cn } from "utils/ui";
import type { ComponentPropsWithoutRef } from "react";
import { navbarRouteItem } from "./styles";

type Props = ComponentPropsWithoutRef<"a">;

export function NavItem({ href = "#", className, ...props }: Props) {

  return (
    <a
      className={cn(
        navbarRouteItem,
        className
      )}
      href={href}
      {...props}
    />
  );
}
