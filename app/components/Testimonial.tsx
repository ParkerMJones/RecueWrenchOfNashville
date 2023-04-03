import clsx from "clsx";
import { Star } from "react-feather";
import { GoogleSvg } from "~/icons/google";

const Testimonial = ({
  name,
  quote,
  truncated,
}: {
  name: string;
  quote: string;
  truncated: boolean;
}) => {
  return (
    <div className="flex flex-col z-10 gap-y-2 w-80 flex-wrap p-3">
      <div className="w-full flex justify-between items-center">
        <div className="flex gap-x-1 items-center">
          {[1, 2, 3, 4, 5].map((i) => (
            <Star key={i} className="fill-yellow-500 stroke-yellow-500" />
          ))}
        </div>
        <GoogleSvg />
      </div>
      <p
        className={clsx(
          "text-lg text-slate-700 whitespace-break-spaces",
          truncated ? "line-clamp-5" : ""
        )}
      >
        {quote}
      </p>
      <p className="text-md italic text-slate-500">- {name}</p>
    </div>
  );
};

export { Testimonial };
