import React from 'react'; // Ensure React is imported when using JSX in TypeScript
import {ColorType} from "@/components/ColorType";

// Define a TypeScript interface for the Hit object's structure
export interface HitProps {
    hit: {
        code: string;
        description: string;
        fullName: string;
        hex: string;
        ncsCode: string;
        shortName: string;
    };
}
// Define a function to map HitProps to ColorType
{/*export const mapHitToProps = (hits: HitProps[]): ColorType[] => {
    return hits.map(hit => ({
        fullName: hit?.hit?.fullName || '',
        shortName: hit?.hit?.shortName || '',
        code: hit?.hit?.code || '',
        ncsCode: hit?.hit?.ncsCode || '',
        hex: hit.hit.hex.startsWith('#') ? hit.hit.hex : `#${hit.hit.hex}`, // Ensure hex starts with '#'
        description: '', // Adjust as needed
        imageUrls: [], // Adjust as needed
        matchingColors: {}, // Adjust as needed
        shades: {}, // Adjust as needed
        collections: [], // Adjust as needed
    }));
};*/}
export const Hit: React.FC< HitProps > = ({ hit }) => {
    return (
        <article style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
    <div style={{
        width: '20px',
        height: '20px',
        borderRadius: '50%', // Circle
        backgroundColor: hit.hex,
    }} />
            <div>
                <div className="hit-shortName">
                    {hit.shortName}
                </div>
                <div className="hit-fullName">
                    {hit.fullName}
                </div>
                <div className="hit-hex">
                </div>
            </div>
        </article>
    );
};
