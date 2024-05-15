import { BrowserRouter as Router, Link, Route } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

function Bio() {
  return (
    <div>
      <Navbar />

      <h2 className="mx-2 my-8 md:mx-20 md:mt-20 md:text-8xl md:mb-6">
        Hello! ☺ I’m Ram Fiorentino, a collaborative Frontend Dev & Visual
        Designer
      </h2>

      <div className="md:flex md:flex-col">
        <div className="flex mx-2 my-5 justify-between md:mx-20">
          <div className="w-3/4">
            <p className="mt-2 leading-5 hidden md:flex md:mb-32 md:text-sm">
              Available from May 2023, always collaborating with creative teams.
              Let’s talk!
            </p>
            <button className="btn rounded-full mr-2"> About </button>
            <button className="btn rounded-full"> Me </button>
            <h4 className="mt-7 leading-7 md:mt-9 md:text-5xl">
              Hi! I'm a very curious Frontend Dev who's passionate about
              innovation, data visualisation, immersive UXs, 3D, music
              computing, virtual reality and design.
            </h4>
            <p className="hidden mt-4 leading-5 md:flex md:mb-32 md:text-sm">
              Available from May 2023, always collaborating with creative teams.
              Let’s talk! I'm a very curious Frontend Dev who's passionate about
              innovation, data visualisation.
            </p>
            <p className="md:hidden mt-2 leading-5">
              Available from May 2023, always lookung to collaborate with
              creative teams. Let’s talk!
            </p>
          </div>

          <div className="hidden md:flex md:flex-col md:my-8 md:mx-2 md:mt-36">
            <div className="flex flex-col h-fit w-56 p-3 m-0  items-center text-center mb-32">
              <div className="btn rounded-full">
                {" "}
                Focus{" "}
              </div>
              <p className="uppercase leading-4 text-xs mt-5 mb-2">
                front end <br /> SVG <br /> web animations <br /> data vis{" "}
                <br /> ecommerce <br /> ux/ui <br /> website design
              </p>
            </div>

            <div className="flex flex-col h-fit w-56 p-3 m-0  items-center text-center">
              <div className="btn rounded-full">
                {" "}
                Plus{" "}
              </div>
              <p className="uppercase leading-4 text-xs mt-5 mb-2">
                front end <br /> SVG <br /> web animations <br /> data vis{" "}
                <br /> ecommerce <br /> ux/ui <br /> website design
              </p>
            </div>
          </div>

          <div className="md:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="92"
              height="90"
              viewBox="0 0 98 96"
              fill="none"
            >
              <g filter="url(#filter0_d_834_97)">
                <path
                  d="M79.4799 36.9001V36.8001C79.4799 36.7612 79.4605 36.7418 79.4411 36.7001C79.4411 36.6418 79.4023 36.5806 79.383 36.5418C79.383 36.5029 79.3636 36.4834 79.3442 36.4418C79.3442 36.4223 79.3054 36.4029 79.286 36.3834C79.2472 36.3445 79.2085 36.2834 79.1475 36.2445C79.1281 36.2445 79.1087 36.2056 79.0894 36.1862L68.453 28.8582C67.9987 28.5415 67.3894 28.661 67.0736 29.1138C66.7578 29.5693 66.8769 30.1804 67.3284 30.4971L76.782 37.0166L48.673 56.3943C47.6675 57.086 46.3296 57.086 45.3241 56.3943L17.2179 36.9774L26.6715 30.458C27.1258 30.1413 27.2421 29.5302 26.9263 29.0747C26.6106 28.6191 26.0012 28.5219 25.5469 28.8191L14.9106 36.1471C14.9106 36.1471 14.8718 36.186 14.8524 36.2054C14.8136 36.2443 14.7527 36.2832 14.7139 36.3443C14.7139 36.3638 14.6751 36.3832 14.6557 36.4026C14.6557 36.4221 14.6364 36.461 14.617 36.5026C14.5976 36.561 14.5782 36.6026 14.5588 36.661C14.5588 36.6999 14.52 36.7193 14.52 36.761V36.861V36.9388V66.3304C14.52 69.0554 16.7249 71.2693 19.4449 71.2693H74.5958C77.3131 71.2693 79.5207 69.0582 79.5207 66.3304V36.9388V36.861L79.4799 36.9001ZM74.5772 69.3332H19.4234C17.7891 69.3332 16.4679 68.0109 16.4679 66.3692V38.8528L44.1997 57.9753C45.0279 58.5475 46.0112 58.8448 46.9973 58.8448C47.9834 58.8448 48.9473 58.5475 49.7949 57.9753L77.5267 38.8528V66.3692C77.5267 68.0081 76.2082 69.3332 74.5712 69.3332H74.5772ZM46.3107 43.5945C46.5074 43.7917 46.7649 43.8917 47.0004 43.8917C47.2358 43.8917 47.5128 43.7917 47.6901 43.5945L61.6556 29.5891C63.3702 27.8697 64.3341 25.5781 64.3341 23.1308C64.3147 20.6808 63.3702 18.3891 61.6556 16.6919C58.1102 13.1364 52.3375 13.1364 48.792 16.6919L46.9805 18.5086L45.169 16.6919C43.4738 14.992 41.1914 14.0447 38.7484 14.0059C36.3247 14.0059 34.0396 14.9531 32.3278 16.6919C28.7823 20.2475 28.7823 26.0367 32.3278 29.5922L46.2933 43.5975L46.3107 43.5945ZM33.7243 18.0947C35.0844 16.7308 36.8571 16.0003 38.7461 16.0003C40.6768 16.0003 42.4688 16.7697 43.7873 18.0947L46.2885 20.6031C46.4658 20.7808 46.7206 20.9003 46.9782 20.9003C47.233 20.9003 47.4906 20.8003 47.6679 20.6031L50.1691 18.0947C52.9473 15.3086 57.4564 15.3086 60.2346 18.0947C61.5752 19.4392 62.3038 21.2364 62.3231 23.1503C62.3231 25.0476 61.5752 26.8448 60.2346 28.2059L46.9583 41.52L33.682 28.2059C30.9038 25.4198 30.9038 20.8978 33.682 18.1117L33.7243 18.0947Z"
                  fill="#FF0000"
                />
              </g>
              <defs>
                <filter
                  id="filter0_d_834_97"
                  x="-6.4"
                  y="-12.4"
                  width="110.8"
                  height="128.8"
                  filterUnits="userSpaceOnUse"
                  color-interpolation-filters="sRGB"
                >
                  <feFlood flood-opacity="0" result="BackgroundImageFix" />
                  <feColorMatrix
                    in="SourceAlpha"
                    type="matrix"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                    result="hardAlpha"
                  />
                  <feOffset dx="2" dy="4" />
                  <feGaussianBlur stdDeviation="8.2" />
                  <feColorMatrix
                    type="matrix"
                    values="0 0 0 0 1 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0"
                  />
                  <feBlend
                    mode="normal"
                    in2="BackgroundImageFix"
                    result="effect1_dropShadow_834_97"
                  />
                  <feBlend
                    mode="normal"
                    in="SourceGraphic"
                    in2="effect1_dropShadow_834_97"
                    result="shape"
                  />
                </filter>
              </defs>
            </svg>
          </div>
        </div>
      </div>

      <div className="flex my-8 mx-2 justify-center md:hidden">
        <div className="flex flex-col h-fit w-56 p-3 m-0 border-dashed border-2 border-red-500 items-center text-center roundedcard">
          <div className="border-1 border-red-500 rounded-full w-1/2">
            {" "}
            Focus{" "}
          </div>
          <p className="uppercase leading-4 text-xs mt-5 mb-2">
            front end <br /> SVG <br /> web animations <br /> data vis <br />{" "}
            ecommerce <br /> ux/ui <br /> website design
          </p>
        </div>

        <div className="minusmargin flex flex-col w-56 p-3 mt-14 border-dashed border-2 border-red-500 items-center text-center roundedcard">
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
        <p className="my-5 text-center text-xl">ramfiorentino@proton.me</p>
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
          <div className="w-2/3 mt-32">
            You are always welcome to contact me by email at{" "}
            <i>ramfiorentino@proton.me</i>
          </div>
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="100%"
              height="100%"
              viewBox="0 0 326 400"
              fill="none"
            >
              <g filter="url(#filter0_d_807_1347)">
                <path
                  d="M298.749 153.751V153.334C298.749 153.172 298.668 153.091 298.587 152.918C298.587 152.675 298.425 152.42 298.344 152.258C298.344 152.096 298.263 152.015 298.182 151.841C298.182 151.76 298.02 151.679 297.939 151.598C297.777 151.436 297.615 151.182 297.36 151.02C297.279 151.02 297.198 150.858 297.117 150.776L252.663 120.243C250.764 118.924 248.217 119.421 246.897 121.308C245.578 123.206 246.075 125.752 247.962 127.072L287.474 154.236L169.992 234.977C165.79 237.859 160.198 237.859 155.996 234.977L38.5261 154.073L78.0373 126.909C79.9359 125.589 80.4221 123.043 79.1024 121.145C77.7826 119.247 75.2357 118.842 73.3372 120.08L28.8827 150.614C28.8827 150.614 28.7206 150.776 28.6396 150.857C28.4775 151.019 28.2228 151.181 28.0607 151.435C28.0607 151.516 27.8987 151.597 27.8176 151.678C27.8176 151.759 27.7366 151.921 27.6556 152.095C27.5745 152.338 27.4935 152.512 27.4124 152.755C27.4124 152.917 27.2504 152.998 27.2504 153.171V153.588V153.912V276.377C27.2504 287.731 36.4655 296.956 47.8337 296.956H278.336C289.693 296.956 298.92 287.743 298.92 276.377V153.912V153.588L298.749 153.751ZM278.259 288.889H47.7439C40.9136 288.889 35.3915 283.379 35.3915 276.539V161.887L151.296 241.564C154.758 243.949 158.868 245.187 162.989 245.187C167.11 245.187 171.139 243.949 174.681 241.564L290.586 161.887V276.539C290.586 283.368 285.075 288.889 278.234 288.889H278.259ZM160.119 181.644C160.941 182.466 162.018 182.883 163.002 182.883C163.986 182.883 165.143 182.466 165.884 181.644L224.253 123.289C231.419 116.124 235.448 106.576 235.448 96.3791C235.367 86.1708 231.419 76.6221 224.253 69.5504C209.435 54.7356 185.308 54.7356 170.49 69.5504L162.919 77.1199L155.347 69.5504C148.263 62.4671 138.723 58.5202 128.513 58.3584C118.383 58.3584 108.832 62.3051 101.678 69.5504C86.8595 84.3652 86.8595 108.487 101.678 123.302L160.047 181.657L160.119 181.644ZM107.515 75.3954C113.199 69.7125 120.608 66.6686 128.503 66.6686C136.572 66.6686 144.062 69.8745 149.573 75.3954L160.026 85.8467C160.767 86.5874 161.832 87.0851 162.909 87.0851C163.974 87.0851 165.051 86.6685 165.792 85.8467L176.245 75.3954C187.857 63.7865 206.702 63.7865 218.314 75.3954C223.917 80.9972 226.962 88.4858 227.043 96.4603C227.043 104.366 223.917 111.854 218.314 117.525L162.826 173.001L107.338 117.525C95.7261 105.916 95.7261 87.0748 107.338 75.466L107.515 75.3954Z"
                  fill="#FF0000"
                />
              </g>
              <defs>
                <filter
                  id="filter0_d_807_1347"
                  x="-4"
                  y="-2"
                  width="338"
                  height="412"
                  filterUnits="userSpaceOnUse"
                  color-interpolation-filters="sRGB"
                >
                  <feFlood flood-opacity="0" result="BackgroundImageFix" />
                  <feColorMatrix
                    in="SourceAlpha"
                    type="matrix"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                    result="hardAlpha"
                  />
                  <feOffset dx="2" dy="4" />
                  <feGaussianBlur stdDeviation="3" />
                  <feColorMatrix
                    type="matrix"
                    values="0 0 0 0 1 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0"
                  />
                  <feBlend
                    mode="normal"
                    in2="BackgroundImageFix"
                    result="effect1_dropShadow_807_1347"
                  />
                  <feBlend
                    mode="normal"
                    in="SourceGraphic"
                    in2="effect1_dropShadow_807_1347"
                    result="shape"
                  />
                </filter>
              </defs>
            </svg>
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
