"use client"
import ColorPicker from "../components/ColorPicker";
import RecentColorPicker from "../components/RecentColorPicker";
import FavoriteColorPicker from "../components/FavoriteColorPicker";
import { FavoriteColorContext } from "@/components/FavoriteColorContext";
import {ColorType} from "@/components/ColorType";
import ImageGridCard from "@/components/ImageGridCard";
import React, {useEffect, useState, Suspense} from "react";
import {formatHexColor, mapHitsToColorType} from "@/components/Utils";


import {Search}  from "@/components/ColorSearch";
import colours_dump from "colours_dump.json"
import {HitProps} from "@/components/ColorSearchHit";
import GetUrlColor from "@/components/GetUrlColor";
import PromptRecolor from "@/components/PromptOptions"; // Adjust the path as necessary
import ChosenColorInfo from "@/components/ChosenColorInfo";
import MainImage from "@/components/MainImage";


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
  const [recolorOption, setRecolorOption] = useState("All the walls and every wall"); // Default value can be adjusted

  const handleResultsUpdate = (hits: HitProps[]) => {
    // Convert HitProps[] to ColorType[]
    const convertedResults = mapHitsToColorType(hits);
    if (searchResults.length !== convertedResults.length || !convertedResults.every((result, index) => result.code === searchResults[index]?.code)) {
      setSearchResults(convertedResults); // Update state with converted results
      setColorsAreLoaded(true);
    }
  };   

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
  

  

  return (
    <FavoriteColorContext.Provider value={{ favoriteColors, setFavoriteColors }}>
        <Suspense fallback={<div>Loading...</div>}>
            <GetUrlColor onColorSelect={handleColorSelect}
                        handleColorSelect={handleColorSelect}
                        selectedColor={selectedColor}
                        colors={colors}
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
            <div className="main-container grid grid-cols-1 grid-rows-12 lg:grid-cols-11 lg:grid-rows-6 gap-4 lg:gap-x-4 lg:gap-y-4">

                {/*Bildevelger*/}
                <div className="row-span-2 lg:col-span-3 lg:row-span-6 lg:order-1 relative">
                    <div className="elements-container text-left text-xl">
                        <div className="image-grid-card">
                            <p className="lg:hidden text-sm">Velg bildestil</p>
                            <ImageGridCard onPictureSelect={handleImageSelect}/>
                        </div>
                    </div>
                </div>

                {/*Hovedbildet  */}
                <div className="row-span-5 lg:col-span-5 lg:row-span-5 lg:order-2 relative w-full h-full flex items-center justify-center"style={{ aspectRatio: '4 / 3', overflow: 'hidden', borderRadius: '6px' }}>
                    <MainImage selectedColor={selectedColor} imageToTransform={imageToTransform} loading={loading} setLoading={setLoading} recolorOption={recolorOption} formattedHex={formattedHex}/>


                </div>

                {/*Info om valgt farge*/}

                <div className="row-span-1 lg:col-span-5 lg:row-span-1 lg:order-5 rounded-lg bg-white ">
                    <ChosenColorInfo selectedColor={selectedColor} formattedHex={formattedHex}/>

                </div>


                {/*Siste kolonne på desktopview*/}
                <div className="row-span-4 lg:col-span-3 lg:row-span-6 lg:order-3 relative">
                    <div className="w-full">
                        {/*Tabs for fargevalg*/}
                        <div
                            className="flex-grow text-center xl:text-md lg:text-xs text-md flex justify-between sticky top-0 z-10 bg-jernia-nettside pb-2">
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
                        <div className={`${visibleModule === "modul2" ? "" : "hidden"} flex-grow overflow-y-scroll h-full lg:h-full absolute inset-0 pt-10 lg:pt-7`} >
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

                        {/*Favorittfarger*/}
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
