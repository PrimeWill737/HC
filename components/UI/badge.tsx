import * as React from "react";
import { Slot } from "@radix-ui/react-slot";


import { cn } from "./utils";

function Badge({
  className,
  variant,
  asChild = false,
  ...props
}: React.ComponentProps<"span"> & { variant?: string; asChild?: boolean }) {
  const Comp = asChild ? Slot : "span";

  return (
    <Comp
      data-slot="badge"
      data-variant={variant || "default"}
      className={cn("", className)}
      {...props}
    />
  );
}

export { Badge, };
