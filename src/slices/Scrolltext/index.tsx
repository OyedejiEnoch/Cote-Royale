import { FC } from "react";
import { asText, Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { Bounded } from "@/components/Bounded";

/**
 * Props for `Scrolltext`.
 */
export type ScrolltextProps = SliceComponentProps<Content.ScrolltextSlice>;

/**
 * Component for "Scrolltext" Slices.
 */
const Scrolltext: FC<ScrolltextProps> = ({ slice }) => {

  const words =asText(slice.primary.text).split(" ");


  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="flex min-h-screen items-center justify-center bg-neutral-950"
    >
    <div>
      <div className="mb-2 text-center text-sm tracking-wider text-neutral-200 uppercase md:mb-8 md:text-base">
        {slice.primary.eyebrow}
      </div>

      <div className="text-center"> 
        <p className="font-diaplay flex flex-wrap justify-center text-5xl leading-tight text-balance uppercase
        md:text-7xl ">
          {words.map((word, index)=>(
            <span key={`${word}-${index}`} className="inline">
              {word.split("").map((char, charIndex)=>(
                <span key={`${char}-${charIndex}`}>{char}</span>
              ))}

              {index < words.length -1 ? 
              (<span className="inline">
                &nbsp; 
              </span> ) : null}
            </span>
          ))}
        </p>
      </div>

    </div>

    </Bounded>
  );
};

export default Scrolltext;
