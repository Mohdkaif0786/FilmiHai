import React, { useEffect, useState } from 'react'
import './cards.css';
import avenger from '../avenger.jpg';
import { ThreeDots } from 'react-loader-spinner';
import { getDocs } from 'firebase/firestore';
import ReactStars from 'react-stars';
import { moviesRef } from './firebase/firebase';
import { Link } from 'react-router-dom';

const dummy_data = [
  {
    id: 1,
    name: "Avenger Endgame",
    rating: 5,
    years: 2021,
    url: ''
  },
  {
    id: 1,
    name: "Avenger Endgame",
    rating: 3,
    years: 2021,
    url: ''
  },
  {
    id: 1,
    name: "Avenger Endgame",
    rating: 1,
    years: 2021,
    url: ''
  },
  {
    id: 1,
    name: "Avenger Endgame",
    rating: 5,
    years: 2021,
    url: ''
  }, {
    id: 1,
    name: "Avenger Endgame",
    rating: 2,
    years: 2021,
    url: ''
  }, {
    id: 1,
    name: "Avenger Endgame",
    rating: 3,
    years: 2021,
    url: ''
  }, {
    id: 1,
    name: "Avenger Endgame",
    rating: 5,
    years: 2021,
    url: ''
  }, {
    id: 1,
    name: "Avenger Endgame",
    rating: 4,
    years: 2021,
    url: '',
  }




]

const Cards = () => {
  const [datas, setDatas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getData() {
      setLoading(true);
      const _data = await getDocs(moviesRef);
      console.log(_data);
      _data.forEach((doc) => { setDatas((prev) => [...prev, { ...(doc.data()), id: doc.id }]) });
      setLoading(false)
    }
    getData()
  }, [])
  console.log(datas);

  return (
    <div className='px-0 py-0 md:py-2 md:px-2 shadow-lg bg-black cursor-pointer   mt-2 flex justify-evenly  md:justify-between flex-wrap  '>
      {
        loading ? <div  className=' flex items-center justify-center h-96 w-full'><ThreeDots height={36} color='white' /></div> :
          datas.map(data => {
            return (
              <Link to={`/detail/${data.id}`}>
                <div id='card' className=" p-3 mt-5 shadow-lg bg-gray-950 cursor-pointer hover:-translate-y-3 transition-all duration-500   md:w-auto">
                  <img src={data.image} id="card_img" alt="movie poster" className='h-60 md:h-64 m-auto' />
                  <h1 className='mb-1 mt-1 card-child'>{data.name}</h1>
                  <h1 className='mb-1 flex items-center card-child'><span className='text-gray-600 font-bold  mr-2'>Rating: </span><ReactStars size={23} edit={false} value={data.rating/data.rated} half={true} /></h1>
                  <h1 className='mb-1 card-child'><span className='text-gray-600 font-bold'>years: </span>{data.year}</h1>
                </div>
              </Link>
            )
          })
      }
    </div>
  )
}

export default Cards
