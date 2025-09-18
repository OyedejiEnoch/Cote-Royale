'use client'
import { Content } from '@prismicio/client';
import clsx from 'clsx';
import Image from 'next/image'
import React, { useState } from 'react'
import { HiBars3, HiMagnifyingGlass, HiShoppingBag, HiUser, HiXMark } from 'react-icons/hi2'
import TransitionLink from '@/components/TransitionLink';

type NavIconProps = {
  className?: string;
  tabIndex?: number;
}

const NavIcons =({className='', tabIndex}:NavIconProps)=>{
  return(

    <div className={clsx('flex items-center gap-8', className)}>
    <a href={'#'} className='text-white' aria-label='Search' tabIndex={tabIndex}>
      <HiMagnifyingGlass size={24} />
    </a>
    <a href={'#'} className='text-white' aria-label='Account' tabIndex={tabIndex}>
      <HiUser size={24} />
    </a>
    <a href={'#'} className='text-white' aria-label='Cart' tabIndex={tabIndex}>
      <HiShoppingBag size={24} />
    </a>
  </div>
  )
}

type NavbarProps = {
  settings: Content.SettingsDocument
}


const Navbar = ({settings}:NavbarProps) => {

  const [isDrawOpen, setIsDrawOpen] = useState(false);

  const toggleDraw =()=>setIsDrawOpen(!isDrawOpen)

  return (
    <header>
      <div className="navbar fixed top-0 left-0 bg-black z-50 w-full text-white">
        <div className="flex items-center justify-between p-2 md:p-4">
            <button onClick={toggleDraw} className="p-2 cursor-pointer text-white transition-colors duration-300 hover:bg-white/20"><HiBars3 size={24} /></button>

            <div className='absolute left-1/2  -translate-x-1/2 transform'>
              <TransitionLink href={'/'}>
                  <Image src={'/logo.svg'} alt='Cote-Royal Paris' width={180} height={30} className='w-32
                  md:w-34' />
              </TransitionLink>
            </div>

            <div className="flex">
                <NavIcons className='hidden md:flex' />
            </div>
        </div>
      </div>

      <div className={clsx('nav-drawer-blur fixed inset-0 z-40 bg-black/40 opacity-0 transition-all duration-500', 
        isDrawOpen ? 'pointer-events-auto opacity-100 backdrop-blur-xs' : 'pointer-events-none opacity-0 backdrop-blur-none'
      )} onClick={toggleDraw} aria-hidden='true' />

      <div className={clsx(`nav-drawer fixed top-0 left-0 h-full w-72 bg-neutral-700 z-50
       transform -translate-x-full transition-transform duration-500`, isDrawOpen ? 'translate-x-0' : '-translate-x-full')}
       role='dialog' aria-modal={isDrawOpen}>
        
        <div className="flex mb-6 justify-end">
          <button className="p-2 text-white transition-colors duration-300 hover:bg-white/10" onClick={toggleDraw} aria-label='Close Menu' tabIndex={isDrawOpen ? 0 : -1}>
            <HiXMark size={24} />
          </button>
        </div>


        <nav className='space-y-4' aria-label='Main Navigation'>
          {settings.data.navigation_link.map((link, index)=>(
            <TransitionLink field={link} onClick={()=>setIsDrawOpen(false)} key={link.key} 
            className='block border-b border-white/10 py-2 px-4 text-xl tracking-wide uppercase font-medium text-white hover:text-gray-300 transition-colors duration-300'
            tabIndex={isDrawOpen ? 0 : -1}
            />
          ))}

          <div className="pt-4 md:hidden">
            <NavIcons className='justify-around' tabIndex={isDrawOpen ? 0 : -1}/>
          </div>
        </nav>

      </div>
    </header>
  )
}

export default Navbar
