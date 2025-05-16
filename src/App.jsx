
import React, { useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import 'remixicon/fonts/remixicon.css';


function App() {

  let[showContent, setShowContent] = useState(false);
  useGSAP(() => {
    // Vi ko aage lane ke liye
    const tl = gsap.timeline();
    // creating a timeline

    tl.to(".vi-mask-group",{
      // animations in that timeline
      rotate: 10,
      duration: 3,
      ease: "Power4.easeInOut",
      
      transformOrigin: "50% 50%" ,

    }).to(".vi-mask-group",{
      scale: 10,
      duration: 2,
      delay: -1.8,
      ease: "Expo.easeInOut",
      transformOrigin: "50% 50%",
      opacity: 0,
      onUpdate: function(){
      if(this.progress() >= .9 ) {
        document.querySelector(".svg").remove();
        setShowContent(true);
        this.kill();
      }
      }
    })


  });

  useGSAP(()=>{

   if(!showContent) return;

   gsap.to(".main",{
  scale:1,
  rotate: 0,
  duration:2,
  dealy:"-1",
  ease: "Expo.easeInOut",

   });
      gsap.to(".sky",{
  scale:1.2,
  rotate: 0,
  duration:2,
  dealy:"-.8",
  ease: "Expo.easeInOut",

   });
         gsap.to(".bg",{
  scale:1.1,
  rotate: 0,
  duration:2,
  dealy:"-.8",
  ease: "Expo.easeInOut",

   });
            gsap.to(".character",{
  scale:0.8,
  bottom:"-64%",

  rotate: 0,
  duration:2,
  dealy:"-.8",
  ease: "Expo.easeInOut",

   });
            gsap.to(".text",{
  scale:1.1,
  rotate: 0,
  duration:2,
  dealy:"-.8",
  ease: "Expo.easeInOut",

   });

   const main= document.querySelector(".main");

   main?.addEventListener("mousemove", function (e) {
   const xMove =(e.clientX/ window.innerWidth - 0.5)* 40;
  //  Range from 0 to screen width/ screen width  [value ranges from 0 to 1 - 0.5]= value ranges from -0.5 to 0.5 * 40 but why this mathematics
   gsap.to(".text",{
    x:`${xMove*0.8}%`
    // jitni xmove ki movement thi utna percentage mein move karana hai
   });
   gsap.to(".sky",{
    x:xMove
   });
    gsap.to(".bg",{
    x:xMove*1.7
   });
   });
  },[showContent]);
  return (
    <>
      <div className="svg flex items-center justify-center fixed top-0 left-0 z-[100] w-full h-screen overflow-hidden bg-[#000]">
      {/*We'll use this class in GSAP to animate and eventually remove() the div.,You’ve created the "black cardboard" that will later have a cutout "VI". 
      ek black color ka div sabse upaar , 
      it has a svg inside coz,
      SVG is a markup language but for drawing shapes, text,images etc
      ⚔️ Why Use SVG Here?

Because you need to cut a hole (VI text) from a black screen
so that only background image shows through that text.
This kind of thing needs masks, and masks are SVG-only features.

You cannot do this effect using plain HTML + CSS easily.
      */}
        <svg viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice">
       
              {/* mask ke anardar rect+ g
              rect gives   {/*  svg ke andar defs to define a mask  aur image that cutout in black screen*/}
          <defs>
            {/* defs ke andar mask */}
            <mask id="viMask">
               {/*a rectangle shape which fills +
              g is a group element like div to contain all elements 
              ,
              <!-- Step 1: Start with full black (everything hidden) -->
              */}
              <rect width="100%" height="100%" fill="black" />
              <g className="vi-mask-group">
                {/* g contains the text just for grouping elements */}
                {/* <!-- Step 2: Add white text "VI" (only this part will be visible) --> */}
                <text
                  x="50%"
                  y="50%"
                  fontSize="250"
                  textAnchor="middle"
                  fill="white"
                  dominantBaseline="middle"
                  fontFamily="Arial Black"
                >
                  VI
                </text>
              </g>
            </mask>
          </defs>
          {/* ➡️ Step 4: How image is shown only inside the text 
          svgs mein defs ke sath along side image define karni hai aur jo mask ccreate kiya vo de dena hai
          */
          }
          <image
            href="./bg.png"
            width="100%"
            height="100%"
            preserveAspectRatio="xMidYMid slice"
            mask="url(#viMask)"
            // Reason for   preserveAspectRatio="xMidYMid slice"
            // 
            //  Background image poori screen bhare

// No gaps

// Center of image dikhe through "VI"
          />
        </svg>
      </div>
      {/* AGla content tabhi dikhan hai jab showcontent ki value true chal rahi ho */}
    {showContent && (<div className="main w-full rotate-[-10deg] scale-[1.7]" >
    {/* <h3>Gta VI</h3> */}
    <div className="landing w-full h-screen relative overflow-hidden bg-black">
      <div className="navbar absolute top-0 left-0 z-[1] w-full h-[30px]  px-10 py-4  bg-black" >
        <div className="logo">
          <div className="lines flex flex-col gap-[5px]" >
            <div className="line w-15 h-2 bg-white"></div>
            <div className="line w-8 h-2 bg-white"></div>
            <div className="line w-5 h-2 bg-white"></div>
          </div>
          <h3 className="text-3xl -mt-[px] leading-none text-white" >Rockstar</h3>
        </div>
      </div>
     
      <div className="imagesdiv relative overflow-hidden w-full h-screen">
        {/* parent ko relative deni hoti hai to have absolute to child, we are using to overlap these  via absolute */}
        <img className="sky scale-[1.7] rotate-[-20deg] absolute top-0 left-0 w-full h-full object-cover" src="../public/sky.png" alt="" />
        <img className="bg scale-[1.5] rotate-[-3deg] absolute top-0 left-0 w-full h-full object-cover" src="../public/bg.png" alt="" />
           <div className="text text-white flex flex-col gap-5 absolute top-29 left-1/2 ml-9  -translate-x-1/2 scale-[1.4] rotate-[-10deg]" >
        <h1 className="text-[8rem] leading-none -ml-40 "> Grand</h1>
        <h1 className="text-[8rem] leading-none -ml-10 ">Theft</h1>
        <h1 className="text-[8rem] leading-none -ml-40 " >Auto</h1>
      
      
      
      </div>
        <img className="character absolute -bottom-[150%] left-1/2 -translate-x-1/2 scale-[2] rotate-[-10deg]" src="../public/girlbg.png" alt="" />
      
      </div>
      <div className="btmbar text-white absolute bottom-0 left-0 w-full py-15 px-10 bg-gradient-to-t from-black to-transparent" >
      <div className="flex gap-4 items-center">
        <i className=" text-2xl ri-arrow-down-line"></i>
        <h3 className=" text-1/2xl font-[Helvetica_Now_Display]" >Scroll Down</h3>
        </div> 
        <img className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[70px]" src="../public/ps5.png" alt="" />
      </div>
    </div>
    <div className="w-full h-screen flex text-white items-center justify-center px-10 py-25 bg-black">
      <div className="cntnr flex w-full h-[80%] " >
        <div className="limg w-1/2 h-full relative">
        <img className="absolute scale-[1.2] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" src="../public/imag.png" alt="" />
      </div>
      <div className="rg">
        <h1 className="text-7xl">Still running,</h1>
        <h1 className="text-5xl">On the Chase</h1>
        <p className="mt-4 text-xl font-[Helvetica_Now_Display]">Rockstar Games has confirmed that GTA 6 will be released globally on May 26, 2026, with players able to access the game at midnight local time, ensuring a synchronized worldwide experience across all major platforms</p>
        <p className="mt-4  font-[Helvetica_Now_Display]">Despite rumors and viral leaks about a GTA 6 beta version, Rockstar has stated there may be an official public beta</p>
        <p className="mt-2 font-[Helvetica_Now_Display]">GTA 6 will introduce dual protagonists, including Lucia, the franchise’s first playable female character. This dynamic allows for a richer narrative and varied gameplay experiences as players switch between two leads with distinct backgrounds and motivations!</p>
          <p className="mt-4  font-[Helvetica_Now_Display] ">For the latest updates on GTA 6 release dates, trailers, and game features, always rely on the official Rockstar website and trusted gaming news outlets. Avoid unofficial sources claiming insider information or early access to beta versions, as these are not legitimate!</p>
          <a href="https://youtu.be/dQw4w9WgXcQ" target="_blank" rel="noopener noreferrer">
         <div className="bg-yellow-600 mt-5 px-5 py-5 w-[275px] text-black text-4xl whitespace-nowrap">
   Download Beta
</div></a>

      </div>
      </div>
      
    </div>
    </div> )}
    </>
  );
}

export default App;

