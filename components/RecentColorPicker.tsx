import React, { useEffect, useState } from 'react';
import { ColorType } from "@/components/ColorType";

const RecentColorPicker: React.FC<{ selectedColor: ColorType | null, onColorSelect: (color: ColorType | null) => void }> = ({ selectedColor, onColorSelect }) => {

    const [recentColors, setRecentColors] = useState<ColorType[]>([]);

    useEffect(() => {
        if (selectedColor) {
            updateRecentColors(selectedColor);
        }
    }, [selectedColor]);

    const updateRecentColors = (selectedColor: ColorType) => {
        if (recentColors.length >= 8) {
            setRecentColors(recentColors.slice(0, 7));
        }
        if (!recentColors.includes(selectedColor)) {
            setRecentColors((prevColors: ColorType[]) => [selectedColor, ...prevColors]);
                console.log('Recent colors:', recentColors);
        }  
    }

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
        <div className="grid grid-cols-4 gap-6">
            {recentColors.map((colorItem, index) => (
                <div
                    key={index}
                    className={`w-full rounded-lg flex items-center justify-center overflow-hidden relative border-2 ${selectedColor?.hex === colorItem.hex ? 'border-black' : 'border-transparent'} hover:border-gray-500`}
                    style={{ backgroundColor: colorItem.hex, aspectRatio: '1/1' }} 
                    onClick={() => handleColorClick(colorItem)}
                > 
                </div>
            ))}
        </div>
    );
};

export default RecentColorPicker;
