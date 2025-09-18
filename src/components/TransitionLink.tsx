import { asLink, LinkField, PrismicDocument } from '@prismicio/client'
import { Link } from 'next-view-transitions';
import React from 'react'

export type TransistionLinkProps ={
    children?:React.ReactNode,
    className?:string,
    onClick?:()=>void,
    tabIndex?:number,
} &(
    | {field: LinkField | null, document?:never; href?:never}
    | {document:PrismicDocument | null, field?:never; href?:never}
    | {href:string, field?:never; document?:never}
)

const TransitionLink = ({field, document:doc, href, className, children, tabIndex, onClick}:TransistionLinkProps) => {

    const url =href ?? asLink(field ?? doc);

    if(!url){
        console.warn('TransitionLink: No link provided');
        return null
    }

    return (
    <Link href={url} className={className} tabIndex={tabIndex} onClick={onClick}>
    
      {field?.text ?? children}
    </Link>
  )
}

export default TransitionLink
