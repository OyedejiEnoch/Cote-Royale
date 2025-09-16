'use client'

import { asText, RichTextField } from "@prismicio/client"
import clsx from "clsx";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP)
type RevealTextProps = {
    field:RichTextField,
    id:string,
    className?:string;
    staggerAmount?:number;
    duration?:number;
    as?:React.ElementType
    children?: React.ReactNode;
    align?: 'start' | 'center' | 'end';
}
export const RevealText = ({children, className, id, field, staggerAmount=.1, align='start', as:Component='div', 
    duration=.8}:RevealTextProps) => {

    const componentRef = useRef<HTMLDivElement>(null);

    const words =asText(field).split(' '); //Converts the Prismic rich text field to plain text and splits it into words.
    //  (so we have just two words, Effortless & Elegance) 

    useGSAP(()=>{
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.to(".reveal-text-word", {
          y: 0,
          stagger: staggerAmount,
          duration,
          ease: "power3.out",
        });
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.to(".reveal-text-word", {
          duration: 0.5,
          opacity: 1,
          ease: "none",
          y: 0,
          stagger: 0,
        });
      });
    }, {scope:componentRef})

    return(
        <Component ref={componentRef} className={clsx("reveal-text text-balance", align ==='center' && 'text-center', align ==='end' && 'text-right',
        align ==='start' && 'text-left', className)}>
            {words.map((word, index)=>(
                //Renders each word in a span
                <span key={`${word}-${index}-${id}`} className=" mb-0 inline-block overflow-hidden pb-4">
                    <span className="reveal-text-word mt-0 inline-block translate-y-[120%] will-change-transform">{word} 
                      {index < words.length -1 ? 
                      (<span className="inline">
                        &nbsp; 
                      </span> ) : null}
                      </span> 
                </span>
            ))}
        </Component>
    )
}