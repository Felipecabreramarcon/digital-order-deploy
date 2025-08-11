import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";

export const Row = ({
  children,
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn("flex transition-all w-full items-center", className)}
    {...props}
  >
    {children}
  </div>
);
