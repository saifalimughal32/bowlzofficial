import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-semibold transition-all duration-300 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral/40 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98]",
  {
    variants: {
      variant: {
        default:
          "bg-coral text-white shadow-[0_8px_30px_rgba(222,93,124,0.35)] hover:-translate-y-0.5 hover:bg-coral-hover hover:shadow-[0_12px_40px_rgba(222,93,124,0.45)]",
        secondary:
          "border border-white/20 bg-white/10 text-white backdrop-blur-sm hover:bg-white/15",
        outline:
          "border border-plum/15 bg-white text-charcoal hover:border-plum/30 hover:bg-blush/30",
        ghost: "text-plum hover:bg-plum/5",
        ink: "bg-ink text-white hover:bg-ink/90 shadow-[0_8px_30px_rgba(26,18,22,0.25)] hover:-translate-y-0.5",
      },
      size: {
        default: "h-11 px-7 py-2",
        sm: "h-9 px-5 text-xs",
        lg: "h-14 px-10 text-base",
        xl: "h-16 px-12 text-lg",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

export function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : "button";
  return (
    <Comp className={cn(buttonVariants({ variant, size, className }))} {...props} />
  );
}

export { buttonVariants };
