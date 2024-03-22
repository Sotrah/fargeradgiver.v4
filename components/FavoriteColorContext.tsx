import { createContext } from 'react';
import {ColorType} from "@/components/ColorType";

export const FavoriteColorContext = createContext<ColorType[]>([]);