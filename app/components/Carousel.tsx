import { useSwipe } from "~/hooks/useSwipe";
import testimonials from "~/data/testimonials";
import { useEffect, useRef, useState } from "react";
import { Testimonial } from "./Testimonial";

const Carousel = () => {
  const [scrollIndex, setScrollIndex] = useState(0);
  const carouselLength = testimonials.length;

  const ref = useRef<HTMLDivElement>(null);

  const swipeHandlers = useSwipe({
    onSwipedLeft: () =>
      scrollIndex === carouselLength - 1
        ? setScrollIndex(0)
        : setScrollIndex(scrollIndex + 1),
    onSwipedRight: () =>
      scrollIndex === 0
        ? setScrollIndex(carouselLength - 1)
        : setScrollIndex(scrollIndex - 1),
  });

  useEffect(() => {
    ref.current?.scrollTo({
      left: scrollIndex * 214,
      behavior: "smooth",
    });
  }, [scrollIndex]);

  // swipe right every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      scrollIndex === carouselLength - 1
        ? setScrollIndex(0)
        : setScrollIndex(scrollIndex + 1);
    }, 4000);
    return () => clearInterval(interval);
  }, [carouselLength, scrollIndex]);

  return (
    <div
      ref={ref}
      {...swipeHandlers}
      style={{ scrollbarWidth: "none" }}
      className="max-w-full overflow-x-clip overflow-y-hidden px-5 sm:px-16 snap-mandatory snap-x whitespace-nowrap flex items-center ml-[calc(50vw-126px)] mr-[calc(50vw-132px)] z-10"
    >
      {testimonials.map((testimonial) => {
        return (
          <article
            key={testimonial.id}
            className="inline-block snap-start px-5"
          >
            <div className="bg-slate-100 w-full line-clamp-4 rounded-lg">
              <Testimonial
                name={testimonial.name}
                quote={testimonial.quote}
                truncated={true}
              />
            </div>
          </article>
        );
      })}
    </div>
  );
};

export { Carousel };
