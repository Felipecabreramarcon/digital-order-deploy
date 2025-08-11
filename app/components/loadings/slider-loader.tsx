import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { ReactNode, useEffect, useState } from "react";
import { JumpingDotsLoader } from "./loading-dots";
import { Row } from "../row";

export const SliderLoader = ({
  loading,
  children,
  visible,
}: {
  loading: boolean;
  children: ReactNode;
  visible?: boolean;
}) => {
  const [api, setApi] = useState<CarouselApi>();

  useEffect(() => {
    if (!api) {
      return;
    }
    api.scrollTo(loading ? 1 : 0);
  }, [loading, api]);

  return (
    <Carousel
      tabIndex={-1}
      autoFocus={false}
      setApi={setApi}
      opts={{
        duration: 10,
        watchFocus: false,
        watchDrag: false,
      }}
    >
      <CarouselContent visible={visible}>
        <CarouselItem>{children}</CarouselItem>
        <CarouselItem>
          <Row className="items-center justify-center h-full">
            <JumpingDotsLoader />
          </Row>
        </CarouselItem>
      </CarouselContent>
    </Carousel>
  );
};
