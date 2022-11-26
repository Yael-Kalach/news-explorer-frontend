import React from 'react';
import NoResults from '../../images/icons/NoResults/no-results.svg'

export default function ResultsNotFound() {
    return (
        <section className='resultsNotFound'>
            <img src={NoResults} className='resultsNotFound__image' alt='loader' />
            <h2 className='resultsNotFound__header'>No results</h2>
            <p className='resultsNotFound__text'>Sorry, we haven't found any matches for your search.</p>
        </section>
    )
}