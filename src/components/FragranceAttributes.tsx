import { Content } from '@prismicio/client'
import React from 'react'
import { IconType } from 'react-icons'
import { LuCrown, LuDroplet, LuFlame, LuGem, LuTreePine, LuZap } from 'react-icons/lu'


type AttributeData ={
    label:string,
    Icon:IconType,

}

const SCENT_PROFILES: Record<Content.FragranceDocumentData['scent_profile'], AttributeData> ={
    Spicy:{label:'Spicy & Smokey', Icon: LuFlame},
    Woody:{label:'Woody & Herbal', Icon: LuTreePine},
    Fresh:{label:'Fresh & Aquatic', Icon: LuDroplet},
}

const MOODS: Record<string, AttributeData> ={
    bold:{label:'Bold & Seductive', Icon: LuCrown},
    grounded:{label:'Grounded & Sophisticated', Icon: LuGem},
    refreshing:{label:'Refreshing & Invigorating', Icon: LuZap},    
}

type FragranceAttributesProps = {
    scentProfile: Content.FragranceDocumentData['scent_profile'];
    mood: string;
    className?: string;
}

const FragranceAttributes = ({mood:ProvidedMood, scentProfile:ProvidedScentProfile, className}: FragranceAttributesProps) => {
    
    const scentProfile = SCENT_PROFILES[ProvidedScentProfile];
    const mood = MOODS[ProvidedMood];
    
    return (
    <div className={className}>
      <p className="text-base mb-2 font-semibold uppercase">Features</p>
      <div className='grid gap-2'>
        <p className="flex items-center gap-2">
            <scentProfile.Icon className='size-6 flex-shrink-0 text-gray-300' />
            {scentProfile.label}
        </p>
        <p className="flex items-center gap-2">
            <mood.Icon className='size-6 flex-shrink-0 text-gray-300' />
            {mood.label}
        </p>
      </div>
    </div>
  )
}

export default FragranceAttributes
