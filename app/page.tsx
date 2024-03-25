"use client"
import ColorPicker from "../components/ColorPicker";
import RecentColorPicker from "../components/RecentColorPicker";
import FavoriteColorPicker from "../components/FavoriteColorPicker";
import { FavoriteColorContext } from "@/components/FavoriteColorContext";
import {ColorType} from "@/components/ColorType";
import ImageGridCard from "@/components/ImageGridCard";
import React, {useEffect, useState, Suspense} from "react";
import {formatHexColor, mapHitsToColorType} from "@/components/Utils";
import {useSpinDelay} from "spin-delay";
import {ScaleLoader} from "react-spinners";
import CldImage from "../components/CldImage";
import {Search}  from "@/components/ColorSearch";
import colours_dump from "colours_dump.json"
import {HitProps} from "@/components/ColorSearchHit";
import colorPicker from "../components/ColorPicker";
import GetUrlColor from "@/components/GetUrlColor";


export default function Home() {

  const [selectedColor, setSelectedColor] = useState<ColorType | null>(null);
  const [favoriteColors, setFavoriteColors] = useState<ColorType[]>([]);
  const formattedHex = selectedColor ? formatHexColor(selectedColor.hex) : null;
  const [visibleModule, setVisibleModule] = useState("modul2");
  const [loading, setLoading] = useState(false);
  const [imageToTransform, setImageToTransform] = useState<String | null>('https://res.cloudinary.com/dj6mfsxnu/image/upload/v1711364452/qrkelyfikaa03biiaedn.jpg');
  const [colors, setColors] = useState<ColorType[]>([]); // Update type to ColorType[]
  const [searchResults, setSearchResults] = useState<ColorType[]>([]);
  const[colorsAreLoaded, setColorsAreLoaded] = useState(false);

  const handleResultsUpdate = (hits: HitProps[]) => {
    // Convert HitProps[] to ColorType[]
    const convertedResults = mapHitsToColorType(hits);
    if (searchResults.length !== convertedResults.length || !convertedResults.every((result, index) => result.code === searchResults[index]?.code)) {
      setSearchResults(convertedResults); // Update state with converted results
      setColorsAreLoaded(true);
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
    else {
      setSelectedColor(null);
    }
  }

  const handleColorSelect = (selectedColor: ColorType | null) => {
    if (selectedColor != null) {
        setLoading(true);
    }
    setSelectedColor(selectedColor)
  }
  const showSpinner = useSpinDelay(loading, { delay: 300, minDuration: 700 });

  

  return (
    <FavoriteColorContext.Provider value={{ favoriteColors, setFavoriteColors }}>
        <Suspense fallback={<div>Loading...</div>}>
            <GetUrlColor onColorSelect={handleColorSelect}
                        handleColorSelect={handleColorSelect}
                        selectedColor={selectedColor}
                        colors={searchResults}
                        colorsAreLoaded={colorsAreLoaded}/>
        </Suspense>
        
      <div className="bg-jernia-nettside new-style page-proxiedContentWrapper pageType-ContentPage template-pages-layout-landingLayout2Page pageLabel-proxiedContentWrapper smartedit-page-uid-proxiedContentWrapper smartedit-page-uuid-eyJpdGVtSWQiOiJwcm94aWVkQ29udGVudFdyYXBwZXIiLCJjYXRhbG9nSWQiOiJjbkNvbnRlbnRDYXRhbG9nIiwiY2F0YWxvZ1ZlcnNpb24iOiJPbmxpbmUifQ== smartedit-catalog-version-uuid-cnContentCatalog/Online language-no">

        {/*Navbar*/}
        <div className="c-site-header">
          <div className="main-container">
            <div className="c-site-header__top text-white text-2xl">
              <h1>Jernia</h1>
            </div>
          </div>
        </div>

        {/*Overskrift og info*/}
        <div className="main-container mx-auto px-4">
          <div className="text-center my-8">
            <h1 className="text-3xl font-bold text-gray-800">Visualiseringsverktøy</h1>
            <p className="mt-4 text-lg text-gray-600">La deg inspirere av Jotuns fantastiske fargeunivers.
                Finn fargene som passer best til din stil og last opp bilde av rommet du vil male.
                Etter at bildet er lastet opp kan du enkelt endre veggfargen til den fargen du ønsker.</p>
          </div>

            {/*Div-container til hovedelementene*/}
            <div className="main-container grid grid-cols-1 lg:grid-cols-11 lg:grid-rows-4 space-y-6 lg:space-y-0 lg:gap-x-4 lg:gap-y-4">

                {/*Bildevelger*/}
                <div className="lg:col-span-3 lg:row-span-4 lg:order-1">
                    <div className="elements-container text-left text-xl">
                        <div className="image-grid-card">
                            <p className="lg:hidden">Velg bildestil</p>
                            <ImageGridCard onPictureSelect={handleImageSelect}/>
                        </div>
                    </div>
                </div>

                {/*Hovedbildet */}
                <div className="lg:col-span-5 lg:row-span-3 lg:order-2 "style={{ aspectRatio: '4 / 3', overflow: 'hidden', borderRadius: '6px' }}>
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
                    <div className={`${showSpinner ? "opacity-50" : ""} w-full h-full relative`}>
                        {/* CldImage is documented here: https://next.cloudinary.dev/cldimage/configuration
                        If there is an image and a selectedColor selected, transform it with Recolor */}
                        <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center z-10">
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
                        <div className=" flex justify-center items-center z-0">
                            {imageToTransform &&(
                                <CldImage
                                    placeholder="empty"
                                    onLoad={() => 
                                        {if (!selectedColor) {
                                            setLoading(false)}
                                        }
                                    }
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
                <div className="lg:col-span-5 lg:row-span-1 lg:order-5  rounded-lg bg-white px-3 py-3">
                    {selectedColor && (
                        <div style={{display: 'flex', alignItems: 'center', gap: '15px'}}>
                            <div style={{
                                backgroundColor: `#${formattedHex}`,
                                width: '60px',
                                height: '60px',
                                borderRadius: '8px',
                            }}>
                                <img src="/jernia-paint-blob.png" alt="Paint blob"/>
                            </div>
                            <div style={{flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
                                <span className="colorName">{selectedColor.fullName}</span>
                                <span className="colorCode">{selectedColor.ncsCode}</span>
                            </div>
                            <div>
                                <button
                                    className="px-6 xl:px-10 lg:px-2 py-1 md:py-2 bg-green-500 hover:bg-green-700 text-white rounded">
                                    Kjøp
                                </button>
                            </div>
                        </div>
                    )}
                </div>



                {/*Siste kolonne på desktopview*/}
                <div className="lg:col-span-3 lg:row-span-4 lg:order-3">
                    <div className="w-full">
                        {/*Tabs for fargevalg*/}
                        <div
                            className="flex-grow text-center xl:text-lg lg:text-xs text-md flex justify-between sticky top-0 z-10 bg-jernia-nettside pb-2">
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

                        {/*Søkebar og Fargevelger*/}
                        <div className={`${visibleModule === "modul2" ? "" : "hidden"} flex-grow overflow-y-scroll`} style={{ aspectRatio: '6 / 10' }}>
                            <div>
                                <Search onResultsUpdate={handleResultsUpdate}/>

                                <ColorPicker onColorSelect={handleColorSelect}
                                                selectedColor={selectedColor}
                                                colors={searchResults}/>
                            </div>
                        </div>

                        {/*Nylig brukte farger*/}
                        <div className={`${visibleModule === "modul3" ? "" : "hidden"} w-full h-full recent-color-picker flex-grow`}>
                            <RecentColorPicker onColorSelect={handleColorSelect} selectedColor={selectedColor} visibleModule={visibleModule}/>
                        </div>

                        {/*Favoritte farger*/}
                        <div className={`${visibleModule === "modul4" ? "" : "hidden"} w-full h-full favorite-color-picker flex-grow`}>
                            <FavoriteColorPicker onColorSelect={handleColorSelect} selectedColor={selectedColor} favoriteColors={favoriteColors}/>
                        </div>   
                    </div>
                </div>

            </div>
        </div>
      </div>
    </FavoriteColorContext.Provider>
  );
}
