import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";

export const ErrorText = ({
  className,
  children,
  ...props
}: HTMLAttributes<HTMLParagraphElement>) =>
  children && (
    <p
      className={cn(
        "absolute top-full select-none text-xs text-red-500 transition-all",
        className
      )}
      {...props}
    >
      {children}
    </p>
  );
