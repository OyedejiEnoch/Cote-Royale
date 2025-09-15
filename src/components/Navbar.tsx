import Image from 'next/image'
import React from 'react'

const Navbar = () => {
  return (
    <header>
      <div className="navbar fixed top-0 left-0 bg-black z-50 w-full text-white">
        <div className="flex items-center justify-between p-2 md:p-4">
            <button className="p-2">Nenu</button>

            <div className='absolute left-1/2  -translate-x-1/2 transform'>
                <Image src={'/logo.svg'} alt='Cote-Royal Paris' width={180} height={30} className='w-32
                md:w-34' />
            </div>

            <div className="flex">
                Icons
            </div>
        </div>
      </div>
    </header>
  )
}

export default Navbar
