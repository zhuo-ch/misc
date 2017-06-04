import React from 'react';
import { BrowserRouter, Link } from 'react-router-dom';

export const Banner = ({banner}) => {
  return (
    <div className='banner'>
      <section className='banner-side-bar'>
        <h2>{ banner.header }</h2>
        <h4>{ banner.tagline }</h4>
        <Link to={ '/' + `${banner.title}` + '/'}>{ banner.title }</Link>
      </section>
      <section className='banner-img'>

      </section>
    </div>
  )
}
