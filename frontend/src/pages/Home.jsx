import React, { useContext, useState } from 'react'
import Nav from '../Component/Nav'
import { ListingDataContext } from "../Context/ListingContext"
import Card from '../Component/Card'

const Home = () => {
  const { listingData, setListingData, newListData,  } = useContext(ListingDataContext)
  return (

    <div>
      <Nav />
      <div className='w-[100vw] h-[77vh] flex items-center justify-center gap-[25px] flex-wrap md:mt-[180px] '>
        {newListData.map((list) => (
          <Card title={list.title} landmark={list.landmark} city={list.city} image1={list.image1} image2={list.image2} image3={list.image3} rent={list.rent} id={list._id} ratings={list.ratings} />
        ))
        }
      </div>
    </div>
  )
}

export default Home