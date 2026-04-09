import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import sanityClient from "./sanityClient";
import { BrandAsset } from "./components/BrandAsset";
import Navbar from "./Navbar";
import Footer from "./Footer";

interface BioProps {
  heading: string;
  paragraphDesk: string;
  paragraphMobile: string;
}

function Bio() {
  const [bioData, setBioData] = useState<BioProps | null>(null);

  useEffect(() => {
    sanityClient
      .fetch(
        `*[_type == "bio"][0]{
          heading,
          paragraphDesk,
          paragraphMobile
        }`
      )
      .then((data) => setBioData(data))
      .catch(console.error);
  }, []);

  if (!bioData) return <div>Loading...</div>;
console.log(bioData)
  return (
    <div className="w-full">
      <Navbar />
      <div className="flex place-content-end mx-2 my-8 md:mx-20 md:mt-20 md:text-8xl md:mb-6">
        <h2 className="z-10">
          Hello! ☺ I’m Ram Fiorentino, a Frontend-leaning Fullstack Software Engineer and Creative
        </h2>
        <BrandAsset className="w-60 h-40 scale-125 mt-20 absolute right-8 opacity-60 md:scale-150 md:pr-6 md:justify-self-end" />
      </div>
      <div className="md:flex md:flex-col">
        <div className="flex mx-2 my-5 justify-between md:mx-20">
          <section className="w-3/4">
            <p className="mt-2 leading-5 hidden md:flex md:mb-8 md:text-base">
              Available now, always collaborating with creative teams.
              Let’s talk!
            </p>
            <button className="btn rounded-full mr-2"> About </button>
            <button className="btn rounded-full"> Me </button>
            <h4 id="bioHeading" className="mt-7 leading-7 md:mt-9 md:text-4xl">
              {bioData.heading}
            </h4>
            <p className="hidden mt-8 leading-5 md:flex md:mb-8 md:text-m">
              Frontend Software Engineer with 5+ years of experience building scalable and performant web products across freelance, studio,
and enterprise environments. Track record of independently driving quality improvements — from structured AI integration guides
to cross-layer debugging and performance audits. Experienced in owning internal documentation and knowledge bases in
Confluence, and in producing onboarding, troubleshooting, and architectural documentation for engineering teams. Thrives in
teams navigating rapid technological transition. Fluent in English (C1) and Spanish (Native).
            </p>
            <p>I'm open for work! How would you leverage my skillset? Let me know ;) mariabf.bcn@gmail.com</p>
            <p className="md:hidden mt-2 leading-5">
              Available now, always looking to collaborate with
              creative teams. Let’s talk!
            </p>
          </section>
                    <div className="hidden md:flex md:flex-col md:my-8 md:mx-2 md:mt-36">
            <div className="flex flex-col h-fit w-56 p-3 m-0  items-center text-center mb-32">
              <div className="btn rounded-full"> Focus </div>
              <p className="uppercase leading-4 text-xs mt-5 mb-2">
                front end <br /> SVG <br /> web animations <br /> data vis{" "}
                <br /> ecommerce <br /> ux/ui <br /> website design
              </p>
            </div>

            <div className="flex flex-col h-fit w-56 p-3 m-0  items-center text-center">
              <div className="btn rounded-full"> Plus </div>
              <p className="uppercase leading-4 text-xs mt-5 mb-2">
                front end <br /> SVG <br /> web animations <br /> data vis{" "}
                <br /> ecommerce <br /> ux/ui <br /> website design
              </p>
            </div>
          </div>


        </div>
      </div>

      <div className="flex my-8 mx-2 justify-center md:hidden">
        <div className="flex flex-col h-fit w-56 p-3 m-0 border-dashed border-2 border-primary items-center text-center roundedcard">
          <div className="border-1 border-red-500 rounded-full w-1/2">
            {" "}
            Focus{" "}
          </div>
          <p className="uppercase leading-4 text-xs mt-5 mb-2">
            front end <br /> SVG <br /> web animations <br /> data vis <br />{" "}
            ecommerce <br /> ux/ui <br /> website design
          </p>
        </div>

        <div className="minusmargin flex flex-col w-56 p-3 mt-14 border-dashed border-2 border-primary items-center text-center roundedcard">
          <div className="border-1 border-red-500 rounded-full w-1/2">
            {" "}
            Plus{" "}
          </div>
          <p className="uppercase leading-4 text-xs mt-5 mb-2">
            three.js <br /> d3.js <br /> web3 <br /> mini apps <br /> dapps{" "}
            <br /> virtual reality <br /> p5.js
          </p>
        </div>
      </div>

      <div className="md:hidden flex flex-col px-10 text-center justify-center">
        <p>You are always welcome to contact me by email at</p>
        <p className="my-5 text-center text-xl">mariabf.bcn@gmail.com</p>
        <p>
          I'm open for work! How would you leverage my skillset? Let me know ;)
        </p>

        <div className="flex justify-center">
          <button className="btn rounded-full my-8 w-fit">
            <Link to="/">Back to projects list</Link>
          </button>
        </div>
      </div>

      <div className="hidden md:flex md:flex-col md:mx-20 md:text-5xl mt-28">
        <div className="flex justify-between">
          <div className="text-primary">
          </div>
        </div>
        <div className="flex justify-center">
          <button className="btn rounded-full my-8 w-fit">
            <Link to="/">Back to projects list</Link>
          </button>
        </div>
      </div>
      <Footer />
        </div>
  );
}

export default Bio;
