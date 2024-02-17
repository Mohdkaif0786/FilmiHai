import React, { useEffect, useState,useContext } from 'react'
import ReactStars from 'react-stars';
import { useNavigate } from 'react-router';
import { reviewsRef, db } from './firebase/firebase';
import { addDoc, doc, updateDoc, query, where, getDocs } from 'firebase/firestore';
import { TailSpin, ThreeDots } from 'react-loader-spinner';
import swal from 'sweetalert';
import { Appstate } from '../App';
const Review = ({ id, prevRating, userRated }) => {
    const [loading, setLoading] = useState(false);
    const [review, setReview] = useState(0);
    const [thought, setThought] = useState("");
    const [datas, setDatas] = useState([]);
    const [loadAg, setLoadAg] = useState(false);
    const context=useContext(Appstate);
    const navigator=useNavigate();
    let [dep,setDep]=useState(0);
    const addreview = async () => {
        console.log(context);
        setLoading(true);
        try {
            if(context.login){
            addDoc(reviewsRef, {
                movies_id: id,
                name:context.userName,
                review: review,
                thought: thought,
                timestamp: new Date().getTime()
            });
            swal({
                title: "succesfull rate",
                title: "Successfull Added",
                icon: "success",
                button: false,
                timer: 3000
            })
            setReview(0);
            setThought("");
            setDep(dep+1);
            const _ref = doc(db, "movies", id);
            await updateDoc(_ref, {
                rating: prevRating + review,
                rated: userRated + 1
            })}
            else{
                navigator("/login");
            }
        }
        catch (err) {
            swal({
                title: err,
                title: "error",
                icon: "error",
                button: false,
                timer: 3000
            })
        }
        setLoading(false);
    }
    useEffect(() => {
        async function rewShow() {
            setLoadAg(true);
            const _qur = query(reviewsRef, where("movies_id", "==", id));
            const _datas = await getDocs(_qur);
            setDatas([]);
            _datas.forEach(doc => {
                setDatas((prev) => [...prev, doc.data()])
            });
            setLoadAg(false);
        }
        rewShow();
    }, [dep]);
    console.log(datas);
    return (
        <div>
            <ReactStars size={28} edit={true} half={true} onChange={(val) => setReview(val)} value={review} />
            <input type='text' placeholder='Share Your thoughts...' className='w-full h-9 px-3  bg-gray-800 focus:bg-gray-700 text-sm outline-none ' value={thought} onChange={(e) => setThought(e.target.value)} />
            <div className='bg-green-600 flex justify-center items-center cursor-pointer w-full hover:bg-green-500 h-9 leading-8 text-center' onClick={addreview} >{loading ? <TailSpin height={27} color='white' /> : 'Share'}</div>
            {
                loadAg ?
                    <div className="mt-6 w-full flex justify-center"><ThreeDots height={15} color='white' /></div>
                    :
                    datas.map(data => {
                        return (
                            <div className='py-1  px-2 w-full mt-2 bg-gray-800 bg-opacity-50 text-sm'>
                                <p>
                                    <span className='text-blue-900 font-bold'>{data.name}</span>
                                    <span className='ml-3 text-xs'>({new Date(data.timestamp).toLocaleString()})</span></p>
                                <p>
                                    <ReactStars size={14} edit={false} half={true} value={data.review} /></p>
                                <p >{data.thought}</p>
                            </div>
                            )
                    })

            }


        </div>
    )
}

export default Review;