"use client";

import * as React from "react";
import useEmblaCarousel, {
  type UseEmblaCarouselType,
} from "embla-carousel-react";
import { ArrowLeft, ArrowRight } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
type CarouselApi = UseEmblaCarouselType[1];
type UseCarouselParameters = Parameters<typeof useEmblaCarousel>;
type CarouselOptions = UseCarouselParameters[0];
type CarouselPlugin = UseCarouselParameters[1];

type CarouselProps = {
  opts?: CarouselOptions;
  plugins?: CarouselPlugin;
  orientation?: "horizontal" | "vertical";
  setApi?: (api: CarouselApi) => void;
  enableArrowNavigation?: boolean;
  enableTabNavigation?: boolean;
};

type CarouselContextProps = {
  carouselRef: ReturnType<typeof useEmblaCarousel>[0];
  api: ReturnType<typeof useEmblaCarousel>[1];
  scrollPrev: () => void;
  scrollNext: () => void;
  canScrollPrev: boolean;
  canScrollNext: boolean;
} & CarouselProps;

const CarouselContext = React.createContext<CarouselContextProps | null>(null);

function useCarousel() {
  const context = React.useContext(CarouselContext);

  if (!context) {
    throw new Error("useCarousel must be used within a <Carousel />");
  }

  return context;
}

const Carousel = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & CarouselProps
>(
  (
    {
      orientation = "horizontal",
      opts,
      setApi,
      enableArrowNavigation,
      enableTabNavigation,
      plugins,
      className,
      children,
      ...props
    },
    ref
  ) => {
    const [carouselRef, api] = useEmblaCarousel(
      {
        ...opts,
        axis: orientation === "horizontal" ? "x" : "y",
      },
      plugins
    );
    const [canScrollPrev, setCanScrollPrev] = React.useState(true);
    const [canScrollNext, setCanScrollNext] = React.useState(true);

    const focusInput = React.useCallback((api: CarouselApi) => {
      if (!api) {
        return;
      }

      const index = api.selectedScrollSnap();

      const slideElements = api.slideNodes();

      const currentSlide = slideElements[index];

      if (!currentSlide) {
        return;
      }

      const inputs = currentSlide.querySelectorAll("input");

      for (let i = 0; i < inputs.length; i++) {
        const currentInput = inputs[i];

        if (currentInput.offsetWidth > 0 && currentInput.offsetHeight > 0) {
          currentInput.focus({ preventScroll: true });

          break;
        }
      }
    }, []);

    const onSelect = React.useCallback((api: CarouselApi) => {
      if (!api) {
        return;
      }

      setCanScrollPrev(api.canScrollPrev());
      setCanScrollNext(api.canScrollNext());
    }, []);

    const scrollPrev = React.useCallback(() => {
      api?.scrollPrev();
    }, [api]);

    const scrollNext = React.useCallback(() => {
      api?.scrollNext();
    }, [api]);

    const handleKeyDown = React.useCallback(
      (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (event.key === "Tab" && enableTabNavigation === false) {
          const activeElement = document.activeElement as HTMLElement;
          const activeSlide = activeElement.closest(".embla-slide");

          if (activeSlide) {
            const focusableElements = activeSlide.querySelectorAll(
              'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
            );

            const firstFocusableElement = focusableElements[0];
            const lastFocusableElement =
              focusableElements[focusableElements.length - 1];

            if (event.shiftKey) {
              if (activeElement === firstFocusableElement) {
                event.preventDefault();
              }
            } else {
              if (activeElement === lastFocusableElement) {
                event.preventDefault();
              }
            }
          }
        } else if (
          event.key === "ArrowLeft" &&
          enableArrowNavigation === true
        ) {
          event.preventDefault();
          scrollPrev();
        } else if (
          event.key === "ArrowRight" &&
          enableArrowNavigation === true
        ) {
          event.preventDefault();
          scrollNext();
        }
      },
      [enableTabNavigation, enableArrowNavigation, scrollPrev, scrollNext]
    );

    React.useEffect(() => {
      if (!api || !setApi) {
        return;
      }

      setApi(api);
    }, [api, setApi]);

    React.useEffect(() => {
      if (!api) {
        return;
      }

      // onSelect(api)
      // focusInput(api)

      api.on("reInit", onSelect);
      api.on("select", onSelect);
      api.on("slidesInView", focusInput);

      return () => {
        api?.off("reInit", onSelect);
        api?.off("select", onSelect);
        api?.off("slidesInView", focusInput);
      };
    }, [api, focusInput, onSelect]);

    return (
      <CarouselContext.Provider
        value={{
          carouselRef,
          api: api,
          opts,
          orientation:
            orientation || (opts?.axis === "y" ? "vertical" : "horizontal"),
          scrollPrev,
          scrollNext,
          canScrollPrev,
          canScrollNext,
        }}
      >
        <div
          ref={ref}
          onKeyDownCapture={handleKeyDown}
          className={cn("relative", className)}
          role="region"
          aria-roledescription="carousel"
          tabIndex={0}
          {...props}
        >
          {children}
        </div>
      </CarouselContext.Provider>
    );
  }
);
Carousel.displayName = "Carousel";

interface CarouselContentProps extends React.ComponentProps<"div"> {
  visible?: boolean;
}

function CarouselContent({
  className,
  visible,
  ...props
}: CarouselContentProps) {
  const { carouselRef, orientation } = useCarousel();

  return (
    <div
      ref={carouselRef}
      className={cn(!visible && "overflow-hidden")}
      data-slot="carousel-content"
    >
      <div
        className={cn(
          "flex",
          orientation === "horizontal" ? "-ml-14" : "-mt-4 flex-col",
          className
        )}
        {...props}
      />
    </div>
  );
}

function CarouselItem({ className, ...props }: React.ComponentProps<"div">) {
  const { orientation } = useCarousel();

  return (
    <div
      role="group"
      aria-roledescription="slide"
      data-slot="carousel-item"
      className={cn(
        "min-w-0 shrink-0 grow-0 basis-full",
        orientation === "horizontal" ? "pl-14" : "pt-4",
        className
      )}
      {...props}
    />
  );
}

function CarouselPrevious({
  className,
  variant = "outline",
  size = "icon",
  ...props
}: React.ComponentProps<typeof Button>) {
  const { orientation, scrollPrev, canScrollPrev } = useCarousel();

  return (
    <Button
      data-slot="carousel-previous"
      variant={variant}
      size={size}
      className={cn(
        "absolute size-8 rounded-full",
        orientation === "horizontal"
          ? "top-1/2 -left-12 -translate-y-1/2"
          : "-top-12 left-1/2 -translate-x-1/2 rotate-90",
        className
      )}
      disabled={!canScrollPrev}
      onClick={scrollPrev}
      {...props}
    >
      <ArrowLeft />
      <span className="sr-only">Previous slide</span>
    </Button>
  );
}

function CarouselNext({
  className,
  variant = "outline",
  size = "icon",
  ...props
}: React.ComponentProps<typeof Button>) {
  const { orientation, scrollNext, canScrollNext } = useCarousel();

  return (
    <Button
      data-slot="carousel-next"
      variant={variant}
      size={size}
      className={cn(
        "absolute size-8 rounded-full",
        orientation === "horizontal"
          ? "top-1/2 -right-12 -translate-y-1/2"
          : "-bottom-12 left-1/2 -translate-x-1/2 rotate-90",
        className
      )}
      disabled={!canScrollNext}
      onClick={scrollNext}
      {...props}
    >
      <ArrowRight />
      <span className="sr-only">Next slide</span>
    </Button>
  );
}

export {
  type CarouselApi,
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
};
