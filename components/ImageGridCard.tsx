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
        'https://res.cloudinary.com/dv4ydb3qf/image/upload/v1713522064/jycc1koodetkfjvdcoky_cnhibb-600px_height_oyw2kz.jpg',
        'https://res.cloudinary.com/dv4ydb3qf/image/upload/v1713522063/qrkelyfikaa03biiaedn_od2u99-600px_height_qhbttx.jpg',
        'https://res.cloudinary.com/dv4ydb3qf/image/upload/v1713522072/aufzdixrvc5apdvpbkbj_chmtzg-600px_height_gpgnpl.png',
        'https://res.cloudinary.com/dv4ydb3qf/image/upload/v1713522070/dc3x1mvacxdq8qc7kk80_mxzxpo-600px_height_k8i9p1.jpg',
        'https://res.cloudinary.com/dv4ydb3qf/image/upload/v1713522067/aegvqdxc0i1hbsuksdcp_cmm97v-600px_height_zzwzas.png'
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