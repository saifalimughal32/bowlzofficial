import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Props = {
  id?: string;
  children: ReactNode;
  className?: string;
  tight?: boolean;
};

export function HomeSection({ id, children, className, tight }: Props) {
  return (
    <section
      id={id}
      className={cn(tight ? "home-section-tight" : "home-section", className)}
    >
      {children}
    </section>
  );
}
