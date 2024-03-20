import React, { useState } from 'react';
import colourData from './../colours_dump.json';
import { ColorType } from "@/components/ColorType";

const ColorPicker: React.FC<{
    selectedColor: ColorType | null,
    onColorSelect: (color: ColorType | null) => void }
> = ({ selectedColor, onColorSelect,   }) => {
    const [displayCount, setDisplayCount] = useState(16);

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
        setDisplayCount(prevCount => prevCount + 16);
    };

    return (
        <>
            <div className="grid grid-cols-4 gap-6">
                {colourData.slice(0, displayCount).map((colorItem, index) => (
                    <div key={index} className="w-full overflow-hidden rounded-lg border-2 relative flex flex-col items-center justify-center hover:border-gray-500">
                        <button
                            className={`w-full flex flex-col items-center justify-center ${selectedColor?.hex === colorItem.hex ? 'border-black' : 'border-transparent'}`}
                            style={{ backgroundColor: '#F9F9F9', height: '130px'}}
                            onClick={() => handleColorClick(colorItem)}
                            aria-label={`Select ${colorItem.shortName} color`}
                        >
                            {/* Mindre fargefirkant */}
                            <div className="w-36 h-28 rounded-lg" style={{ backgroundColor: colorItem.hex }}></div>
                            {/* Tekst under fargefirkanten */}
                            <span className="mt-2 px-1 text-sm">{colorItem.code} {colorItem.shortName}</span>
                        </button>
                    </div>
                ))}
            </div>
        </>
    );
};

export default ColorPicker;