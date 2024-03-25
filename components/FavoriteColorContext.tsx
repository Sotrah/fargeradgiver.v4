import React, { createContext } from 'react';
import {ColorType} from "@/components/ColorType";

export interface FavoriteColorContextType {
    favoriteColors: ColorType[];
    setFavoriteColors: React.Dispatch<React.SetStateAction<ColorType[]>>;
  }
  
// Create the context with initial value (empty array)
export const FavoriteColorContext = createContext<FavoriteColorContextType>({
    favoriteColors: [],
    setFavoriteColors: () => {} // Default setter function
  });

  