import { CldUploadButton } from 'next-cloudinary';
import { useState } from 'react';

const UploadButton = ({ onUploadSuccess }) => {
    const [cloudinaryResult, setCloudinaryResult] = useState(null);

    return (
        <CldUploadButton
            className='bg-blue-500 hover:bg-blue-700 text-white rounded-lg w-full h-full'
            uploadPreset="colorchangesigned"
            signatureEndpoint="/api/sign-cloudinary-params"
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
                sources: ['local'],
                multiple: false,
                autoMinimize: true,
                cropping: true,
                showSkipCropButton: false,
                croppingAspectRatio: 1.3333,
                theme: 'minimal',
                language: "no",
                text: {
                    "no": {
                        "crop": {
                            "title": "Beskjær bildet",
                        },
                        "crop": {
                            "title": "Beskjær",
                            "crop_btn": "Beskjær",
                            "skip_btn": "Hopp over",
                            "reset_btn": "Tilbakestill",
                            "close_btn": "Ja",
                            "close_prompt": "Closing vil kansellere alle opplastninger, Er du sikker?",
                            "image_error": "Feil ved lasting av bilde",
                            "image_data_error": "Enten filstørrelse overstiger nettlesergrensen eller filen kan være ødelagt.",
                            "corner_tooltip": "Dra hjørne for å endre størrelse",
                            "handle_tooltip": "Dra håndtak for å endre størrelse"
                        },
                        "or": "eller",
                        "local": {
                            "browse": "Velg / ta et bilde",
                            "dd_title_single": "Legg til et bilde her",
                            "drop_title_single": "Slipp her for å laste opp",
                        },
                        "queue": {
                            "title_uploading": "Laster opp ressurser",
                            "mini_title": "Lastet opp",
                            "mini_title_uploading": "Laster opp",
                            "mini_title_processing": "Behandler",
                            "done": "Ferdig",
                            "statuses": {
                                "uploading": "Laster opp…",
                                "processing": "Behandler…",
                                "timeout": "En stor fil lastes opp for øyeblikket. Det kan ta litt tid før den vises i produktmiljøet ditt.",
                                "error": "Feil",
                                "uploaded": "Ferdig",
                                "aborted": "Avbrutt"
                            }
                        }
                    }
                }
            }}
        >
            <p>Last opp bilde</p>
        </CldUploadButton>
    );
};

export default UploadButton;