'use client'
import CloudinaryWrapper from "./CldImage";
import { useState } from 'react';
import UploadButton from "../components/UploadButton";

const ImageGridCard = ({ onPictureSelect }) =>  {
    const [selected, setSelected] = useState(0);

    const images = [
        'http://res.cloudinary.com/dj6mfsxnu/image/upload/v1707474684/jgxom27mvriax5av0prr.png',
        'https://res.cloudinary.com/dj6mfsxnu/image/upload/v1708953978/r0j1iltafpztvbssaout.jpg',
        'https://res.cloudinary.com/dj6mfsxnu/image/upload/v1708954267/i9ff5slcnev06ckqp9oa.jpg',

    ];

    const handleImageClick = (index) => {
        setSelected(index);
        console.log("Selected image: " + images[index]);
        onPictureSelect(images[index]); // "Feed" the selected picture url to the parent component
    };

    // Function to handle the state update in the parent component
    const handleUploadSuccess = (result) => {
        setSelected(4);
        console.log(result);
        onPictureSelect(result); // "Feed" the selected picture url to the parent component
    };

    return (
        <div className="grid grid-cols-2 gap-2 justify-start">
            {images.map((src, index) => (
                <div
                    key={index}
                    className={`w-full rounded-lg flex items-center justify-center overflow-hidden relative border-2 ${selected === index ? 'border-black' : 'border-transparent'}  hover:border-gray-500`}
                    onClick={() => handleImageClick(index)}
                >
                    {/* <Image src={src} alt={`Image ${index + 1}`} layout="responsive" width={50} height={50}
                           objectFit="cover"/> */}
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
            <div
                    key={images.length + 1}
                    className={`relative border-2 ${selected === images.length + 1 ? 'border-black' : 'border-transparent'} rounded-lg`}
                    onClick={() => handleImageClick(index)}
                >
                <UploadButton onUploadSuccess={handleUploadSuccess} />
            </div>
            
        </div>
    );
}

export default ImageGridCard;