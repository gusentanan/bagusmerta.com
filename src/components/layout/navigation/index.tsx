import { cn } from "utils/ui";
import { NavItem } from "./NavItem";
import { routes } from "./routes";
import * as styles from "./styles";
import { navbarRouteItem } from "./styles";
import { useScrollDirection } from "./useScrollDirection";

export function Navbar() {
  const { isVisible } = useScrollDirection();

  return (
    <div className={cn(styles.navbarWrapper, {
      'translate-y-full': !isVisible,
      'translate-y-0': isVisible,
    })}>
      {Array(10)
        .fill(1)
        .map((v, i) => {
          const blurDef = `blur(${v + i}px)`;
          const maskDef = `linear-gradient(to bottom, rgba(0,0,0,0) ${i * 10}%, rgba(0,0,0,1) ${(v + i) * 10}%)`;
          return (
            <div
              className={styles.navbarBlurOverlay}
              key={i}
              style={{
                backdropFilter: blurDef,
                WebkitBackdropFilter: blurDef,
                maskImage: maskDef,
                WebkitMaskImage: maskDef,
              }}
            />
          );
        })}
      <nav className={styles.navbarInner}>
        <ul className={styles.navbarRoutesWrapper}>
          <div className="max-sm:hidden">
            <a className={cn(navbarRouteItem)} href="/">Home</a>
          </div>
          
          <div className="max-sm:hidden my-2 w-px rounded-full bg-zinc-500/25" />

          {routes.slice(1).map((route, i) => (
            <li
              className="max-sm:hidden"
              key={i}
            >
              <NavItem {...route} />
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}