import React, {useEffect} from 'react';
import algoliasearch from 'algoliasearch/lite';
import 'instantsearch.css/themes/satellite.css';
import {Configure, InstantSearch, SearchBox, connectStateResults} from 'react-instantsearch-dom';
import {HitProps} from "@/components/ColorSearchHit";
import {SearchResults} from "algoliasearch-helper";

interface CustomResultsProps{
    searchState: any; // Replace `any` with a specific type if available
    searchResults: SearchResults<HitProps>;
    onResultsUpdate: (hits: HitProps[]) => null;

}

const CustomResultsComponent: React.FC<CustomResultsProps> = ({ searchState, searchResults, onResultsUpdate }) => {
    useEffect(() => {
        if (searchResults && searchResults.hits.length > 0) {
            onResultsUpdate(searchResults.hits as HitProps[]);
        }
    }, [searchResults, onResultsUpdate]);

    return null; // No rendering
};

const CustomResults = connectStateResults(CustomResultsComponent);


const searchClient = algoliasearch('NOLK3JAMLX', 'fcde24d65b04aa23920ceb878b4362d9');

interface SearchProps {
    onResultsUpdate: (hits: HitProps[]) => void;
}

export const Search: React.FC<SearchProps> = ({ onResultsUpdate }) => {
    return (
        <InstantSearch searchClient={searchClient} indexName="colours_dump">
            <Configure hitsPerPage={16} />
            <SearchBox />
            <CustomResults onResultsUpdate={onResultsUpdate} />
        </InstantSearch>
    );
};