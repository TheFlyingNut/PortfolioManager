import React from 'react';
import { SignUp } from '@clerk/clerk-react';
import investing from "../../assets/auth/investing.svg";
import predictiveAnalystics from "../../assets/auth/predictive_analytics.svg";

const Register = () => {
  return (
    <section id='register'>
      <main className='h-screen w-screen relative'>
        <h1 className='fixed text-center lg:text-left font-bold text-slate-100 text-2xl lg:pl-6 pt-6 container'>
          Portfolio Management
        </h1>
        <div className='flex justify-center items-center'>
          <div className='lg:w-1/2 w-full h-screen bg-violet-800'>
            <div className="lg:flex hidden justify-end flex-col h-full pl-16">
              <img src={predictiveAnalystics} alt="Predictive Analytics" width="350px" draggable={false} />
            </div>
          </div>
          <div className='lg:w-1/2 h-screen bg-white'>
            <div className="lg:flex justify-end pt-16 pr-16 hidden">
              <img src={investing} alt="Investing" width="350px" draggable={false} />
            </div>
          </div>
        </div>
        <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 py-4'>
          <SignUp />
        </div>
      </main>
    </section>
  )
}

export default Register;