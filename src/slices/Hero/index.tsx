import { FC} from "react";
import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import clsx from "clsx";
import { Bounded } from "@/components/Bounded";
import { FadeIn } from "@/components/FadeIn";
import { RevealText } from "@/components/RevealText";
import ButtonLink from "@/components/ButtonLink";


/**
 * Props for `Hero`.
 */
export type HeroProps = SliceComponentProps<Content.HeroSlice>;

/**
 * Component for "Hero" Slices.
 */
const Hero: FC<HeroProps> = ({ slice }) => {


  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="relative min-h-screen overflow-hidden bg-neutral-950"
    >
      <FadeIn vars={{scale:1, opacity:0.5}} className="absolute inset-0 motion-safe:scale-125 bg-image opacity-0">
        <PrismicNextImage field={slice.primary.image} alt="" priority fill className="object-cover motion-reduce:opacity-50"/>
      
      </FadeIn>

      <div className="flex relative h-screen flex-col justify-center"> 
{/*why we used relative, absolutely positioned elements are rendered below relatively positioned elements that come after them in the DOM,  */}
        <RevealText field={slice.primary.heading} staggerAmount={.2} duration={1.7} as={"h1"} id="hero-heading" 
        className="max-w-xl text-6xl leading-none text-neutral-50 md:text-7xl lg:text-8xl font-display">
        </RevealText>

        <FadeIn vars={{delay:1, duration:1.3,}} className="mt-6 max-w-md text-lg text-neutral-100 translate-y-8">
        <PrismicRichText field={slice.primary.body} />
        </FadeIn>

        <FadeIn vars={{duration:1, delay:1.7}} className="mt-8 translate-y-5">
          {slice.primary.button.map((link) => (
            <ButtonLink field={link} className="w-fit" key={link.key} variant="Secondary" />
            ))}
        </FadeIn>
      </div>


    </Bounded>
  );
};

export default Hero;
