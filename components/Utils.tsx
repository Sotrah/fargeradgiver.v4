import {HitProps} from "@/components/ColorSearchHit";
import {ColorType} from "@/components/ColorType";

export function formatHexColor(hexColor: string): string {
    return hexColor.startsWith('#') ? hexColor.slice(1) : hexColor;
}
export function mapHitsToColorType(hits: HitProps[]): ColorType[] {
    return hits.map(hit => ({
        fullName: hit.fullName, // Adjusted from hit.hit.fullName
        shortName: hit.shortName, // Adjusted from hit.hit.shortName
        code: hit.code, // Adjusted from hit.hit.code
        ncsCode: hit.ncsCode, // Adjusted from hit.hit.ncsCode
        hex: hit.hex, // Ensure this matches your actual data structure
        description: hit.description, // Adjusted as needed
        imageUrls: [], // Adjust based on your data or application logic
        matchingColors: {}, // Adjust based on your data or application logic
        shades: {}, // Adjust based on your data or application logic
        collections: [], // Adjust based on your data or application logic
    }));
}