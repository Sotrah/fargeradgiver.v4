import { CldUploadButton } from 'next-cloudinary';
import { useState } from 'react';

const UploadButton = ({ onUploadSuccess }) => {
  const [cloudinaryResult, setCloudinaryResult] = useState(null);

  return (
    <CldUploadButton 
      className='bg-blue-500 hover:bg-blue-700 text-white rounded-lg w-full h-full' 
      uploadPreset="changecolor"
      onSuccess={(result, { widget }) => {
        console.log(result?.info);
        if (typeof result?.info === 'object' && result?.info !== null) {
          setCloudinaryResult(result.info.url);
          onUploadSuccess(result.info.url); // Call the parent function with the result
        } else {
          setCloudinaryResult(null);
        }
      }}
      options={{
        sources: ['local', 'url', 'camera'],
        multiple: false,
      }}
    />
  );
};

export default UploadButton;
