import React from "react";

const Footer = () => {
  return (
    <div className="w-full bg-[#F2F8F2] py-24">
      <div className="w-4/5  text-lightPurple grid grid-cols-1 md:grid-cols-3 gap-x-10 mx-auto items-center">
        <div className="flex flex-col">
          <p className="text-3xl font-bold text-darkPurple py-2">Portfolio</p>
          <p className="text-md ">
            Track your investments in PMP and let our mutual fund system analyze
            your user data to craft a personalized portfolio for future growth.
          </p>
        </div>
        <div className="flex flex-col">
          <p className="text-md font-light text-center my-1">
            Subscribe to stay tuned for updates.
          </p>
          <div className=" flex flex-col md:flex-row my-4">
            <input placeholder="Enter your email" className="bg-[#E4E7E6] p-3 "/>
            <button className="bg-darkPurple text-white rounded-md p-3 justify-end">Subscribe</button>
          </div>
          <h1 className="text-lg font-medium">Call Us</h1>
          <p className="text-md font-medium">+91 98745 63213</p>
        </div>
        <div className="flex col">
          <h1>Follow Us</h1>
          <div className="flex"></div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
