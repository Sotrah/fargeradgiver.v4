"use client";
import ColorPicker from "../components/ColorPicker";
import RecentColorPicker from "../components/RecentColorPicker";
import {ColorType} from "@/components/ColorType";
import ImageGridCard from "../components/ImageGridCard";
import React, { useState } from "react";
import {formatHexColor} from "@/components/Utils";
import {useSpinDelay} from "spin-delay";
import {ScaleLoader} from "react-spinners";
import CldImage from "../components/CldImage";


export default function Home() {
  // type CloudinaryResult = {
  //   width: number;
  //   height: number;
  //   public_id: string;
  // };

  const [selectedColor, setSelectedColor] = useState<ColorType | null>(null);
  const formattedHex = selectedColor ? formatHexColor(selectedColor.hex) : null;
  const [visibleModule, setVisibleModule] = useState("modul2");
  const [loading, setLoading] = useState(false);

  const [imageToTransform, setImageToTransform] = useState<String | null>('http://res.cloudinary.com/dj6mfsxnu/image/upload/v1707474684/jgxom27mvriax5av0prr.png');

  const handleImageSelect = (selectedPicture: String) => {
    if (selectedPicture != imageToTransform) {
      setLoading(true);
      setImageToTransform(selectedPicture)
    }
  }
  const handleColorSelect = (selectedColor: ColorType | null) => {
    setLoading(true);
    setSelectedColor(selectedColor)
  }

  const showSpinner = useSpinDelay(loading, { delay: 300, minDuration: 700 });

  return (
      <div className="new-style page-proxiedContentWrapper pageType-ContentPage template-pages-layout-landingLayout2Page pageLabel-proxiedContentWrapper smartedit-page-uid-proxiedContentWrapper smartedit-page-uuid-eyJpdGVtSWQiOiJwcm94aWVkQ29udGVudFdyYXBwZXIiLCJjYXRhbG9nSWQiOiJjbkNvbnRlbnRDYXRhbG9nIiwiY2F0YWxvZ1ZlcnNpb24iOiJPbmxpbmUifQ== smartedit-catalog-version-uuid-cnContentCatalog/Online language-no">
        <div className="c-site-header"> {/*Navbar opplegg*/}
          <div className="container">
            <div className="c-site-header__top text-white text-2xl">
              <h1></h1>
            </div>
          </div>
        </div>

        <div className="main-responsive-padding px-20 mm-page mm-slideout bg-primary-100">
          <div className="w-full">


            <div id="__next">
              <div id="next-app-element" className="next-content-wrapper">
                <div className="py-8 sm:py-10 relative">
                  <div className="top-0 absolute w-full h-[calc(100%-32px)] sm:h-[calc(100%-56px)] bg-jernia-image">
                    <div className="relative z-10 mx-2">
                      <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 sm:gap-8 items-center">
                        <div className="pt-16 sm:col-span-10 md:col-span-12">{/*Info området*/}
                          <h1 className="text-5xl sm:text-6xl md:text-6xl font-bold">Visualiseringsverktøy</h1>
                          <div className="mt-1 sm:mt-2 max-w-4xl">
                            <p className="pt-6 leading-p text-xl sm:text-2xl md:3xl">
                              La deg inspirere av Jotuns fantastiske fargeunivers.
                              Finn fargene som passer best til din stil og last opp bilde av rommet du vil male.
                              Etter at bildet er lastet opp kan du enkelt endre veggfargen til den fargen du ønsker.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
            <div className="px:4 bg-primary-300 py-8 sm:py-14">

            </div>
            <div className="pt-24 flex flex-wrap justify-around items-start bg-primary-100">
              <button
                  className={`px-4 py-2 order-2 md:hidden ${visibleModule === "modul2" ? "bg-blue-700" : "bg-blue-500"} text-white rounded`}
                  onClick={() => setVisibleModule("modul2")}>
                Velg bilde
              </button>
              <button
                  className={`px-4 py-2 order-2 md:hidden ${visibleModule === "modul3" ? "bg-blue-700" : "bg-blue-500"} text-white rounded`}
                  onClick={() => setVisibleModule("modul3")}>
                Nylig brukte farger
              </button>
              <button
                  className="px-4 py-2 order-2 md:hidden bg-green-500 text-white rounded">
                Kjøp
              </button>


              <div className="md:w-1/3 w-full md:order-1 order-2 px-2 pt-6 mb-4 bg-primary-300">
                <div className={`relative pb-[100%] ${visibleModule === "modul2" ? "" : "hidden"} md:block`}>
                  <div
                      className={`absolute top-0 left-0 right-0 bottom-0 bg-white rounded-md shadow p-4 overflow-hidden`}>
                    <ImageGridCard onPictureSelect={handleImageSelect}/>
                  </div>
                </div>
              </div>

              <div className="md:w-1/3 w-full md:order-3 order-3 px-2 pt-6 mb-4 bg-primary-300">
                <div className={`relative pb-[100%] ${visibleModule === "modul3" ? "" : "hidden"} lg:block`}>
                  <div
                      className={`absolute top-0 left-0 right-0 bottom-0 bg-white rounded-lg shadow p-4 overflow-hidden`}>
                    <RecentColorPicker onColorSelect={handleColorSelect} selectedColor={selectedColor} />
                    {/*Få inn recently used og favorites*/}
                  </div>
                </div>
              </div>

              <div className="md:w-1/3 w-full md:order-2 order-1 px-2 pt-6 mb-4 bg-primary-300">
                <div className="relative pb-[100%]">
                  <div className="absolute top-0 left-0 right-0 bottom-0 bg-white rounded-md shadow  overflow-hidden">
                    {/* The below section is dimmed until the image is loaded */}
                    <div className={`${showSpinner ? "opacity-50" : ""} w-full h-full`}>
                      {/* CldImage is documented here: https://next.cloudinary.dev/cldimage/configuration

                    If there is an image and a selectedColor selected, transform it with Recolor */}
                      {imageToTransform && selectedColor && (
                          <CldImage
                              placeholder="empty"
                              onLoad={() => setLoading(false)}
                              width='1024'
                              height='1024'
                              src={imageToTransform}
                              alt="Uploaded image"
                              className="rounded-md"
                              sizes="100vw"
                              recolor={['every wall and walls', formattedHex]}
                          />
                      )}
                      {imageToTransform && !selectedColor && (
                          <CldImage
                              placeholder="empty"
                              onLoad={() => setLoading(false)}
                              width='1024'
                              height='1024'
                              src={imageToTransform}
                              alt="Uploaded image"
                              className="rounded-md"
                              sizes="100vw"
                          />
                      )}
                    </div>
                  </div>
                  <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center">
                    <ScaleLoader
                        color="#000000"
                        speedMultiplier={0.5}
                        loading={showSpinner}
                    />
                  </div>
                </div>

              </div>
            </div>
          </div>

          <div>
            <ColorPicker onColorSelect={handleColorSelect} selectedColor={selectedColor} />
          </div>

        </div>
      </div>
  )
      ;
}
 