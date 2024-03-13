import React from 'react';
import { render, screen } from '@testing-library/react';
import Page from '../app/page';
import Home from "../app/page";
// Mock the CldImage component to prevent it from trying to access Cloudinary
jest.mock('../components/CldImage', () => {
    return {
        __esModule: true,
        default: () => <div>Mocked Cloudinary Image</div>,
    };
});

describe('Page component', () => {
    it('renders the expected content after loading', async () => {
        render(<Home />);
        const heading = await screen.findByText('Visualiseringsverktøy');
        expect(heading).toBeInTheDocument();
    });
    //Legg til handleColor og handleImage her?
});
