import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

type LogoProps = {
  variant?: "light" | "dark";
  className?: string;
  href?: string;
  priority?: boolean;
  onClick?: () => void;
};

export function Logo({
  variant = "dark",
  className,
  href = "/",
  priority = false,
  onClick,
}: LogoProps) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={cn("relative z-10 inline-flex shrink-0 items-center", className)}
      aria-label="bowlz home"
    >
      <Image
        src="/logo/bowlz-logo.png"
        alt="bowlz"
        width={483}
        height={138}
        priority={priority}
        className={cn(
          "h-7 w-auto transition-opacity duration-300 md:h-8",
          variant === "light" && "brightness-0 invert"
        )}
      />
    </Link>
  );
}
