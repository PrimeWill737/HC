"use client";

import * as React from "react";
import * as TogglePrimitive from "@radix-ui/react-toggle";

import { cn } from "./utils";

function Toggle({
  className,
  variant,
  size,
  ...props
}: React.ComponentProps<typeof TogglePrimitive.Root> & {
  variant?: string;
  size?: string;
}) {
  return (
    <TogglePrimitive.Root
      data-slot="toggle"
      data-variant={variant || "default"}
      data-size={size || "default"}
      className={cn("", className)}
      {...props}
    />
  );
}

export { Toggle };