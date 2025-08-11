import { cn } from "@/lib/utils";
import { FormHTMLAttributes, HTMLAttributes } from "react";

export type ColumnProps = HTMLAttributes<HTMLDivElement>;

export const Column = ({ children, className, ...props }: ColumnProps) => (
  <div
    className={cn("flex flex-col  w-full transition-all", className)}
    {...props}
  >
    {children}
  </div>
);

export const FormColumn = ({
  children,
  className,
  ...props
}: FormHTMLAttributes<HTMLFormElement>) => (
  <form
    className={cn("flex flex-col gap-2 w-full transition-all", className)}
    {...props}
  >
    {children}
  </form>
);
