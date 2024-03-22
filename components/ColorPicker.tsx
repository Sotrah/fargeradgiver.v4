import React from 'react';
import { ColorType } from "@/components/ColorType";
import colours_dump from "colours_dump.json"
import ColorCard from "@/components/ColorCard";

const ColorPicker: React.FC<{
    selectedColor: ColorType | null,
    onColorSelect: (color: ColorType | null) => void,
    colors?: ColorType[] } > = ({ selectedColor, onColorSelect, colors = [] }) => {

    const [displayCount, setDisplayCount] = React.useState(200);


    const handleColorClick = (colorItem: ColorType) => {
        if (selectedColor && selectedColor.hex === colorItem.hex) {
            console.log('Deselecting color');
            onColorSelect(null); // remove selected color
            return false;
        }
        else {
            onColorSelect(colorItem); // "Feed" the selected color to the parent component
            console.log('Selected color:', colorItem);
            return true;
        }
    };

    const handleShowMore = () => {
        setDisplayCount(prevCount => prevCount + 200);
    };

    return (
        <>
            <div className="grid grid-cols-3 gap-4 lg:gap-2 xl:gap-4 mt-6">
                {colors.slice(0, displayCount).map((colorItem, index) => (
                    <ColorCard key={index} colorItem={colorItem} handleColorClick={handleColorClick} selectedColor={selectedColor} />
                ))}
            </div>
            {displayCount < colors.length && (
                <button onClick={handleShowMore} className="mt-4 px-4 py-2 text-white border-blue-700 bg-blue-500 rounded">
                    Show More
                </button>
            )}
        </>
    );
};

export default ColorPicker;