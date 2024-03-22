import React from 'react'; // Ensure React is imported when using JSX in TypeScript

// Define a TypeScript interface for the Hit object's structure
export interface HitProps {
        code: string;
        description: string;
        fullName: string;
        hex: string;
        ncsCode: string;
        shortName: string;

}
export const Hit: React.FC<{hit: HitProps}> = ({ hit }) => {
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