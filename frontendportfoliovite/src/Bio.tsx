import { BrowserRouter as Router, Link, Route } from "react-router-dom";
import React, { useEffect, useState } from 'react';
import sanityClient from './sanityClient'; // Import the client you set up
import Navbar from './Navbar';
import Footer from './Footer';
import bioPic from './assets/ram-headshot-edit.jpeg';
import brandasset from './assets/brand-asset.png';

function Bio() {
  const [bioData, setBioData] = useState(null);

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
    <div>
      <Navbar />
      <div className="flex place-content-end mx-2 my-8 md:mx-20 md:mt-20 md:text-8xl md:mb-6">
        <h2 className="z-10">
          Hello! ☺ I’m Ram Fiorentino, a collaborative Frontend Dev & Visual
          Designer
        </h2>
        <img
          id="brandasset"
          src={brandasset}
          alt=""
          className="w-60 h-40 scale-125 mt-20 absolute right-8 opacity-60 md:scale-150 md:pr-6 md:justify-self-end"
        />
      </div>
      <div className="md:flex md:flex-col">
        <div className="flex mx-2 my-5 justify-between md:mx-20">
          <section className="w-3/4">
            <p className="mt-2 leading-5 hidden md:flex md:mb-32 md:text-sm">
              Available from May 2023, always collaborating with creative teams.
              Let’s talk!
            </p>
            <button className="btn rounded-full mr-2"> About </button>
            <button className="btn rounded-full"> Me </button>
            <h4 id="bioHeading" className="mt-7 leading-7 md:mt-9 md:text-5xl">
              {bioData.heading}
            </h4>
            <p
              id="bioParragraph-desk"
              className="hidden mt-4 leading-5 md:flex md:mb-32 md:text-sm"
            >
              {bioData.paragraphDesk}
            </p>
            <img src={bioPic} alt="" className="my-4 rounded-lg" />
            <p id="bioParragraph-mobile" className="md:hidden mt-2 leading-5">
              {bioData.paragraphMobile}
            </p>
          </section>
          {/* Other sections remain unchanged */}
        </div>
      </div>
      {/* Footer and other elements */}
    </div>
  );
}

export default Bio;
