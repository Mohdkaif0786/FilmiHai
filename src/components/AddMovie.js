import React from 'react'
import { useState} from 'react'
import './AddMovie.css';
import { useNavigate} from 'react-router-dom';
import { TailSpin } from 'react-loader-spinner';
import { addDoc } from 'firebase/firestore';
import { moviesRef } from './firebase/firebase';
import { Appstate } from '../App';
import { useContext } from 'react';
import swal from 'sweetalert';

const AddMovie = () => {

  console.log(moviesRef)
  let initial = {
    name: "",
    year: "",
    description: "",
    image: "",
    rating:0,
    rated:0
  }
  const userContext=useContext(Appstate);
  const navigator=useNavigate();
  const [addMovie, setAddMovie] = useState(initial);
  const [loading, setLoading] = useState(false);
  const movieAdd = async () => {
    setLoading(true);
    try {
      if(userContext.login){
      await addDoc(moviesRef, addMovie);
      setAddMovie(initial);
      swal({
        title: "Successfull Added",
        icon: "success",
        button: false,
        timer: 3000
      })}
      else{
          navigator("/login");
      }
    }
    catch (err) {
      swal({
        title: err,
        icon: "error",
        button: false,
        timer: 3000
      })
    }
    setLoading(false);
  }

  return (
    <section class="text-gray-400 bg-black body-font relative">
      <div class="container px-5 py-8 mx-auto">
        <div class="flex flex-col text-center w-full mb-12">
          <h1 class="sm:text-3xl text-2xl font-medium title-font mb-2 text-white">Add New Movie</h1>
        </div>
        <div class="lg:w-1/2 md:w-2/3 mx-auto">
          <div class="flex flex-wrap -m-2">
            <div class="p-2 w-1/2">
              <div class="relative">
                <label for="name" class="leading-7 text-sm text-white">Name</label>
              </div>
              <input type="text" id="name" name="name" value={addMovie.name} class="w-full bg-white  rounded border border-gray-700 focus:border-indigo-500  focus:ring-2 focus:ring-indigo-900 text-base outline-none text-black py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" onChange={(e) => setAddMovie({ ...addMovie, name: e.target.value })} />
            </div>
            <div class="p-2 w-1/2">
              <div class="relative">
                <label for="email" class="leading-7 text-sm text-white">Year</label>
              </div>
              <input type="text" id="year" name="year" value={addMovie.year} class="w-full bg-white  rounded border border-gray-700 focus:border-indigo-500  focus:ring-2 focus:ring-indigo-900 text-base outline-none text-black py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" onChange={(e) => setAddMovie({ ...addMovie, year: e.target.value })} />
            </div>
            <div class="relative p-2 w-full">
              <label for="image" class="leading-7 text-sm text-white">Image Link</label>
              <input type="text" id="image" name="image" value={addMovie.image} class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-900 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" onChange={(e) => setAddMovie({ ...addMovie, image: e.target.value })} />
            </div>
            <div class="p-2 w-full">
              <div class="relative">
                <label for="message" class="leading-7 text-sm text-white">Description</label>
                <textarea id="description" name="description" value={addMovie.description} class="w-full bg-white  rounded border border-gray-700 focus:border-indigo-500  focus:ring-2 focus:ring-indigo-900 h-32 text-base outline-none text-black py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out" onChange={(e) => setAddMovie({ ...addMovie, description: e.target.value })}></textarea>
              </div>
            </div>
            <div class="p-2 w-full">
              <button class="flex mx-auto text-gray-200 bg-green-700 border-0 py-2 px-8 focus:outline-none hover:bg-green-600 hover:text-white rounded text-lg" onClick={movieAdd}>{loading ? <TailSpin height={32} color='white' /> : "Submit"}</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// try {
//   setLoading(true)
//   await addDoc(moviesRef, addMovie);
//   swal({
//     title: "Successfull Added",
//     icon: "success",
//     button: false,
//     timer: 3000
//   })
//   setLoading(false);
// }
// catch(err){
//   swal({
//     title:err ,
//     icon: "error",
//     button: false,
//     timer: 3000
//   })
// }



export default AddMovie