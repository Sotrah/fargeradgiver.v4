import React, { useState } from 'react';
import colourData from './../colours_dump.json';
import { ColorType } from "@/components/ColorType";

const ColorPicker: React.FC<{ selectedColor: ColorType | null, onColorSelect: (color: ColorType | null) => void }> = ({ selectedColor, onColorSelect }) => {
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
                    <button
                        key={index}
                        className={`w-full rounded-lg flex items-center justify-center overflow-hidden relative border-2 ${selectedColor?.hex === colorItem.hex ? 'border-black' : 'border-transparent' } hover:border-gray-500`}
                        style={{ backgroundColor: colorItem.hex, aspectRatio: '1/1' }}
                        onClick={() => handleColorClick(colorItem)}
                        aria-label={`Select ${colorItem.shortName} color`}
                    >
                        <span className="text-white px-1">{colorItem.shortName}</span>
                    </button>
                ))}
            </div>
            {displayCount < colourData.length && (
                <button onClick={handleShowMore} className="mt-4 px-4 py-2 text-white border-blue-700 bg-blue-500 rounded">
                    Show More
                </button>
            )}
        </>
    );
};

export default ColorPicker;