'use client'
import { FC, useRef } from "react";
import { asText, Content } from "@prismicio/client";
import {SliceComponentProps } from "@prismicio/react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Bounded } from "@/components/Bounded";


gsap.registerPlugin(useGSAP, ScrollTrigger);
/**
 * Props for `Scrolltext`.
 */
export type ScrolltextProps = SliceComponentProps<Content.ScrolltextSlice>;

/**
 * Component for "Scrolltext" Slices.
 */
const Scrolltext: FC<ScrolltextProps> = ({ slice }) => {
  
  const componentRef =useRef<HTMLDivElement>(null)
  const textRef =useRef<HTMLDivElement>(null)
  const contentRef =useRef<HTMLDivElement>(null)


  const words =asText(slice.primary.text).split(" ");

  useGSAP(()=>{
    const component =componentRef.current
    const textElement =textRef.current
    const contentElement =contentRef.current
    const letters =textElement?.querySelectorAll('span')  //to get all the letters in the span

    if(!component || !textElement || !letters || !contentElement) return;

    //set initial blur and color

    gsap.set(contentElement, {filter:'blur(10px)'});

    gsap.set(letters, {color:'hsl(220, 9%, 20%)'}) //firstly we had to break each statement into words or letters, then set a neutral color to them, so that on scroll we can change the color

    gsap.to(contentElement, {filter: 'blur(0px)', duration:1, scrollTrigger:{
      trigger:component,
      start:'top 65%', //when the top of the container reaches 75% of the view port
      end:'top top',
      scrub:2,
    }})


    const colorTl =gsap.timeline({
      scrollTrigger:{
        trigger:component,
        start:'top top',
        end:'bottom -100%',
        pin:true,
        scrub:2,
      }
    })

    colorTl.to(letters, {color:'white', duration:1, stagger:{
      each:0.01, //Each letter’s animation will start 0.01 seconds after the previous one
      from:'start', //The staggering begins from the first element
      ease:'poewer1.inOut'
    }})

    colorTl.to('.glow-background', {opacity:1, duration:1, ease:'power2.inOut'}, 0) //the <0.5 means that this animation will start 0.5 seconds before the previous animation ends

  }, {scope:componentRef})

  return (
    <Bounded ref={componentRef}
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="flex min-h-screen items-center justify-center bg-neutral-950 relative"
    >

    <div className="glow-background absolute inset-0 z-0 h-full w-full opacity-0" />

    <div className="absolute inset-0 bg-[url('/noisetexture.jpg')] opacity-30 mix-blend-multiply" />

    <div ref={contentRef}>
      <div className="mb-2 text-center text-sm tracking-wider text-neutral-200 uppercase md:mb-8 md:text-base">
        {slice.primary.eyebrow}
      </div>

      <div ref={textRef} className="text-center"> 
        <p className="font-display flex flex-wrap justify-center text-5xl leading-tight text-balance uppercase
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
