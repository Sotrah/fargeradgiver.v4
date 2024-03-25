import { ColorType } from "@/components/ColorType";
import React, { useContext } from 'react';
import { FavoriteColorContext, FavoriteColorContextType } from './FavoriteColorContext';

interface ColorCardProps {
    colorItem: ColorType;
    handleColorClick: (color: ColorType) => void;
    selectedColor: ColorType | null,
}

const ColorCard: React.FC<ColorCardProps> = ({ colorItem, handleColorClick, selectedColor }) => {
    const { favoriteColors, setFavoriteColors }: FavoriteColorContextType = useContext(FavoriteColorContext);



    const handleFavoriteClick = (colorItem: ColorType) => {
        if (favoriteColors.includes(colorItem)) {
            const indexToRemove =favoriteColors.indexOf(colorItem);
            if (indexToRemove !== -1) {
                const updatedFavoriteColors: ColorType[] = [...favoriteColors]; // Create a copy of the array
                updatedFavoriteColors.splice(indexToRemove, 1); // Remove colorItem from the copy
                setFavoriteColors(updatedFavoriteColors); // Update state with the modified array
              }
            return false;
        }
        else {
            const updatedFavoriteColors: ColorType[] = [...favoriteColors, colorItem]; // Add colorItem to a new copy of the array
            setFavoriteColors(updatedFavoriteColors); // Update state with the modified array
            return true;
        }
    };



    return (
        <div className={`w-full overflow-hidden rounded-lg border-2 relative hover:border-gray-500 ${selectedColor?.hex === colorItem.hex ? 'border-black' : 'border-lightgray'}`} style={{ paddingBottom: '100%' }}>
            {/* Favorite button */}
            <button
                className="absolute top-1 right-1 w-1/4 bg-transparent cursor-pointer z-10"
                onClick={(event) => {
                    // event.stopPropagation(); // Prevent the color card click event from triggering
                    handleFavoriteClick(colorItem); // Pass the color item to the handleFavoriteClick function
                }}
                aria-label={`Favorite ${colorItem.shortName}`}
            >
                <svg className={`opacity-50 w-full h-full stroke-1 stroke-black fill-current hover:fill-gray-700 ${favoriteColors.includes(colorItem) ? 'fill-black' : 'fill-transparent'}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">

                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                </svg>
            </button>
            {/* Rest of color card */}
            <button
                className={`absolute inset-0 flex flex-col items-center justify-center `}
                style={{ backgroundColor: '#F9F9F9' }}
                onClick={() => handleColorClick(colorItem)}
                aria-label={`Select ${colorItem.shortName} color`}
            >
                <div className="w-full h-2/3 flex items-center justify-center" style={{ backgroundColor: colorItem.hex }}>
                    <div className="w-3/4 h-3/4 rounded-lg" style={{ backgroundColor: colorItem.hex }}></div>
                </div>
                <div className="w-full h-1/3 flex items-center justify-center text-xs text-center" style={{ lineHeight: '1.2' }}>
                    <span>{colorItem.shortName}</span>
                </div>
            </button>
        </div>
    );
}

export default ColorCard;