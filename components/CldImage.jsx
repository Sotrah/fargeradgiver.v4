// Using Next Cloudinary in the app directory currently requires marking the parent page or component as a Client Component. This is due to the split of components in two types: Client Components and Server Components.At the top of the file, simply add:
"use client";
import { CldImage as CldImageDefault } from "next-cloudinary";
import React from "react";
const CldImage = (props) => {

  return <CldImageDefault {...props} />;

};

export default CldImage;