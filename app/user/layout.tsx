import Footer from '@app/components/Shared/Landing page layout/Footer';
import NavbarUserActions from '@app/components/Shared/Landing page layout/NavbarUserActions';
import React from 'react'

function layout({
    children,
  }: {
    children: React.ReactNode;
  }) {
  return (
    <div>
        <NavbarUserActions/>
        <div className='w-full mt-10'>
        {children}
        </div>
        
        <Footer/>
    </div>
  )
}

export default layout