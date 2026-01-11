import React, { FC } from 'react'
import Hero from './../../components/hero/index';
import Filter from '../../components/filter';
import List from './../../components/list/index';

const Home:FC = () => {
  return (
    <div>
      
        <Hero />


        <Filter />

        
        <List />

    
    </div>
  )
}

export default Home