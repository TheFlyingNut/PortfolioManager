import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import { Icon } from "@iconify/react";
import customer1 from "../../images/customer-01.png";
import customer2 from "../../images/customer-02.png";
import image1 from "../../images/image-01.png";
import image2 from "../../images/image-02.png";
import image3 from "../../images/image-03.png";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { setActive } from "../../state/slices/configSlice";

const LandingPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useUser();

  useEffect(() => {
    if(user) {
      dispatch(setActive("dashboard"))
      navigate('/app/dashboard');
    }
  }, [user, navigate, dispatch]);

  return (
    <>
      <Navbar />
      <div>
        <div className="flex justify-center">
          <div>
            <h1 className=" text-3xl  md:text-5xl lg:text-7xl mx-auto mt-10 font-bold text-center">
              Your Wealth,
              <span className="text-lightPurple">
                {" "}
                Our Priority
                <br />
                Mutual Funds,{" "}
              </span>
              Amplified!
            </h1>
            <div className="m-10 md:m-20">
              <h1 className="text-md md:text-2xl text-center max-w-2xl flex items-center justify-center">
                Experience data-driven personalized portfolios and expert
                guidance for a prosperous financial journey.
              </h1>
            </div>
            <div className=" flex  justify-center my-4 mx-5 ">
              <input
                placeholder="Enter your email"
                className="bg-[#D9D9D9] p-1 rounded-lg  md:pr-32 md:py-6"
              />
              <button className="bg-lightPurple text-white text-xs rounded-md p-2 justify-end">
                Get Started
              </button>
            </div>
          </div>
        </div>
        <div className="w-[full] mx-10 md:mx-20 h-[170px] md:h-[270px] bg-[#D9D9D9] mt-12 md:mt-28"></div>
        <div className="mx-auto mt-12 md:mt-28">
          <h1 className="text-4xl md:text-6xl font-bold text-center text-darkPurple">
            How <span className="text-lightPurple">We</span> Work
          </h1>
          <h2 className="text-md md:text-xl mt-8 md:mt-10 max-w-3xl mx-auto px-10 ">
            Track your investments in PMP and let our mutual fund system analyze
            your user data to craft a personalized portfolio for future growth.
          </h2>
          <div className="flex md:flex-row flex-col items-center max-w-[80%] md:max-w-[60%] mx-auto text-center">
            <div>
              <div className="justify-center">
                <div className="flex items-center gap-6 md:gap-10 mt-10">
                  <div className="rounded-full w-16 h-16 md:w-20 md:h-20 bg-[#D9D9D950] flex items-center justify-center">
                    <Icon
                      icon="carbon:mobile-download"
                      color="#473a6c"
                      width="50"
                      height="50"
                    />
                  </div>
                  <div>
                    <h1 className="text-lg md:text-xl text-darkPurple text-start font-bold">
                      Data Analysis
                    </h1>
                    <h1 className="text-md md:text-lg text-darkPurple text-start">
                      Analyzing your Preferences
                    </h1>
                  </div>
                </div>
                <div className="flex items-center gap-6 md:gap-10 mt-10">
                  <div className="rounded-full w-16 h-16 md:w-20 md:h-20 bg-[#D9D9D950] flex items-center justify-center">
                    <Icon
                      icon="fluent:inprivate-account-28-regular"
                      color="#473a6c"
                      width="50"
                      height="50"
                    />
                  </div>
                  <div>
                    <h1 className="text-lg md:text-xl text-darkPurple text-start font-bold">
                      Personalized Portfolios
                    </h1>
                    <h1 className="text-md md:text-lg text-darkPurple text-start ">
                      Tailoring unique investment plans.
                    </h1>
                  </div>
                </div>
                <div className="flex items-center gap-6 md:gap-10 mt-10">
                  <div className="rounded-full w-16 h-16 md:w-20 md:h-20 bg-[#D9D9D950] flex items-center justify-center">
                    <Icon
                      icon="ic:outline-account-balance"
                      color="#473a6c"
                      width="50"
                      height="50"
                    />
                  </div>
                  <div>
                    <h1 className="text-lg md:text-xl text-darkPurple text-start font-bold">
                      Future-Oriented
                    </h1>
                    <h1 className="text-md md:text-lg text-darkPurple text-start ">
                      Monitoring market trends continuously.
                    </h1>
                  </div>
                </div>
                <div className="flex items-center gap-6 md:gap-10 mt-10">
                  <div className="rounded-full w-16 h-16 md:w-20 md:h-20 bg-[#D9D9D950] flex items-center justify-center">
                    <Icon
                      icon="carbon:currency-dollar"
                      color="#473a6c"
                      width="50"
                      height="50"
                    />
                  </div>
                  <div>
                    <h1 className="text-lg md:text-xl text-darkPurple text-start font-bold">
                      Expert Guidance
                    </h1>
                    <h1 className="text-md md:text-lg text-darkPurple text-start ">
                      Support from experienced advisors.
                    </h1>
                  </div>
                </div>
              </div>
            </div>
            <div className=" ">
              <img
                src={image1}
                alt="how we work"
                className="mx-auto mt-10 md:ml-16 w-[28rem] h-auto"
              />
            </div>
          </div>
        </div>
        <div className="mx-auto mt-12 md:mt-28 ">
          {/* <div className="w-1/2 h-auto my-10 bg-[#D9D9D950] rounded-lg"></div> */}
          <div className="text-center mx-10">
            <h1 className="text-3xl text-center md:text-6xl font-bold text-darkPurple">
              Your <span className="text-lightPurple">Pathway</span> to Future
              Investment
            </h1>
            <h2 className="text-md md:text-xl max-w-3xl mx-auto mt-8 md:mt-10 ">
              Unlock your future investment potential with our data-driven,
              personalized portfolios and expert guidance.
            </h2>
            <div className="flex flex-col md:flex-row items-center mx-auto w-full justify-center">
            <img
                src={image3}
                alt="how we work"
                className=" mt-10 md:mr-10 w-[28rem] h-auto"
              />
          
            <div>
           
            <div className="bg-[#D9D9D950]  max-w-xl py-3 mx-auto rounded-lg my-8 flex items-center  justify-between px-10">
              <h1 className="text-md lg:text-xl text-darkPurple">What is PMP?</h1>
              <Icon icon="mingcute:down-line" width="32" height="32" />
            </div>
            <div className="bg-[#D9D9D950]  max-w-xl py-3 mx-auto rounded-lg my-8 flex items-center  justify-between px-10">
              <h1 className="text-md lg:text-xl text-darkPurple">What is PMP?</h1>
              <Icon icon="mingcute:down-line" width="32" height="32" />
            </div>
            <div className="bg-[#D9D9D950]  max-w-xl py-3 mx-auto rounded-lg my-8 flex items-center  justify-between px-5">
              <h1 className="text-md lg:text-xl text-darkPurple">
                Are there Any Fees for using PMP?
              </h1>
              <Icon icon="mingcute:down-line" width="32" height="32" />
            </div>
            <div className="bg-[#D9D9D950]  max-w-xl py-3 mx-auto rounded-lg my-8 flex items-center  justify-between px-10">
              <h1 className="text-md lg:text-xl text-darkPurple">How Safe is PMP?</h1>
              <Icon icon="mingcute:down-line" width="32" height="32" />
            </div>
            <div className="bg-[#D9D9D950]  max-w-xl py-3 mx-auto rounded-lg my-8 flex items-center  justify-between px-10">
              <h1 className="text-md lg:text-xl text-darkPurple">
                {" "}
                What do I gain from using PMP?
              </h1>
              <Icon icon="mingcute:down-line" width="32" height="32" />
            </div>
            </div>
            </div>
          </div>
        </div>
        <div className="mx-auto mt-48 md:mt-20 ">
          <div className="text-center mx-10 flex justify-center items-center h-screen flex-col">
            <h1 className="text-4xl md:text-6xl font-bold text-darkPurple">
              Why Choose
              <span className="text-lightPurple"> PMP </span>
            </h1>
            <h2 className="text-md md:text-xl max-w-3xl mt-4 mx-auto">
              Unlock the potential of your financial future with PMP's tailored
              investment strategies and client-focused approach.
            </h2>
            <div className="flex flex-col justify-center items-center md:flex-row">
              <div>
                <div className="flex items-center mt-10  gap-6 md:gap-10">
                  <div className="w-14 md:w-20 h-14 md:h-20 rounded-full bg-[#D9D9D950] flex items-center justify-center">
                    <h1 className="text-4xl text-lightPurple font-bold">1</h1>
                  </div>
                  <h1 className="text-xl  text-darkPurple text-start font-semibold">
                    Tailored Portfolios
                  </h1>
                </div>
                <div className="flex items-center mt-10  gap-6 md:gap-10">
                  <div className="w-14 md:w-20 h-14 md:h-20 rounded-full bg-[#D9D9D950] flex items-center justify-center">
                    <h1 className="text-4xl text-lightPurple font-bold">2</h1>
                  </div>
                  <h1 className="text-xl text-darkPurple text-start font-semibold">
                    Expert Guidance
                  </h1>
                </div>
                <div className="flex items-center mt-10  gap-6 md:gap-10">
                  <div className="w-14 md:w-20 h-14 md:h-20 rounded-full bg-[#D9D9D950] flex items-center justify-center">
                    <h1 className="text-4xl text-lightPurple font-bold">3</h1>
                  </div>
                  <h1 className="text-xl text-darkPurple text-start font-semibold">
                    Data-Driven Approach
                  </h1>
                </div>
                <div className="flex items-center mt-10  gap-6 md:gap-10">
                  <div className="w-14 md:w-20 h-14 md:h-20 rounded-full bg-[#D9D9D950] flex items-center justify-center">
                    <h1 className="text-4xl text-lightPurple font-bold">4</h1>
                  </div>
                  <h1 className="text-xl text-darkPurple text-start font-semibold">
                    Transparent and Secure
                  </h1>
                </div>
              </div>
              <img
                src={image2}
                alt="image2"
                className="mx-auto mt-10 md:ml-16 w-[28rem] h-auto"
              />
            </div>
            <button className="bg-lightPurple px-4 md:px-10 md:py-6 py-2 border-lightPurple rounded-lg border-2 text-white mt-10">
              Learn More
            </button>
          </div>
        </div>

        <div className="flex justify-center mt-52 md:mt-20">
          <div className="mx-10 text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-darkPurple">
              What <span className="text-lightPurple">Customers</span> have to
              say
            </h1>

            <div className=" my-8 flex justify-center">
              <h1 className=" text-md md:text-xl  max-w-2xl">
                Discover why our clients love PMP. Read testimonials from
                satisfied investors who have experienced success and exceptional
                service.
              </h1>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:max-w-7xl w-4/5  md:grid-cols-2 mx-auto gap-10">
          <div className="w-full bg-[#D9D9D950] rounded-lg flex flex-col md:flex-row">
            <div className="h-auto">
              <img src={customer1} alt="customer"  className="w-32 h-32 m-5 rounded-full mx-auto object-cover md:w-64 md:h-full md:rounded-none md:m-0 "  />
            </div>
            <div className="flex flex-col justify-between">
              <h1 className="justify-center mx-10 my-3">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut eu,
                mollis aenean sit dictum tincidunt. Ut arcu, suscipit ac
                
              </h1>
              <h2 className="justify-center mx-10 my-3 text-center font-semibold">Rushi</h2>
            </div>
          </div>
          <div className="w-full bg-[#D9D9D950] rounded-lg flex flex-col md:flex-row  ">
            <div   className="h-auto">
              <img src={customer2} alt="customer" className="w-32 h-32 m-5 rounded-full mx-auto object-cover md:w-64 md:h-full md:rounded-none md:m-0 " />
            </div>
            <div className="flex flex-col justify-between">
              <h1 className="justify-center mx-10 my-3">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut eu,
                mollis aenean sit dictum tincidunt. Ut arcu, suscipit ac
              </h1>
              <h2 className="justify-center mx-10 my-3 text-center font-semibold">Ayushi</h2>
            </div>
          </div>
        </div>
        <div className="flex justify-center items-center">
          <button className="bg-lightPurple px-4 md:px-10 md:py-6 py-2 rounded-lg text-white mt-10 md:mt-20">
            View All
          </button>
        </div>
        <div className="   flex items-center justify-center  ">
          <div className=" bg-[#D9D9D950] py-8 px-4 md:py-20 md:px-32 my-10 md:my-20 w-4/5 rounded-lg" >
            <h1 className="text-3xl md:text-6xl text-center mx-auto font-bold">
              Track your investments using{" "}
              <span className="text-lightPurple">PMP</span> and invest in your
              future
            </h1>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default LandingPage;
