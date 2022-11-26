import React from 'react';
import NoResults from '../../images/icons/NoResults/no-results.svg'

export default function ResultsError({ errorMessage }) {
  return (
    <section className='resultsError'>
      <img src={NoResults} className='resultsError__circle' alt='loader' />
      <h2 className='resultsError__header'>Something went wrong</h2>
      <p className='resultsError__text'>{errorMessage}</p>
    </section>
  );
}