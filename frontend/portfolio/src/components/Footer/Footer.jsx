import React from 'react'
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="footer flex flex-auto items-center h-16 px-4 sm:px-6 md:px-8">
      <div className="flex items-center justify-between flex-auto w-full">
        <span>Copyright @ 2023 <span className="semi-bold">PMP</span> All rights reserved.</span>
        <div>
          <Link to="#" className='text-gray'>Terms & Conditions</Link>
          <span className="mx-2 text-muted"></span>
          <Link to="#" className='text-gray'>Privacy & Policy</Link>
        </div>
      </div>
    </footer>
  )
}

export default Footer;