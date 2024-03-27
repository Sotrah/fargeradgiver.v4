import React, { useEffect, useState } from 'react';
import { ColorType } from "@/components/ColorType";
import ColorCard from "@/components/ColorCard";

const RecentColorPicker: React.FC<{ selectedColor: ColorType | null, visibleModule: String, onColorSelect: (color: ColorType | null) => void }> = ({ selectedColor, onColorSelect, visibleModule }) => {

    const [recentColors, setRecentColors] = useState<ColorType[]>([]);

    useEffect(() => {
        if (selectedColor) {
            updateRecentColors(selectedColor);
        }
    }, [selectedColor]);

    const updateRecentColors = (selectedColor: ColorType) => {
        if (!recentColors.includes(selectedColor)) {
            setRecentColors((prevColors: ColorType[]) => [selectedColor, ...prevColors]);
            console.log('Recent colors:', recentColors);
        }
        // if the recent colors tab isn't open, move the selected color to the front of the recently used list
        else if (visibleModule !== 'modul3')  {
            setRecentColors((prevColors: ColorType[]) => {
                const updatedColors = prevColors.filter(color => color !== selectedColor);
                console.log('Moved color to front of recent colors:', recentColors);
                return [selectedColor, ...updatedColors];
            });
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
        <div className="grid grid-cols-3 gap-4 lg:gap-2 xl:gap-4 mt-6">
            {recentColors.map((colorItem, index) => (
                <ColorCard key={index} colorItem={colorItem} handleColorClick={handleColorClick} selectedColor={selectedColor} />
            ))}
        </div>
    );
};

export default RecentColorPicker;