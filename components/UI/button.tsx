import * as React from "react";
import { Slot } from "@radix-ui/react-slot";

import { cn } from "./utils";

const Button = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<"button"> & {
    variant?: string;
    size?: string;
    asChild?: boolean;
  }
>(({ className, variant, size, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      data-variant={variant || "default"}
      data-size={size || "default"}
      className={cn("", className)}
      ref={ref}
      {...props}
    />
  );
});

Button.displayName = "Button";

export { Button };