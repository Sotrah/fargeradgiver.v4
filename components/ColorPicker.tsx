import React from 'react';
import { ColorType } from "@/components/ColorType";
import colours_dump from "colours_dump.json"
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
                    <div key={index} className="w-full overflow-hidden rounded-lg border-2 relative hover:border-gray-500" style={{ paddingBottom: '100%' }}> {/* Sikrer 1:1 forhold */}
                        <button
                            className={`absolute inset-0 flex flex-col items-center justify-center ${selectedColor?.hex === colorItem.hex ? 'border-black' : 'border-transparent'}`}
                            style={{ backgroundColor: '#F9F9F9' }}
                            onClick={() => handleColorClick(colorItem)}
                            aria-label={`Select ${colorItem.shortName} color`}
                        >
                            {/* Fargefirkant som fyller toppen av kortet */}
                            <div className="w-full h-2/3 flex items-center justify-center" style={{ backgroundColor: colorItem.hex }}>
                                {/* Dekorativ fargefirkant, kan justeres for å fylle en bestemt del av dette området */}
                                <div className="w-3/4 h-3/4 rounded-lg" style={{ backgroundColor: colorItem.hex }}></div>
                            </div>
                            {/* Tekst under fargefirkanten */}
                            <div className="w-full h-1/3 flex items-center justify-center text-xs text-center" style={{ lineHeight: '1.2' }}>
                                <span>{colorItem.code === colorItem.shortName ? colorItem.shortName : `${colorItem.code} ${colorItem.shortName}`}</span>
                            </div>
                        </button>
                    </div>
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