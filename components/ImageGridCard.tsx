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
        'https://res.cloudinary.com/dj6mfsxnu/image/upload/v1711364452/qrkelyfikaa03biiaedn.jpg',
        'https://res.cloudinary.com/dj6mfsxnu/image/upload/v1711364598/dc3x1mvacxdq8qc7kk80.jpg',
        'https://res.cloudinary.com/dj6mfsxnu/image/upload/v1711364668/jycc1koodetkfjvdcoky.jpg',
        'https://res.cloudinary.com/dj6mfsxnu/image/upload/v1711540789/aufzdixrvc5apdvpbkbj.png',
        'https://res.cloudinary.com/dj6mfsxnu/image/upload/v1711540736/aegvqdxc0i1hbsuksdcp.png'
    ]);


    const handleImageClick = (index: number): void => {
        setSelected(index);
        console.log("Selected image: " + images[index]);
        onPictureSelect(images[index]); // "Feed" the selected picture url to the parent component
    };

    // Function to handle the state update in the parent component
    const handleUploadSuccess = (result: string): void => {
        const updatedImages = images
        updatedImages[5] = result; // Add the uploaded photo to the images array at index 5
        setImages(updatedImages);
        setSelected(5); // uploaded photo always in same spot
        console.log(result);
        onPictureSelect(result); // "Feed" the selected picture url to the parent component
    };

    return (
        <div className="lg:h-full flex flex-col justify-between gap-2">
            <div className="flex-none grid lg:grid-cols-2 grid-cols-3 gap-2 relative">
                {images.map((src, index) => (
                    <div
                        key={index}
                        className={` rounded-lg flex items-center overflow-hidden relative border-2 ${selected === index ? 'border-black' : 'border-transparent'}  hover:border-gray-500`}
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
                {images.length < 6 && (
                    <div className="w-full rounded-lg border-dashed border-2 border-gray-400 flex items-center justify-center">
                        <p></p>
                    </div>
                )} 
            </div>
            <div
                className={`rounded-lg flex-initial`}
                style={{ height: '5.25em' }}
                >
                    <UploadButton onUploadSuccess={handleUploadSuccess} />
            </div>
        </div>    
    );
}

export default ImageGridCard;