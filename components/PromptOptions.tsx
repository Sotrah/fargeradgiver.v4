import React from 'react';

interface PromptOptionsProps {
    selectedOption: string;
    onSelectOption: (value: string) => void;
}

const PromptOptions = [
    { label: "Endre vegger", value: 'All the walls and every wall in the picture, exclude the roof and ceilings' },
    { label: "Endre tak", value: 'Recolor only the ceiling and roof, do NOT recolor the walls.' },
    { label: "Endre tak og vegger", value: 'Recolor ALL the ceilings and every ceiling, AND ALL the walls and every wall' },
];

const PromptRecolor: React.FC<PromptOptionsProps> = ({ selectedOption, onSelectOption }) => {
    return (
        <div className="flex flex-col">
            {PromptOptions.map((option) => (
                <label key={option.value} className="inline-flex items-center mt-3">
                    <input
                        type="radio"
                        className="form-radio h-5 w-5 text-gray-600"
                        name="recolorOption"
                        value={option.value}
                        checked={selectedOption === option.value}
                        onChange={(e) => onSelectOption(e.target.value)}
                    />
                    <span className="ml-2 text-gray-700">{option.label}</span>
                </label>
            ))}
        </div>
    );
};

export default PromptRecolor;
