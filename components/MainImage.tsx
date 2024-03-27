import { ColorType } from './ColorType';
import {ScaleLoader} from "react-spinners";
import React, {useState} from "react";
import {useSpinDelay} from "spin-delay";
import CldImage from "../components/CldImage";

const MainImage: React.FC<{
    selectedColor: ColorType | null,
    imageToTransform: String | null,
    loading: boolean,
    setLoading: (loading: boolean) => void,
    recolorOption: string,
    formattedHex: string | null
} > = ({ selectedColor, imageToTransform, loading = false, setLoading, recolorOption, formattedHex }) => {

    const showSpinner = useSpinDelay(loading, { delay: 300, minDuration: 700 });


    return (
        <div>
            {showSpinner && (
                <div className="absolute inset-0 flex items-center justify-center z-20">
                    <ScaleLoader
                        color="#000000"
                        speedMultiplier={0.5}
                        loading={showSpinner}
                    />
                </div>
            )}
            {/* The below section is dimmed until the image is loaded */}
            <div className={`${showSpinner ? "opacity-50" : ""} w-full h-full relative`}>
                {/* CldImage is documented here: https://next.cloudinary.dev/cldimage/configuration
                        If there is an image and a selectedColor selected, transform it with Recolor */}
                <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center z-10">
                    {imageToTransform && selectedColor && (
                        <CldImage
                            placeholder="empty"
                            onLoad={() => setLoading(false)}
                            width='1024'
                            height='1024'
                            src={imageToTransform}
                            alt="Uploaded image"
                            className="rounded-md"
                            sizes="100vw"
                            recolor={[`${recolorOption}`, formattedHex]}
                        />
                    )}
                </div>
                <div className=" flex justify-center items-center z-0">
                    {imageToTransform &&(
                        <CldImage
                            placeholder="empty"
                            onLoad={() =>
                            {if (!selectedColor) {
                                setLoading(false)}
                            }
                            }
                            width='1024'
                            height='1024'
                            src={imageToTransform}
                            alt="Uploaded image"
                            className="rounded-md"
                            sizes="100vw"
                        />
                    )}
                </div>
            </div>
        </div>
    )
}

export default MainImage;