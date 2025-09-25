'use client';
import Image from "next/image";
import todologo from '../../public/assets/todologo.png';
import electronlogo from '../../public/assets/electron.png';
import unbounce from '../../public/assets/unbounce.png';
import { useState, useRef, useEffect } from "react";

export default function Home() {

  const [isOpenMenu, setIsMenuOpen] = useState(false);


  const [isOpenFAQ1, setIsOpenFAQ1] = useState(false);
  const [isOpenFAQ2, setIsOpenFAQ2] = useState(false);
  const [isOpenFAQ3, setIsOpenFAQ3] = useState(false);
  const [isOpenFAQ4, setIsOpenFAQ4] = useState(false);
  const [isOpenFAQ5, setIsOpenFAQ5] = useState(false);
  const [isOpenFAQ6, setIsOpenFAQ6] = useState(false);
  const handleClick = () => {
    setIsMenuOpen(prev => !prev);
  }

  // Refs for animated lines
  const line1Ref = useRef(null);
  const line2Ref = useRef(null);
  const line3Ref = useRef(null);
  const line4Ref = useRef(null);

  // Setup Intersection + Scroll effect
  useEffect(() => {
    function setupIntersectionObserver(element: any, isLTR: any, speed: any, initialTranslateLTR: any, initialTranslateRTL: any) {
      if (!element) return;

      function scrollHandler() {
        const translateX = (window.innerHeight - element.getBoundingClientRect().top) * speed;
        let totalTranslate = isLTR
          ? translateX + initialTranslateLTR
          : -(translateX + initialTranslateRTL);

        element.style.transform = `translateX(${totalTranslate}px)`;
      }

      const intersectionCallback = (entries: any) => {
        const isIntersecting = entries[0].isIntersecting;
        if (isIntersecting) {
          document.addEventListener("scroll", scrollHandler);
        } else {
          document.removeEventListener("scroll", scrollHandler);
        }
      };

      const observer = new IntersectionObserver(intersectionCallback);
      observer.observe(element);

      return () => {
        observer.disconnect();
        document.removeEventListener("scroll", scrollHandler);
      };
    }

    const initialTranslateLTR = -48 * 4;
    const initialTranslateRTL = 36 * 4;

    const cleanups = [
      setupIntersectionObserver(line1Ref.current, true, 0.15, initialTranslateLTR, initialTranslateRTL),
      setupIntersectionObserver(line2Ref.current, false, 0.15, initialTranslateLTR, initialTranslateRTL),
      setupIntersectionObserver(line3Ref.current, true, 0.15, initialTranslateLTR, initialTranslateRTL),
      setupIntersectionObserver(line4Ref.current, true, 0.15, initialTranslateLTR, initialTranslateRTL),
    ];

    return () => cleanups.forEach((cleanup) => cleanup && cleanup());
  }, []);

  // Accordion state
  const [openItems, setOpenItems] = useState({});
  const toggleItem = (id: any) =>
    setOpenItems((prev: any) => ({ ...prev, [id]: !prev[id] }));



  return (
    <>
      {/* //Navbar */}
      <nav className="p-3 flex bg-white justify-between items-center">
        <a href="#" id="brand" className="flex gap-2 items-center">
          <Image
            src={todologo}
            alt="logo"
            className="object-cover max-w-12 max-h-12"
          />
          <span className="text-lg font-medium">ToDesktop</span>
        </a>
        <div id="nav-menu" className="hidden lg:flex gap-12">
          <a href="" className="font-medium hover:text-blue-800">Pricing</a>
          <a href="" className="font-medium hover:text-blue-800">Docs</a>
          <a href="" className="font-medium hover:text-blue-800">Change Log</a>
          <a href="" className="font-medium hover:text-blue-800">Blogs</a>
          <a href="" className="font-medium hover:text-blue-800">Login</a>
        </div>
        <button className="hidden lg:flex gap-2 items-center border border-gray-400 rounded-2xl px-6 py-2 hover:border-gray-600">
          <Image
            src={electronlogo}
            alt="elctron"
            width={30}
            height={30}
          />
          <span>Electron Developer</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 12h16m-6-6l6 6-6 6" />
          </svg>
        </button>
        <button className="p-2 lg:hidden" onClick={handleClick}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </nav>

      {isOpenMenu && (
        <div className="fixed sm:hidden inset-0 p-3 bg-white">
          <div id="nav-bar" className="flex justify-between">
            <a href="#" id="brand" className="flex gap-2 items-center">
              <Image
                src={todologo}
                alt="logo"
                className="object-cover max-w-12 max-h-12"
              />
              <span className="text-lg font-medium">ToDesktop</span>
            </a>
            <button className="p-2 lg:hidden" onClick={handleClick}>
              {isOpenMenu ? (<svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>) : (<svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>)}
            </button>
          </div>

          {/*Mobile View*/}
          {isOpenMenu &&
            <div>
              <div className="mt-6">
                <a href="" className="font-medium m-3 p-3 hover:bg-gray-500 block rounded-lg">Pricing</a>
                <a href="" className="font-medium m-3 p-3 hover:bg-gray-500 block rounded-lg">Docs</a>
                <a href="" className="font-medium m-3 p-3 hover:bg-gray-500 block rounded-lg">ChangeLog</a>
                <a href="" className="font-medium m-3 p-3 hover:bg-gray-500 block rounded-lg">Blog</a>
                <a href="" className="font-medium m-3 p-3 hover:bg-gray-500 block rounded-lg">Login</a>
              </div>
              <div className="h-[1px] bg-gray-300"></div>

              <button className="mt-6 w-full flex gap-2 items-center rounded-2xl px-6 py-4 hover:bg-gray-50">
                <Image
                  src={electronlogo}
                  alt="elctron"
                  width={30}
                  height={30}
                />
                <span>Electron Developer</span>
              </button>
            </div>
          }
        </div>
      )}

      {/* Hero Section */}
      <main>
        <div id="hero" className="min-h-screen bg-gradient-to-br from-purple-50 via- orange-50 to-transparent">
          <div id="hero-container" className="max-w-4xl mx-auto px-6 pt-6 pb-32 flex flex-col sm:items-center">
            <div id="version-text" className="flex items-center my-6 gap-2 border border-yellow-300 bg-yellow-50 rounded-lg w-fit p-2 shadow-md hover:shadow-lg hover:-translate-y-1 transition group">
              <div className="w-2 h-2 bg-yellow-400 rounded-full border-yellow-600"></div>
              <p className="font-medium text-yellow-600">v0.21.1 <span className="text-yellow-800">Find-in-page bug fixes</span></p>
              <button className="group-hover:translate-x-1 transition duration-300 text-yellow-600">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 12h16m-6-6l6 6-6 6" />
                </svg>
              </button>
            </div>
            <div id="hero-features" className="hidden sm:flex gap-8 my-6">
              <div className="flex justify-center gap-2 items-center text-gray-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6 text-sm"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M7 2a2 2 0 00-2 2v16a2 2 0 002 2h10a2 2 0 002-2V9l-6-7H7z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13 3v6h6"
                  />
                </svg>
                <p>Code Optional</p>
              </div>
              <div className="flex justify-center gap-2 items-center text-gray-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 3h.01M15 3h.01M9 9h.01M15 9h.01M9 15h.01M15 15h.01M9 21h.01M15 21h.01"
                  />
                </svg>
                <p>Drag & drop builder</p>
              </div>
              <div className="flex justify-center gap-2 items-center text-gray-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <rect x="3" y="4" width="18" height="12" rx="2" ry="2" />
                  <line x1="8" y1="20" x2="16" y2="20" />
                  <line x1="12" y1="16" x2="12" y2="20" />
                </svg>

                <p>Windows, Mac, Linux</p>
              </div>
            </div>
            <h1 className="text-4xl font-semibold leading-snug mt-4 sm:text-7xl sm:leading-normal text-center">Web app to desktop app in minutes</h1>
            <p className="text-xl text-gray-800 text-center">Take your web app codebase and transform it into a cross platform desktop app with native functionality.</p>
            <div id="buttons-container" className="mt-12 flex flex-col gap-4 sm:flex-row">
              <button className="px-8 py-3 font-semibold rounded-lg text-white bg-blue-600 shadow-sm hover:bg-opacity-90">Download Now</button>
              <button className="px-8 py-3 font-semibold rounded-lg bg-white border border-gray-400">Read Docs</button>
            </div>
          </div>
          <div id="companies-container" className="flex flex-col gap-8">
            <div id="companies-title" className="flex justify-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6 translate-y-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 10H5m0 0l4-4m-4 4l4 4m6-4h4a4 4 0 010 8h-3"
                />
              </svg>

              <span className="font-medium">APPS POWERED BY TODESKTOP</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6 translate-y-2 -scale-x-100"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 10H5m0 0l4-4m-4 4l4 4m6-4h4a4 4 0 010 8h-3"
                />
              </svg>
            </div>
            <div id="lines-group" className="flex flex-col gap-4">
              <div className="overflow-hidden">
                <div ref={line1Ref} className="flex gap-4 transition-transform duration-100 ease-out">
                  {[...Array(16)].map((_, index) => (
                    <div key={index} className="flex flex-col min-w-24 min-h-24 items-center justify-center bg-white rounded-xl border border-gray-300">
                      <Image
                        src={unbounce}
                        alt=""
                        className="w-12 h-12"
                      />
                      <span className="text-[12px] md:text-[16px] font-semibold">Unbounce</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="overflow-hidden">
                <div ref={line2Ref} className="flex gap-4 transition-transform duration-100 ease-out">
                  {[...Array(16)].map((_, index) => (
                    <div key={index} className="flex flex-col min-w-24 min-h-24 items-center justify-center bg-white rounded-xl border border-gray-300">
                      <Image
                        src={unbounce}
                        alt=""
                        className="w-12 h-12"
                      />
                      <span className="text-[12px] md:text-[16px] font-semibold">Unbounce</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="overflow-hidden">
                {/* <div ref={line3Ref} className="flex gap-4 transition-transform duration-100 ease-out">
                  {[...Array(16)].map((_, index) => (
                    <div key={index} className="flex flex-col min-w-24 min-h-24 items-center justify-center bg-white rounded-xl border border-gray-300">
                      <Image
                        src={unbounce}
                        alt=""
                        className="w-12 h-12"
                      />
                      <span className="text-[12px] md:text-[16px] font-semibold">Unbounce</span>
                    </div>
                  ))}
                </div> */}
              </div>
            </div>
          </div>
        </div>


        {/* Step By Step */}

        <div id="steps" className="flex flex-col gap-6 px-6 py-12 max-w-7xl mt-16 mx-auto lg:px-8 lg:mt-32">
          <h2 className="text-5xl sm:font-semibold mb-14">How It Works</h2>
          <div id="step-1" className="rounded-xl border border-gray-200 px-8 py-12 flex flex-col lg:flex-row">
            <div className="flex flex-col gap-6 lg:w-1/2">
              <span className="border border-yellow-300 bg-yellow-50 text-yellow-800 w-fit px-3 py-1 rounded-lg font-medium">Step 1</span>
              <h3 className="text-4xl">Bootstrap straight from your web app</h3>
              <p className="text-lg font-light">Copy and paste your web app url into ToDesktop. Customise your app design, app icon and window frame UI with no code.</p>
              <ul className="grid grid-cols-2 gap-2">
                <li className="flex gap-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-6 h-6 text-gray-600"
                  >
                    <path d="M5 13l4 4L19 7" />
                  </svg>
                  <a className="text-lg font-light border-b border-black border-opacity-30 hover:border-opacity-80" href="">Multiple Windows</a>
                </li>
                <li className="flex gap-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-6 h-6 text-gray-600"
                  >
                    <path d="M5 13l4 4L19 7" />
                  </svg>
                  <a className="text-lg font-light border-b border-black border-opacity-30 hover:border-opacity-80" href="">Multiple Windows</a>
                </li>
                <li className="flex gap-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-6 h-6 text-gray-600"
                  >
                    <path d="M5 13l4 4L19 7" />
                  </svg>
                  <a className="text-lg font-light border-b border-black border-opacity-30 hover:border-opacity-80" href="">Multiple Windows</a>
                </li>
                <li className="flex gap-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-6 h-6 text-gray-600"
                  >
                    <path d="M5 13l4 4L19 7" />
                  </svg>
                  <a className="text-lg font-light border-b border-black border-opacity-30 hover:border-opacity-80" href="">Multiple Windows</a>
                </li>
                <li className="flex gap-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-6 h-6 text-gray-600"
                  >
                    <path d="M5 13l4 4L19 7" />
                  </svg>
                  <a className="text-lg font-light border-b border-black border-opacity-30 hover:border-opacity-80" href="">Multiple Windows</a>
                </li>
                <li className="flex gap-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-6 h-6 text-gray-600"
                  >
                    <path d="M5 13l4 4L19 7" />
                  </svg>
                  <a className="text-lg font-light border-b border-black border-opacity-30 hover:border-opacity-80" href="">Multiple Windows</a>
                </li>
              </ul>
            </div>
            <div className="pt-12">
              <img src="./assets/asset 66.svg" alt="" />
            </div>
          </div>
          <div id="step-2" className="rounded-xl border  border-gray-200 px-8 py-12 flex flex-col lg:flex-row">
            <div className="flex flex-col gap-6 lg:w-1/2">
              <span className="border border-yellow-300 bg-yellow-50 text-yellow-800 w-fit px-3 py-1 rounded-lg font-medium">Step 1</span>
              <h3 className="text-4xl">Bootstrap straight from your web app</h3>
              <p className="text-lg font-light">Copy and paste your web app url into ToDesktop. Customise your app design, app icon and window frame UI with no code.</p>
              <ul className="grid grid-cols-2 gap-2">
                <li className="flex gap-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-6 h-6 text-gray-600"
                  >
                    <path d="M5 13l4 4L19 7" />
                  </svg>
                  <a className="text-lg font-light border-b border-black border-opacity-30 hover:border-opacity-80" href="">Multiple Windows</a>
                </li>
                <li className="flex gap-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-6 h-6 text-gray-600"
                  >
                    <path d="M5 13l4 4L19 7" />
                  </svg>
                  <a className="text-lg font-light border-b border-black border-opacity-30 hover:border-opacity-80" href="">Multiple Windows</a>
                </li>
                <li className="flex gap-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-6 h-6 text-gray-600"
                  >
                    <path d="M5 13l4 4L19 7" />
                  </svg>
                  <a className="text-lg font-light border-b border-black border-opacity-30 hover:border-opacity-80" href="">Multiple Windows</a>
                </li>
                <li className="flex gap-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-6 h-6 text-gray-600"
                  >
                    <path d="M5 13l4 4L19 7" />
                  </svg>
                  <a className="text-lg font-light border-b border-black border-opacity-30 hover:border-opacity-80" href="">Multiple Windows</a>
                </li>
                <li className="flex gap-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-6 h-6 text-gray-600"
                  >
                    <path d="M5 13l4 4L19 7" />
                  </svg>
                  <a className="text-lg font-light border-b border-black border-opacity-30 hover:border-opacity-80" href="">Multiple Windows</a>
                </li>
                <li className="flex gap-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-6 h-6 text-gray-600"
                  >
                    <path d="M5 13l4 4L19 7" />
                  </svg>
                  <a className="text-lg font-light border-b border-black border-opacity-30 hover:border-opacity-80" href="">Multiple Windows</a>
                </li>
              </ul>
            </div>
            <div className="pt-12">
              <img src="./assets/asset 66.svg" alt="" />
            </div>
          </div>
          <div id="step-3" className="rounded-xl border border-gray-200 px-8 py-12 flex flex-col lg:flex-row">
            <div className="flex flex-col gap-6 lg:w-1/2">
              <span className="border border-yellow-300 bg-yellow-50 text-yellow-800 w-fit px-3 py-1 rounded-lg font-medium">Step 1</span>
              <h3 className="text-4xl">Bootstrap straight from your web app</h3>
              <p className="text-lg font-light">Copy and paste your web app url into ToDesktop. Customise your app design, app icon and window frame UI with no code.</p>
              <ul className="grid grid-cols-2 gap-2">
                <li className="flex gap-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-6 h-6 text-gray-600"
                  >
                    <path d="M5 13l4 4L19 7" />
                  </svg>
                  <a className="text-lg font-light border-b border-black border-opacity-30 hover:border-opacity-80" href="">Multiple Windows</a>
                </li>
                <li className="flex gap-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-6 h-6 text-gray-600"
                  >
                    <path d="M5 13l4 4L19 7" />
                  </svg>
                  <a className="text-lg font-light border-b border-black border-opacity-30 hover:border-opacity-80" href="">Multiple Windows</a>
                </li>
                <li className="flex gap-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-6 h-6 text-gray-600"
                  >
                    <path d="M5 13l4 4L19 7" />
                  </svg>
                  <a className="text-lg font-light border-b border-black border-opacity-30 hover:border-opacity-80" href="">Multiple Windows</a>
                </li>
                <li className="flex gap-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-6 h-6 text-gray-600"
                  >
                    <path d="M5 13l4 4L19 7" />
                  </svg>
                  <a className="text-lg font-light border-b border-black border-opacity-30 hover:border-opacity-80" href="">Multiple Windows</a>
                </li>
                <li className="flex gap-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-6 h-6 text-gray-600"
                  >
                    <path d="M5 13l4 4L19 7" />
                  </svg>
                  <a className="text-lg font-light border-b border-black border-opacity-30 hover:border-opacity-80" href="">Multiple Windows</a>
                </li>
                <li className="flex gap-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-6 h-6 text-gray-600"
                  >
                    <path d="M5 13l4 4L19 7" />
                  </svg>
                  <a className="text-lg font-light border-b border-black border-opacity-30 hover:border-opacity-80" href="">Multiple Windows</a>
                </li>
              </ul>
            </div>
            <div className="pt-12">
              <img src="./assets/asset 66.svg" alt="" />
            </div>
          </div>
        </div>


        {/* Bento Grid */}
        <div id="bento-grid" className="px-6 py-2 max-w-7xl mx-auto lg:px-8 lg:mt-32">
          <h2 className="text-5xl sm:font-semibold mb-14">Todesktop handles the details</h2>
          <div id="grid-container" className="flex flex-col gap-6 lg:grid lg:grid-cols-3" style={{ gridAutoRows: "96px" }}>
            <div className="row-start-1 row-end-3 group rounded-2xl p-[1px] bg-slate-100 hover:bg-gradient-to-br hover:from-red-200 hover:via-purple-200 hover:to-yellow-200">
              <div className="bg-white rounded-2xl w-full h-full p-6 flex flex-col gap-6 items-center group-hover:bg-gradient-to-br group-hover:from-red-50 group-hover:via-purple-50 hover:to-yellow-50">
                <h3 className="text-2xl">Native Notifications</h3>
                <img src="./assets/asset 37.png" alt="" />
              </div>
            </div>
            <div className="row-start-1 row-end-4 group rounded-2xl p-[1px] bg-slate-100 hover:bg-gradient-to-br hover:from-red-200 hover:via-purple-200 hover:to-yellow-200">
              <div className="bg-white rounded-2xl w-full h-full p-6 flex flex-col gap-6 items-center group-hover:bg-gradient-to-br group-hover:from-red-50 group-hover:via-purple-50 hover:to-yellow-50">
                <h3 className="text-2xl">Native Notifications</h3>
                <p className="text-lg text-center font-light">We’ll ensure the underlying browser is up to date and deliver performance improvements, security patches, & additional features.</p>
                <img src="./assets/asset 37.png" alt="" />
              </div>
            </div>
            <div className="row-start-1 row-end-3 group rounded-2xl p-[1px] bg-slate-100 hover:bg-gradient-to-br hover:from-red-200 hover:via-purple-200 hover:to-yellow-200">
              <div className="bg-slate-50 rounded-2xl w-full h-full p-6 flex flex-col gap-6 items-center group-hover:bg-gradient-to-br group-hover:from-red-50 group-hover:via-purple-50 hover:to-yellow-50">
                <h3 className="text-2xl">Native Notifications</h3>
                <img src="./assets/asset 37.png" alt="" />
              </div>
            </div>
            <div className="row-start-3 row-end-6 group rounded-2xl p-[1px] bg-slate-100 hover:bg-gradient-to-br hover:from-red-200 hover:via-purple-200 hover:to-yellow-200">
              <div className="bg-slate-50 rounded-2xl w-full h-full p-6 flex flex-col gap-6 items-center group-hover:bg-gradient-to-br group-hover:from-red-50 group-hover:via-purple-50 hover:to-yellow-50">
                <h3 className="text-2xl">Native Notifications</h3>
                <p>We’ll ensure the underlying browser is up to date and deliver performance improvements, security patches, & additional features.</p>
                <img src="./assets/asset 37.png" alt="" />
              </div>
            </div>
            <div className="row-start-4 row-end-6 group rounded-2xl p-[1px] bg-slate-100 hover:bg-gradient-to-br hover:from-red-200 hover:via-purple-200 hover:to-yellow-200">
              <div className="bg-slate-50 rounded-2xl w-full h-full p-6 flex flex-col gap-6 items-center group-hover:bg-gradient-to-br group-hover:from-red-50 group-hover:via-purple-50 hover:to-yellow-50">
                <h3 className="text-2xl">Native Notifications</h3>
                <img src="./assets/asset 37.png" alt="" />
              </div>
            </div>
            <div className="row-start-3 row-end-6 group rounded-2xl p-[1px] bg-slate-100 hover:bg-gradient-to-br hover:from-red-200 hover:via-purple-200 hover:to-yellow-200">
              <div className="bg-slate-50 rounded-2xl w-full h-full p-6 flex flex-col gap-6 items-center group-hover:bg-gradient-to-br group-hover:from-red-50 group-hover:via-purple-50 hover:to-yellow-50">
                <h3 className="text-2xl">Native Notifications</h3>
                <p>We’ll ensure the underlying browser is up to date and deliver performance improvements, security patches, & additional features.</p>
                <img src="./assets/asset 37.png" alt="" />
              </div>
            </div>
          </div>
        </div>


        {/* Companies Feature Line */}
        <div id="features-line" className="px-6 max-w-7xl mt-4 mx-auto lg:px-8 lg:mt-32">
          <div className="border border-gray-300 rounded-lg overflow-hidden flex justify-center p-4">
            <div id="line4" ref={line4Ref} className="flex gap-8 p-6 transition-transform duration-100 ease-out">
              <h3 className="whitespace-nowrap my-0 mx-2 text-2xl font-semibold">Download Analytics</h3>
              <span>●</span>
              <h3 className="whitespace-nowrap my-0 mx-2 text-2xl font-semibold">Multi-window support</h3>
              <span>●</span>
              <h3 className="whitespace-nowrap my-0 mx-2 text-2xl font-semibold">Trays</h3>
              <span>●</span>
              <h3 className="whitespace-nowrap my-0 mx-2 text-2xl font-semibold">Deep Linking</h3>
              <span>●</span>
              <h3 className="whitespace-nowrap my-0 mx-2 text-2xl font-semibold">Launch at startup</h3>
              <h3 className="whitespace-nowrap my-0 mx-2 text-2xl font-semibold">Custom Menus</h3>
              <span>●</span>
            </div>
          </div>
        </div>
        {/* Testimonials */}

        <div id="testimonials" className="px-6 py-2 max-w-7xl mt-16 mx-auto lg:px-8 lg:mt-32">
          <h2 className="text-5xl sm:font-semibold mb-14">Customer Stories</h2>
          <div className="rounded-xl border border-gray-300 flex flex-col lg:flex-row items-end">
            <div id="left" className="flex flex-col gap-12 p-8">
              <div className="h-4 w-fit">
                <img src="./assets/asset 44.svg" alt="" />
              </div>
              <h3 className="text-xl leading-relaxed">ClickUp used ToDesktop to get their desktop app in front of customers in days instead of months.</h3>
              <div id="tag-container" className="flex gap-3 flex-wrap">
                <div className="flex gap-2 items-center justify-center bg-yellow-50 w-fit border border-yellow-300 px-3 py-1 rounded-md text-yellow-800">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-6 h-6 "
                  >
                    <path d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Chromeless UI</span>
                </div>
                <div className="flex gap-2 items-center justify-center bg-yellow-50 w-fit border border-yellow-300 px-3 py-1 rounded-md text-yellow-800">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-6 h-6 "
                  >
                    <path d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Native spellcheck</span>
                </div>
                <div className="flex gap-2 items-center justify-center bg-yellow-50 w-fit border border-yellow-300 px-3 py-1 rounded-md text-yellow-800">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-6 h-6 "
                  >
                    <path d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Task time in menubar</span>
                </div>
                <div className="flex gap-2 items-center justify-center bg-yellow-50 w-fit border border-yellow-300 px-3 py-1 rounded-md text-yellow-800">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-6 h-6 "
                  >
                    <path d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Notification count in the dock</span>
                </div>
                <div className="flex gap-2 items-center justify-center bg-yellow-50 w-fit border border-yellow-300 px-3 py-1 rounded-md text-yellow-800">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-6 h-6 "
                  >
                    <path d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Global hotkey to create task
                  </span>
                </div>
              </div>
              <p className="text-lg font-light text-gray-500">“ToDesktop provided us with a <span className="text-black">polished desktop app</span> in no time. Their expert team guided us through a smooth migration from our outdated legacy desktop app, enabling us to deliver <span className="text-black">new and improved features</span> to our customers within days.”</p>
              <div id="user-card" className="flex gap-4">
                <div className="w-12">
                  <img src="./assets/asset 45.jpeg" alt="" className="rounded-full" />
                </div>
                <div className="flex flex-col">
                  <h3>Zeb Evans</h3>
                  <p className="text-gray-500">Founder&CEO, <a href="" className="border-b border-dotted border-y-gray-300 hover:border-solid hover:border-gray-500">Clickup</a></p>
                </div>
              </div>
            </div>

            <div id="right">
              <img src="./assets/asset 46.png" className="pl-12" alt="" />
            </div>
          </div>
          <div className="flex flex-col lg:flex-row justify-between gap-4 mt-6">
            <div className="flex rounded-2xl p-[1px] bg-slate-100 hover:bg-gradient-to-br hover:from-red-200 hover:via-purple-200 hover:to-yellow-200 group">

            </div>
          </div>
        </div>
        <div className="flex flex-col lg:flex-row justify-between gap-4 px-6 py-2 max-w-7xl mt-4 mx-auto lg:px-8 lg:mt-32">
          <div className="flex rounded-2xl p-[1px] bg-slate-100 hover:bg-gradient-to-br hover:from-red-200 hover:via-purple-200 hover:to-yellow-200 group">
            <div className="flex flex-col group-hover:bg-gradient-to-br group-hover:from-red-50 group-hover:via-purple-50 group-hover:to-yellow-50 rounded-2xl p-6 w-full">

              {/* Icon and Title Row */}
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-blue-200 flex items-center justify-center rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <title>Code icon</title>
                    <polyline points="8 6 2 12 8 18"></polyline>
                    <polyline points="16 6 22 12 16 18"></polyline>
                    <line x1="11" y1="7" x2="13" y2="17"></line>
                  </svg>
                </div>
                <h3 className="text-2xl font-semibold">Native APIs</h3>
              </div>

              {/* Description Text */}
              <p className="text-lg font-light mb-6">
                What sets ToDesktop apart is its seamless integration with native APIs using our existing web codebase. By tapping into APIs like Tray and Notifications, we've crafted an exceptionally polished desktop user experience.
              </p>

              {/* Author Section */}
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                  <img src="./assets/asset 47.png" alt="Author" className="w-full h-full object-cover" />
                </div>
                <div>
                  <h4 className="font-semibold">Author Name</h4>
                  <p className="text-gray-500 text-sm">Title/Company</p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex rounded-2xl p-[1px] bg-slate-100 hover:bg-gradient-to-br hover:from-red-200 hover:via-purple-200 hover:to-yellow-200 group">
            <div className="flex flex-col group-hover:bg-gradient-to-br group-hover:from-red-50 group-hover:via-purple-50 group-hover:to-yellow-50 rounded-2xl p-6 w-full">

              {/* Icon and Title Row */}
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-blue-200 flex items-center justify-center rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <title>Code icon</title>
                    <polyline points="8 6 2 12 8 18"></polyline>
                    <polyline points="16 6 22 12 16 18"></polyline>
                    <line x1="11" y1="7" x2="13" y2="17"></line>
                  </svg>
                </div>
                <h3 className="text-2xl font-semibold">Native APIs</h3>
              </div>

              {/* Description Text */}
              <p className="text-lg font-light mb-6">
                What sets ToDesktop apart is its seamless integration with native APIs using our existing web codebase. By tapping into APIs like Tray and Notifications, we've crafted an exceptionally polished desktop user experience.
              </p>

              {/* Author Section */}
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                  <img src="./assets/asset 47.png" alt="Author" className="w-full h-full object-cover" />
                </div>
                <div>
                  <h4 className="font-semibold">Author Name</h4>
                  <p className="text-gray-500 text-sm">Title/Company</p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex rounded-2xl p-[1px] bg-slate-100 hover:bg-gradient-to-br hover:from-red-200 hover:via-purple-200 hover:to-yellow-200 group">
            <div className="flex flex-col group-hover:bg-gradient-to-br group-hover:from-red-50 group-hover:via-purple-50 group-hover:to-yellow-50 rounded-2xl p-6 w-full">

              {/* Icon and Title Row */}
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-blue-200 flex items-center justify-center rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <title>Code icon</title>
                    <polyline points="8 6 2 12 8 18"></polyline>
                    <polyline points="16 6 22 12 16 18"></polyline>
                    <line x1="11" y1="7" x2="13" y2="17"></line>
                  </svg>
                </div>
                <h3 className="text-2xl font-semibold">Native APIs</h3>
              </div>

              {/* Description Text */}
              <p className="text-lg font-light mb-6">
                What sets ToDesktop apart is its seamless integration with native APIs using our existing web codebase. By tapping into APIs like Tray and Notifications, we've crafted an exceptionally polished desktop user experience.
              </p>

              {/* Author Section */}
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                  <img src="./assets/asset 47.png" alt="Author" className="w-full h-full object-cover" />
                </div>
                <div>
                  <h4 className="font-semibold">Author Name</h4>
                  <p className="text-gray-500 text-sm">Title/Company</p>
                </div>
              </div>
            </div>
          </div>
        </div>


        <div className="max-w-7xl mt-20 mx-6 lg:mx-auto lg:mt-32 bg-black h-full rounded-2xl flex flex-col lg:flex-row gap-2">
          <div className="px-6 py-8 lg:px-8 w-full lg:w-1/2">
            <h3 className="text-gray-500 mt-4 lg:mt-14 text-sm lg:text-base">READY TO START BUILDING?</h3>
            <h1 className="text-2xl lg:text-4xl text-white mt-4 lg:mt-6 leading-tight">Create your desktop app for free*</h1>
            <h2 className="text-gray-600 text-lg lg:text-2xl font-light mt-4 lg:mt-6 leading-relaxed">ToDesktop Builder will take you step-by-step through the process of creating your first desktop app in just a few minutes.</h2>

            <div className="mt-6 lg:mt-10">
              <button className="flex items-center justify-center gap-3 text-white text-base lg:text-lg bg-blue-600 hover:bg-blue-700 px-6 lg:px-36 py-3 rounded-lg transition-colors duration-200 w-full lg:w-auto">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <title>Download</title>
                  <path d="M12 3v12"></path>
                  <polyline points="7 12 12 17 17 12"></polyline>
                  <rect x="5" y="19" width="14" height="2" rx="1"></rect>
                </svg>
                Download ToDesktop Builder
              </button>
            </div>
            <p className="mt-6 lg:mt-10 text-xs lg:text-sm text-gray-600 leading-relaxed">*You can create a desktop app and run it on your computer for free. You will only be charged if you want to create a distributable app for your customers.</p>
          </div>
          <div className="pt-6 lg:pt-10 w-full lg:w-1/2">
            <img src="./assets/asset 46.png" alt="" className="w-full h-auto rounded-b-2xl lg:rounded-r-2xl lg:rounded-bl-none" />
          </div>
        </div>

        {/* Choose a plan */}
        <div className="max-w-7xl mt-20 mx-6 lg:mx-auto lg:px-8 lg:mt-32 h-full rounded-2xl  gap-2">
          <h1 className="text-5xl text-black">Choose a plan that fits your needs</h1>
          <div className="grid lg:grid-cols-3 gap-6 items-stretch">
            <div className="mt-20 flex flex-col  w-full  border border-blue-50 rounded-2xl px-6 py-10 bg-violet-50">
              <h1 className="text-5xl">Free</h1>
              <p className="mt-6 text-xl font-light">For personal use or testing your app before deploying to customers.</p>

              <p className="mt-6">KEY FEATURES</p>
              <ul className="text-lg mt-6 font-light">
                <li className="flex gap-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-6 h-6 text-gray-600"
                  >
                    <path d="M5 13l4 4L19 7" />
                  </svg>
                  Free for personal use</li>
                <li className="flex gap-4 pt-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-6 h-6 text-gray-600"
                  >
                    <path d="M5 13l4 4L19 7" />
                  </svg>Free for personal use</li>
                <li className="flex gap-4 pt-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-6 h-6 text-gray-600"
                  >
                    <path d="M5 13l4 4L19 7" />
                  </svg>Free for personal use</li>
                <li className="flex gap-4 pt-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-6 h-6 text-gray-600"
                  >
                    <path d="M5 13l4 4L19 7" />
                  </svg>Free for personal use</li>
              </ul>

              <button className="border border-gray-400 rounded-lg px-20 py-4 mt-6 text-lg text-blue-700 font-bold">Read Docs</button>
            </div>
            <div className="mt-20 flex flex-col  w-full border border-blue-50 rounded-2xl px-6 py-10 bg-violet-50">
              <h1 className="text-5xl">Essential</h1>
              <p className="mt-6 text-xl font-light">For simple desktop apps.</p>
              <span className="flex items-baseline space-x-1 mt-4" >
                <p className="text-2xl font-bold">$99</p>
                <p>/month</p>
              </span>

              <p className="mt-6">KEY FEATURES</p>
              <ul className="text-lg mt-6 font-light">
                <li className="flex gap-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-6 h-6 text-gray-600"
                  >
                    <path d="M5 13l4 4L19 7" />
                  </svg>
                  Free for personal use</li>
                <li className="flex gap-4 pt-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-6 h-6 text-gray-600"
                  >
                    <path d="M5 13l4 4L19 7" />
                  </svg>Free for personal use</li>
                <li className="flex gap-4 pt-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-6 h-6 text-gray-600"
                  >
                    <path d="M5 13l4 4L19 7" />
                  </svg>Free for personal use</li>
                <li className="flex gap-4 pt-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-6 h-6 text-gray-600"
                  >
                    <path d="M5 13l4 4L19 7" />
                  </svg>Free for personal use</li>
              </ul>

              <button className="border border-gray-400 rounded-lg px-20 py-4 mt-6 text-lg text-blue-700 font-bold">Read Docs</button>
            </div>
            <div className="relative mt-20 flex flex-col  w-full border border-blue-50 rounded-2xl px-6 py-10 bg-violet-50">
              {/* Badge */}
              <span className="absolute -top-4 right-6 -translate-x-1/2 bg-blue-100 text-blue-700 font-bold px-4 py-1 rounded-full text-sm shadow">
                Most Popular
              </span>

              <h1 className="text-5xl">Professional</h1>
              <p className="mt-6 text-xl font-light">For sophisticated desktop apps.</p>
              <span className="flex items-baseline space-x-1 mt-4" >
                <p className="text-2xl font-bold">$99</p>
                <p>/month</p>
              </span>
              <p className="mt-6">KEY FEATURES</p>
              <ul className="text-lg mt-6 font-light">
                <li className="flex gap-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-6 h-6 text-gray-600"
                  >
                    <path d="M5 13l4 4L19 7" />
                  </svg>
                  Free for personal use</li>
                <li className="flex gap-4 pt-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-6 h-6 text-gray-600"
                  >
                    <path d="M5 13l4 4L19 7" />
                  </svg>Free for personal use</li>
                <li className="flex gap-4 pt-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-6 h-6 text-gray-600"
                  >
                    <path d="M5 13l4 4L19 7" />
                  </svg>Free for personal use</li>
                <li className="flex gap-4 pt-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-6 h-6 text-gray-600"
                  >
                    <path d="M5 13l4 4L19 7" />
                  </svg>Free for personal use</li>
              </ul>

              <button className="border border-gray-400 rounded-lg px-20 py-4 mt-6 text-lg text-white font-bold bg-blue-700">Read Docs</button>
            </div>
          </div>
        </div>

        {/* FAQ */}
        <div className="max-w-7xl mt-20 mx-6 lg:mx-auto lg:px-8 lg:mt-32 h-full gap-2">
          <span className="flex items-end">
            <h1 className="text-6xl font-bold">FAQ</h1>
            <p className="text-5xl font-bold">s</p>
          </span>

          <div className="grid lg:grid-cols-2 gap-4 items-stretch">
            <div className="w-full border border-gray-300 rounded-xl p-6 mt-10 bg-slate-50">
              {/* Row: Question + Toggle button */}
              <div className="flex justify-between items-center">
                <h1 className="text-xl">Is ToDesktop For Me?</h1>
                {isOpenFAQ1 ? <button onClick={() => setIsOpenFAQ1(prev => !prev)}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-6 h-6"
                  >
                    <path d="M18 15l-6-6-6 6" />
                  </svg>
                </button> :
                  <button onClick={() => setIsOpenFAQ1(prev => !prev)}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="w-6 h-6"
                    >
                      <path d="M6 9l6 6 6-6" />
                    </svg>
                  </button>
                }
              </div>

              {/* Answer: appears below */}
              {isOpenFAQ1 && (
                <p className="mt-4 text-gray-700 text-xl">
                  That depends! If you would like to distribute your web app to your users
                  as a downloadable desktop app then ToDesktop is for you.
                </p>
              )}
            </div>

            <div className="w-full border border-gray-300 rounded-xl p-6 mt-10 bg-slate-50">
              {/* Row: Question + Toggle button */}
              <div className="flex justify-between items-center">
                <h1 className="text-xl">Is ToDesktop For Me?</h1>
                {isOpenFAQ2 ? <button onClick={() => setIsOpenFAQ2(prev => !prev)}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-6 h-6"
                  >
                    <path d="M18 15l-6-6-6 6" />
                  </svg>
                </button> :
                  <button onClick={() => setIsOpenFAQ2(prev => !prev)}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="w-6 h-6"
                    >
                      <path d="M6 9l6 6 6-6" />
                    </svg>
                  </button>
                }
              </div>

              {/* Answer: appears below */}
              {isOpenFAQ2 && (
                <p className="mt-4 text-gray-700 text-xl">
                  That depends! If you would like to distribute your web app to your users
                  as a downloadable desktop app then ToDesktop is for you.
                </p>
              )}
            </div>
            <div className="w-full border border-gray-300 rounded-xl p-6 mt-10 bg-slate-50">
              {/* Row: Question + Toggle button */}
              <div className="flex justify-between items-center">
                <h1 className="text-xl">Is ToDesktop For Me?</h1>
                {isOpenFAQ3 ? <button onClick={() => setIsOpenFAQ3(prev => !prev)}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-6 h-6"
                  >
                    <path d="M18 15l-6-6-6 6" />
                  </svg>
                </button> :
                  <button onClick={() => setIsOpenFAQ3(prev => !prev)}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="w-6 h-6"
                    >
                      <path d="M6 9l6 6 6-6" />
                    </svg>
                  </button>
                }
              </div>

              {/* Answer: appears below */}
              {isOpenFAQ3 && (
                <p className="mt-4 text-gray-700 text-xl">
                  That depends! If you would like to distribute your web app to your users
                  as a downloadable desktop app then ToDesktop is for you.
                </p>
              )}
            </div>
            <div className="w-full border border-gray-300 rounded-xl p-6 mt-10 bg-slate-50">
              {/* Row: Question + Toggle button */}
              <div className="flex justify-between items-center">
                <h1 className="text-xl">Is ToDesktop For Me?</h1>
                {isOpenFAQ4 ? <button onClick={() => setIsOpenFAQ4(prev => !prev)}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-6 h-6"
                  >
                    <path d="M18 15l-6-6-6 6" />
                  </svg>
                </button> :
                  <button onClick={() => setIsOpenFAQ4(prev => !prev)}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="w-6 h-6"
                    >
                      <path d="M6 9l6 6 6-6" />
                    </svg>
                  </button>
                }
              </div>

              {/* Answer: appears below */}
              {isOpenFAQ4 && (
                <p className="mt-4 text-gray-700 text-xl">
                  That depends! If you would like to distribute your web app to your users
                  as a downloadable desktop app then ToDesktop is for you.
                </p>
              )}
            </div>
            <div className="w-full border border-gray-300 rounded-xl p-6 mt-10 bg-slate-50">
              {/* Row: Question + Toggle button */}
              <div className="flex justify-between items-center">
                <h1 className="text-xl">Is ToDesktop For Me?</h1>
                {isOpenFAQ5 ? <button onClick={() => setIsOpenFAQ5(prev => !prev)}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-6 h-6"
                  >
                    <path d="M18 15l-6-6-6 6" />
                  </svg>
                </button> :
                  <button onClick={() => setIsOpenFAQ5(prev => !prev)}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="w-6 h-6"
                    >
                      <path d="M6 9l6 6 6-6" />
                    </svg>
                  </button>
                }
              </div>

              {/* Answer: appears below */}
              {isOpenFAQ5 && (
                <p className="mt-4 text-gray-700 text-xl">
                  That depends! If you would like to distribute your web app to your users
                  as a downloadable desktop app then ToDesktop is for you.
                </p>
              )}
            </div>
            <div className="w-full border border-gray-300 rounded-xl p-6 mt-10 bg-slate-50">
              {/* Row: Question + Toggle button */}
              <div className="flex justify-between items-center">
                <h1 className="text-xl">Is ToDesktop For Me?</h1>
                {isOpenFAQ6 ? <button onClick={() => setIsOpenFAQ6(prev => !prev)}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-6 h-6"
                  >
                    <path d="M18 15l-6-6-6 6" />
                  </svg>
                </button> :
                  <button onClick={() => setIsOpenFAQ6(prev => !prev)}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="w-6 h-6"
                    >
                      <path d="M6 9l6 6 6-6" />
                    </svg>
                  </button>
                }
              </div>

              {/* Answer: appears below */}
              {isOpenFAQ6 && (
                <p className="mt-4 text-gray-700 text-xl">
                  That depends! If you would like to distribute your web app to your users
                  as a downloadable desktop app then ToDesktop is for you.
                </p>
              )}
            </div>
          </div>
        </div>

        {/* footer */}

        <footer className="max-w-7xl mt-20 mx-6 lg:mx-auto lg:px-8 lg:mt-32 h-full rounded-xl gap-6 bg-slate-50 flex flex-col lg:flex-row items-center py-14 justify-between">
          {/* Brand */}
          <div className="w-full lg:w-auto mb-6 lg:mb-0 flex justify-center lg:justify-start">
            <a href="#" id="brand" className="flex gap-2 items-center">
              <Image
                src={todologo}
                alt="logo"
                className="object-cover w-12 h-12"
              />
              <span className="text-lg font-medium">ToDesktop</span>
            </a>
          </div>

          {/* Images + Documentation */}
          <div className="w-full lg:w-auto flex flex-col lg:flex-row items-center gap-4">
            <div className="flex gap-2 justify-center">
              <a href="#" className="flex gap-2 items-center">
                <Image
                  src={todologo}
                  alt="logo"
                  className="object-cover w-12 h-12 rounded-full"
                />
              </a>
              <a href="#" className="flex gap-2 items-center">
                <Image
                  src={todologo}
                  alt="logo"
                  className="object-cover w-12 h-12"
                />
              </a>
            </div>
            <h1 className="text-center lg:text-left">Documentation</h1>
          </div>
        </footer>

        <div className="flex flex-col justify-center items-center my-10">
          <span className="flex gap-2">
            <img src="./assets/asset 54.svg" alt="y" className="w-5 h-5" />
            <h1 className="text-gray-700"> A Y Combinator company.</h1>
          </span>

          <h1 className="text-gray-500 mt-4"> © 2024 ToDesktop, Inc. All rights reserved.</h1>
        </div>
      </main >
    </>
  );
}