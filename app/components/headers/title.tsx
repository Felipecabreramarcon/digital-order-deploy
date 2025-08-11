import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";

export type TitleProps = HTMLAttributes<HTMLDivElement>;

export const Title = ({ children, className, ...props }: TitleProps) => (
  <div className={cn("text-2xl font-semibold", className)} {...props}>
    {children}
  </div>
);
