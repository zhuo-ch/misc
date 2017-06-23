import React from 'react';
import { BrowserRouter, Link } from 'react-router-dom';

export const Banner = ({banner}) => {
  return (
    <div className='banner'>
      <section className='banner-side-bar'>
        <h1>{ banner.header }</h1>
        <h4>{ banner.tagline }</h4>
        <Link to={`${ banner.title }` + '/'}>Shop { banner.title } {' >>'}</Link>
      </section>
      <section className='banner-img'>
        <img src={ 'assets/images/' + banner.title + '.jpg'}/>
      </section>
    </div>
  )
}
