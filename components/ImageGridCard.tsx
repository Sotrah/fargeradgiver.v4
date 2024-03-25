'use client';
import CloudinaryWrapper from "./CldImage";
import React, { useState } from 'react';
import UploadButton from "../components/UploadButton";

// Define the type for the component props
interface ImageGridCardProps {
    onPictureSelect: (url: string) => void; // Assuming onPictureSelect expects a string and doesn't return anything
}

const ImageGridCard: React.FC<ImageGridCardProps> = ({ onPictureSelect }) => {
    const [selected, setSelected] = useState<number>(0);

    const [images, setImages] = useState<string[]>([
        'https://res.cloudinary.com/dj6mfsxnu/image/upload/v1711181504/e5rhfxd4qbo6a2irtfqn.jpg',
        'https://res.cloudinary.com/dj6mfsxnu/image/upload/v1711181537/oqa7u4fxuyknbxyfxn9a.jpg',
        'https://res.cloudinary.com/dj6mfsxnu/image/upload/v1711181638/haxttwqwqq11kz8hmys8.jpg',
    ]);

    const handleImageClick = (index: number): void => {
        setSelected(index);
        console.log("Selected image: " + images[index]);
        onPictureSelect(images[index]); // "Feed" the selected picture url to the parent component
    };

    // Function to handle the state update in the parent component
    const handleUploadSuccess = (result: string): void => {
        const updatedImages = images
        updatedImages[3] = result; // Add the uploaded photo to the images array at index 3
        setImages(updatedImages);
        setSelected(3); // uploaded photo always in same spot
        console.log(result);
        onPictureSelect(result); // "Feed" the selected picture url to the parent component
    };

    return (
        <div>
            <div className="grid lg:grid-cols-2 grid-cols-4 gap-2 justify-start">
                {images.map((src, index) => (
                    <div
                        key={index}
                        className={`w-full rounded-lg flex items-center justify-center overflow-hidden relative border-2 ${selected === index ? 'border-black' : 'border-transparent'}  hover:border-gray-500`}
                        onClick={() => handleImageClick(index)}
                    >
                        <CloudinaryWrapper
                            width={500}
                            height={500}
                            src={src}
                            alt={`Image ${index + 1}`}
                            layout="responsive"
                            objectFit="cover"
                        />
                    </div>
                ))}
                
            </div>
            <div
                    className={`relative border-2  rounded-lg`}
                    // onClick={() => handleUploadSuccess('')} // You might need a different handler here
                >
                    <UploadButton onUploadSuccess={handleUploadSuccess} />
                </div>
        </div>
    );
}

export default ImageGridCard;
