import React, {useEffect, useState, Suspense} from "react";
import { useSearchParams } from "next/navigation"
import { ColorType } from "@/components/ColorType";


const GetUrlColor: React.FC<{
    selectedColor: ColorType | null,
    colorsAreLoaded: boolean,
    onColorSelect: (color: ColorType | null) => void,
    handleColorSelect: (color: ColorType | null) => void,
    colors: ColorType[] } > = ({ selectedColor, onColorSelect, colorsAreLoaded, colors, handleColorSelect = () => {} }) => {
    // Select color from URL if one is present
    // use "?color=" and then the hexcode to select a color.
    // This could easily be changed to the code of the color
    // demo url: https://fargeradgiver-v4.vercel.app/?color=b99e6b
    const searchParams = useSearchParams();

    useEffect(() => {
        if (colorsAreLoaded) {
            const urlColor = searchParams.get('color');
            // Check if hexcode is provided in the query parameters
            if (urlColor) {
                const urlHexCode = "#" + urlColor;
                console.log("Hexcode from url: " + urlHexCode);
                // Find the color with the provided hexcode
                const urlColorObject = colors.find((color) => color.hex === urlHexCode);
                // If the color is found, set it as the selected color
                if (urlColorObject) {
                    handleColorSelect(urlColorObject);
                    console.log("URL color found: " + urlColorObject.shortName);
                }
                else {
                    console.log("URL color not found");
                }
            }
        }
    }, [colorsAreLoaded, colors, searchParams]);

    return null;
}
export default GetUrlColor;