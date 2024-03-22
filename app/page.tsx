"use client";
import ColorPicker from "../components/ColorPicker";
import RecentColorPicker from "../components/RecentColorPicker";
import FavoriteColorPicker from "../components/FavoriteColorPicker";
import {ColorType} from "@/components/ColorType";
import ImageGridCard from "../components/ImageGridCard";
import React, {useEffect, useState} from "react";
import {formatHexColor, mapHitsToColorType} from "@/components/Utils";
import {useSpinDelay} from "spin-delay";
import {ScaleLoader} from "react-spinners";
import CldImage from "../components/CldImage";
import {Search}  from "@/components/ColorSearch";
import colours_dump from "colours_dump.json"
import {HitProps} from "@/components/ColorSearchHit";

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
  const [colors, setColors] = useState<ColorType[]>([]); // Update type to ColorType[]
  const [searchResults, setSearchResults] = useState<ColorType[]>([]);

  const handleResultsUpdate = (hits: HitProps[]) => {
    // Convert HitProps[] to ColorType[]
    const convertedResults = mapHitsToColorType(hits);
    if (searchResults.length !== convertedResults.length || !convertedResults.every((result, index) => result.code === searchResults[index]?.code)) {
      setSearchResults(convertedResults); // Update state with converted results
    }
  };

// Function to check if two arrays are equal


  useEffect(() => {
    setColors(colours_dump);
  }, []);

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
            <h1 className="text-3xl font-bold text-gray-800">Visualiseringsverktøy</h1>
            <p className="mt-4 text-lg text-gray-600">La deg inspirere av Jotuns fantastiske fargeunivers.
                Finn fargene som passer best til din stil og last opp bilde av rommet du vil male.
                Etter at bildet er lastet opp kan du enkelt endre veggfargen til den fargen du ønsker.</p>
          </div>

            {/*Div-container til hovedelementene*/}
            <div className="grid grid-cols-1 lg:grid-cols-3 lg:grid-rows-2 space-y-6 lg:space-y-0 lg:space-x-4">

                {/*Bildevelger*/}
                <div className="lg:col-span-1 lg:order-1">
                    <div className="elements-container text-left text-xl">
                        <div className="image-grid-card">
                            <p className="lg:hidden">Velg bildestil</p>
                            <ImageGridCard onPictureSelect={handleImageSelect}/>
                        </div>
                    </div>
                </div>

                {/*Hovedbildet */}
                <div className="lg:col-span-1 lg:order-2 relative">
                    {showSpinner && (
                        <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center z-20">
                            <ScaleLoader
                                color="#000000"
                                speedMultiplier={0.5}
                                loading={showSpinner}
                            />
                        </div>
                    )}
                    {/* The below section is dimmed until the image is loaded */}
                    <div className={`${showSpinner ? "opacity-50" : ""} w-full h-full`}>
                        {/* CldImage is documented here: https://next.cloudinary.dev/cldimage/configuration
                        If there is an image and a selectedColor selected, transform it with Recolor */}
                        <div className="flex justify-center items-center z-10">
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
                        </div>
                        <div className="flex justify-center items-center z-0">
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
                </div>


                {/*Info om valgt farge*/}
                <div className="lg:col-span-1 lg:col-start-2 lg:order-5 lg:mt-6">
                    {selectedColor && (
                        <div style={{display: 'flex', alignItems: 'center', gap: '15px'}}>
                            <div style={{
                                backgroundColor: `#${formattedHex}`,
                                width: '100px',
                                height: '100px',
                                borderRadius: '8px',
                            }}>
                            </div>
                            <div style={{flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
                                <span className="colorName">{selectedColor.fullName}</span>
                                <span className="colorCode">{selectedColor.ncsCode}</span>
                            </div>
                            <div>
                                <button
                                    className="px-10 xl:px-10 lg:px-2 py-2 bg-green-500 hover:bg-green-700 text-white rounded">
                                    Kjøp
                                </button>
                            </div>
                        </div>
                    )}
                </div>


                {/*Siste kolonne på desktopview*/}
                <div className="lg:col-span-1 lg:order-3">
                    <div className="w-full aspect-square overflow-y-auto">
                        {/* Innhold som tillater scrolling */}
                        <div className="p-2">
                            {/*Tabs for fargevalg*/}
                            <div
                                className="flex-grow text-center xl:text-lg lg:text-xs text-lg my-4 flex justify-between">
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

                                    <div>
                                        <Search onResultsUpdate={handleResultsUpdate}/>

                                        <ColorPicker onColorSelect={handleColorSelect}
                                                     selectedColor={selectedColor}
                                                     colors={searchResults}/>
                                    </div>
                                )}
                            </div>

                            {/*Fargevelger*/}
                            <div className={`${visibleModule === "modul2" ? "" : "hidden"} w-full h-full color-picker flex-grow`}>
                                <ColorPicker onColorSelect={handleColorSelect} selectedColor={selectedColor}/>
                            </div>

                            {/*Nylig brukte farger*/}
                            <div className={`${visibleModule === "modul3" ? "" : "hidden"} w-full h-full recent-color-picker flex-grow`}>
                                <RecentColorPicker onColorSelect={handleColorSelect} selectedColor={selectedColor}/>
                            </div>

                            {/*Favoritte farger*/}
                            <div className={`${visibleModule === "modul4" ? "" : "hidden"} w-full h-full recent-color-picker flex-grow`}>
                                <FavoriteColorPicker onColorSelect={handleColorSelect} selectedColor={selectedColor}/>
                            </div>
                            
                        </div>
                    </div>
                </div>


            </div>
        </div>
      </div>
  )
      ;
}
