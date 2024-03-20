"use client";
import ColorPicker from "../components/ColorPicker";
import RecentColorPicker from "../components/RecentColorPicker";
import {ColorType} from "@/components/ColorType";
import ImageGridCard from "../components/ImageGridCard";
import React, {useState} from "react";
import {formatHexColor} from "@/components/Utils";
import {useSpinDelay} from "spin-delay";
import {ScaleLoader} from "react-spinners";
import CldImage from "../components/CldImage";
import { Search } from "@/components/ColorSearch";


export default function Home() {
  // type CloudinaryResult = {
  //   width: number;
  //   height: number;
  //   public_id: string;
  // };


  const [selectedColor, setSelectedColor] = useState<ColorType | null>(null);
  const formattedHex = selectedColor ? formatHexColor(selectedColor.hex) : null;
  const [loading, setLoading] = useState(false);
  const [visibleModule, setVisibleModule] = useState("modul2");
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

        {/*Navbar*/}
        <div className="c-site-header">
          <div className="container">
            <div className="c-site-header__top text-white text-2xl">
              <h1>Jernia</h1>
            </div>
          </div>
        </div>

        {/*Overskrift og info*/}
        <div className="container mx-auto px-4">
          <div className="text-center my-8">
            <h1 className="text-4xl font-bold text-gray-800">Visualiseringsverktøy</h1>
            <p className="mt-4 text-lg text-gray-600">La deg inspirere av Jotuns fantastiske fargeunivers.
                Finn fargene som passer best til din stil og last opp bilde av rommet du vil male.
                Etter at bildet er lastet opp kan du enkelt endre veggfargen til den fargen du ønsker.</p>
          </div>

            {/*Div-container til hovedelementene*/}
            <div className="flex flex-col md:flex-row space-y-8 md:space-y-0 md:space-x-4">

                {/*Bildevelger*/}
              <div className="md:w-1/3 md:order-1">
                  <div className="elements-container text-left text-xl mb-8">
                      <div className="image-grid-card">
                          <p className="md:hidden">Velg bildestil</p>
                          <ImageGridCard onPictureSelect={handleImageSelect}/>
                      </div>
                  </div>
              </div>

                  {/*Hovedbildet*/}
                <div className="md:w-1/3 md:order-2">
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

                  {/*Info om valgt farge*/}
                    <div className="md:w-1/3">
                      {selectedColor && (
                          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '20px' }}>
                              <div style={{ backgroundColor: `#${formattedHex}`, width: '100px', height: '100px', borderRadius: '8px',}}>
                              </div>
                              <div style={{ marginRight: '160px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                                  <span style={{ fontSize: '18px', fontWeight: 'bold' }}>{selectedColor.fullName}</span>
                                  <span style={{ fontSize: '16px', fontWeight: 'bold' }}>{selectedColor.ncsCode}</span>
                              </div>
                              <div>
                                  <button
                                      className="px-10 py-2 bg-green-500 hover:bg-green-700 text-white rounded">
                                      Kjøp
                                  </button>
                              </div>
                          </div>
                      )}
                    </div>


                    {/*Siste kolonne på desktopview*/}
                    <div className="md:w-1/3 flex flex-col md:order-3">
                  {/*Tabs for fargevalg*/}
                  <div className="flex-grow text-center text-xl my-4 flex justify-between">
                      <button
                          style={{
                              borderBottom: visibleModule === "modul2" ? "4px solid blue" : "",
                              fontWeight: visibleModule === "modul2" ? "bold" : "",
                              color: visibleModule === "modul2" ? "black" : "gray"
                          }}
                          onClick={() => setVisibleModule("modul2")}>
                          Finn en farge
                      </button>
                      <button
                          style={{
                              borderBottom: visibleModule === "modul3" ? "4px solid blue" : "",
                              fontWeight: visibleModule === "modul3" ? "bold" : "",
                        color: visibleModule === "modul3" ? "black" : "gray"
                      }}
                      onClick={() => setVisibleModule("modul3")}>
                    Nylig brukt
                  </button>
                  <button
                      style={{
                        borderBottom: visibleModule === "modul4" ? "4px solid blue" : "",
                        fontWeight: visibleModule === "modul4" ? "bold" : "",
                        color: visibleModule === "modul4" ? "black" : "gray"
                      }}
                      onClick={() => setVisibleModule("modul4")}>
                    Dine favoritter
                  </button>
                </div>

                  {/*Søkebar*/}
                        <div className="flex-grow">
                  {visibleModule === "modul2" && (
                  <Search />
                  )}
                        </div>

                {/*Fargevelger*/}
                {visibleModule === "modul2" && (
                    <div className="color-picker flex-grow">
                      <ColorPicker onColorSelect={handleColorSelect} selectedColor={selectedColor}/>
                    </div>
                )}

                {/*Nylig brukt*/}
                {visibleModule === "modul3" && (
                    <div className="recent-color-picker flex-grow">
                      <RecentColorPicker onColorSelect={handleColorSelect} selectedColor={selectedColor}/>
                    </div>
                )}
                    </div>

          </div>

        </div>
      </div>
  )
      ;
}
 