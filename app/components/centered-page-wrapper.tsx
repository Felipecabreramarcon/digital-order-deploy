import { cn } from "@/lib/utils";
import { Column, ColumnProps } from "./column";

export const CenteredPageWrapper = ({ className, ...props }: ColumnProps) => (
  <Column
    className={cn("items-center h-full justify-center ", className)}
    {...props}
  />
);
