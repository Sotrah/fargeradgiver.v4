import algoliasearch from "algoliasearch/lite";
import "instantsearch.css/themes/satellite.css";
import { Hits, InstantSearch, SearchBox, Configure } from "react-instantsearch";

import { Hit } from "./ColorSearchHit";

const searchClient = algoliasearch("NOLK3JAMLX", "fcde24d65b04aa23920ceb878b4362d9");

export const Search = () => {
    return (
        <InstantSearch
            searchClient={searchClient}
            indexName="colours_dump"
        >
            <Configure hitsPerPage={5} />
            <div className="ais-InstantSearch">
                <SearchBox />
                <Hits hitComponent={Hit} />
            </div>
        </InstantSearch>
    );
};