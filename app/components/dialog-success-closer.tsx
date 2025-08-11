import { Button } from "@/components/ui/button";
import { DialogClose } from "@/components/ui/dialog";
import { useEffect, useRef } from "react";
import { SliderLoader } from "./loadings/slider-loader";

export const DialogSuccessCloser = ({
  children,
  success,
  loading,
}: {
  children: React.ReactNode;
  success?: boolean;
  loading?: boolean;
}) => {
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!success) return;

    closeButtonRef.current?.click();
  }, [success]);

  return (
    <SliderLoader loading={!!loading}>
      {children}
      <DialogClose asChild>
        <Button ref={closeButtonRef} className="hidden">
          Fechar
        </Button>
      </DialogClose>
    </SliderLoader>
  );
};
