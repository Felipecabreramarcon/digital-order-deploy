import { cn } from "@/lib/utils"; // Utilitário para mesclar classes
import { Row } from "../row";

interface JumpingDotsLoaderProps {
  className?: string;
  dotClassName?: string;
}

export const JumpingDotsLoader = ({
  className,
  dotClassName = "bg-primary",
}: JumpingDotsLoaderProps) => {
  const dotBaseClasses = "size-3 rounded-full animate-jump";
  return (
    <Row
      aria-label="Carregando..."
      role="status"
      className={cn("items-end justify-center gap-2", className)}
    >
      <div
        className={cn(dotBaseClasses, dotClassName)}
        style={{ animationDelay: "0ms" }}
      />
      <div
        className={cn(dotBaseClasses, dotClassName)}
        style={{ animationDelay: "250ms" }}
      />
      <div
        className={cn(dotBaseClasses, dotClassName)}
        style={{ animationDelay: "500ms" }}
      />
    </Row>
  );
};
