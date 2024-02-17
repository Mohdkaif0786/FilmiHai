import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router';
import { doc, getDoc } from 'firebase/firestore';
import ReactStars from 'react-stars';
import { db } from './firebase/firebase';
import { ThreeCircles } from 'react-loader-spinner';
import Review from './review';

const Detail = () => {
    let [data, setData] = useState({
        name: "",
        image: "",
        description: "",
        year: "",
        rating:0,
        rated:0
    });
    let { id } = useParams();
    
    useEffect(() => {
        async function getData() {
            setLoading(true);
            const _doc = doc(db, "movies", id);
            const _data = await getDoc(_doc);
            console.log(_data.data())
            setData(_data.data());
            setLoading(false);
            console.log(data);
        }
        getData();
    },[dep]) ;
    const [loading, setLoading] = useState(true);


    return (
        <div className='detail p-3 mt-4 flex flex-col items-center md:flex-row justify-center  md:items-start'>

            {loading ?
                <div className='h-96  w-full flex justify-center items-center'>
                    <ThreeCircles height={35} color='white' />
                </div> :
                <>
                    <img src={data.image} alt='image' className=' h-68 md:h-80 mb-3 md:sticky top-28' />
                    <div className='info ml-0 md:ml-4 w-full md:w-1/2'>
                        <h1 className='text-2xl md:text-3xl text-gray-400 font-bold'>{data.name} <span className='text-xl'>({data.year})</span></h1>
                        <ReactStars size={22} edit={false} value={data.rating/data.rated} half={true} />
                        <p className='mt-2 text-sm b border-solid pb-3  border-b-2 border-gray-500 '>
                            {data.description}
                        </p>
                        < Review id={id} prevRating={data.rating} userRated={data.rated}/>
                    </div>
                </>
            }
        </div>
    )
}

export default Detail;
