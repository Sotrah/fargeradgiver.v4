export interface ColorType{
    fullName: string;
    shortName: string;
    code: string;
    ncsCode: string;
    hex: string;
    description: string | null;
    imageUrls: string[];
    matchingColors: any; // Adjust the type as needed
    shades: any; // Adjust the type as needed
    collections: {
        code: string;
        name: string;
        promoted: boolean;
        imageUrl: string | null;
        createdAt: string | null;
        brand: string | null;
        type: string | null;
        applicationArea: string | null;
    }[];
}