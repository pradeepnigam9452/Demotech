import React from "react";
import { Link } from "react-router-dom";

const Banner = ({OnProjectSection}) => {
  return (

    <section className={`bg-[#016386] text-black relative overflow-hidden ${OnProjectSection?"lg:h-120":"lg:h-screen"} h-full`}>
      <div className={`w-full mx-20  px-8 ${OnProjectSection?"py-10":"py-16"}` }>
        <div className="flex flex-col md:flex-row items-center">
          {/* <!-- LEFT CONTENT --> */}
          <div className="md:w-1/2 text-left space-y-6">
              <a className="block mb-0 md:mb-4 w-1/4 rounded-xl" href="https://binarylogix.in/" target="_blank" rel="noopener noreferrer">
                <img
                  src="logo.png"
                  alt="Company Logo"
                  className=" object-contain   md:mb-6 rounded-xl"
                  />
              </a>

            <h1 className="text-black text-3xl md:text-5xl md:leading-15 leading-10 font-bold">
              Building Brands, <br /> Boosting Digital Futures.
            </h1>
            <p className=" text-xl mb-4 ">
              Delivering innovative solutions that drive your business forward.
            </p>
              <Link
              className="mt-4 inline-flex items-center bg-[#ffffff] hover:bg-slate-900 hover:text-white text-black font-semibold py-2 px-6 rounded-full transition duration-300"
                href="/projects"
              >
                Our Projects
              </Link>

          </div>

          {/* <!-- RIGHT CONTENT / VIDEO BOX --> */}
          <div className="lg:flex hidden md:w-1/2 mt-12 md:mt-0 justify-center relative">
            <div className="relative ">
              <img 
                src="intro-section-illustration.png" 
                alt="video illustration" 
                className={`${OnProjectSection?"w-100 max-w-lg rounded-lg  h-100":"w-full max-w-lg rounded-lg  h-full"}`} 
              />

            </div>
          </div>
        </div>
      </div>

      {/* <!-- SVG BOTTOM WAVE --> */}
      <div className="absolute bottom-0 left-0 w-full ">
        {OnProjectSection ?
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 20 1240 200">
          <path fill="#fff" fill-opacity="1" d="M0,160L48,176C96,192,192,224,288,208C384,192,480,128,576,133.3C672,139,768,213,864,202.7C960,192,1056,96,1152,74.7C1248,53,1344,107,1392,133.3L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
        </svg>
        :
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 270">
          <path fill="#fff" fill-opacity="1" d="M0,160L48,176C96,192,192,224,288,208C384,192,480,128,576,133.3C672,139,768,213,864,202.7C960,192,1056,96,1152,74.7C1248,53,1344,107,1392,133.3L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
        </svg>
        }
      </div>
    </section>

  );
};

export default Banner;
