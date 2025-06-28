import { cn } from "utils/ui";


export const navbarWrapper = cn(
  "fixed inset-x-0 bottom-0 z-10",
);

export const navbarInner = cn(
  "isolate flex items-center justify-center py-4 text-sm",
);

export const navbarRoutesWrapper = cn(
  "flex h-9 items-stretch justify-center space-x-2 px-4 max-sm:px-2",
  "shadow-md backdrop-blur-sm",
  "rounded-full border border-zinc-500/25 transition-colors",
);

export const navbarRouteItem = cn(
  "relative flex h-full items-center px-2 transition-colors hover:text-white",
  "before:absolute before:inset-x-0 before:h-px before:rounded-t-full before:-bottom-px",
  "hover:before:bottom-0 before:opacity-0 hover:before:opacity-100 before:transition-all before:duration-200 before:ease-out-quint",
  "hover:before:bg-white before:shadow-[0_1px_4px] before:shadow-primary-500",
  "after:absolute after:inset-0 hover:after:-inset-1",
);

export const navbarBlurOverlay = cn(
  "absolute inset-0 h-full w-full",
);