import React, { useEffect, useState } from 'react';
import { ColorType } from "@/components/ColorType";
import ColorCard from "@/components/ColorCard";
import { useContext } from 'react';
import { FavoriteColorContext } from "@/components/FavoriteColorContext";


const FavoriteColorPicker: React.FC<{ 
    selectedColor: ColorType | null, 
    favoriteColors: ColorType[],
    onColorSelect: (color: ColorType | null) => void }> = ({ selectedColor, onColorSelect }) => {

    const { favoriteColors } = useContext(FavoriteColorContext);

    

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

    return (
        <div className="grid grid-cols-3 gap-4 lg:gap-2 xl:gap-4 mt-6">
            {favoriteColors.map((colorItem, index) => (
                <ColorCard key={index} colorItem={colorItem} handleColorClick={handleColorClick} selectedColor={selectedColor} />
            ))}
        </div>
    );
};

export default FavoriteColorPicker;
