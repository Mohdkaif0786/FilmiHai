import React,{useState} from 'react'
import swal from 'sweetalert';
import  bcrypt from "bcryptjs";
import { Link,useNavigate} from 'react-router-dom';
import { TailSpin } from 'react-loader-spinner';
import { query, where, getDoc, getDocs } from 'firebase/firestore';
import { usersRef } from './firebase/firebase';
import { Appstate } from '../App';
import { useContext } from 'react';

// setAddData({...addData,password:e.target.value})
const Login = () => {
  const context=useContext(Appstate);
  const navigator=useNavigate();
  console.log(context);
  const [loading, setLoading] = useState(false);
  const [addData,setAddData]=useState({
    mobile:"",
    password:""
  });
  const login= async()=>{
    //  setLoading(true);
      try{
        const _qur=query(usersRef,where("mobile","==",addData.mobile));
        const _qurSnapshot=await getDocs(_qur);
        _qurSnapshot.forEach((doc)=>{
          const _data=doc.data();
          console.log(_data);
          const isUser=bcrypt.compareSync(addData.password,_data.password);
            if(isUser){
              swal({
                text:"suceesfull  login",
                icon:"success",
                button:false,
                timer:3000
              });
              
            context.setLogin(true);
            context.setUserName(_data.user);
            navigator("/");
            }
            else{
              swal({
                text:"please check ",
                icon:"error",
                button:false,
                timer:3000
              });
            }
        })
      }
      catch(err){
        alert(err);
      }
    }
    console.log(context);
  return (
    <section class="text-gray-400 bg-black body-font relative">
    <div class="container px-5 py-5 mx-auto">
      <div class="flex flex-col text-center w-full mb-2">
        <h1 class=" text-xl font-medium title-font mb-2 text-white">Login</h1>
      </div>
      <div class="lg:w-2/5 w-full md:w-2/4 mx-auto">
        <div class="flex flex-wrap -m-2">
          <div class="p-2 w-full">
            <div class="relative">
              <label for="name" class="leading-7 text-sm text-white">Mobile No.</label>
            </div>
            <input type="number"  name="mobile" class="w-full bg-white  rounded border border-gray-700 focus:border-indigo-500  focus:ring-2 focus:ring-indigo-900 text-base outline-none text-black py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" onChange={(e) =>setAddData({...addData,mobile:e.target.value})} />
          </div>
          <div class="p-2 w-full">
            <div class="relative">
              <label for="email" class="leading-7 text-sm text-white">Password</label>
            </div>
            <input type="text"  name="password"   class="w-full bg-white  rounded border border-gray-700 focus:border-indigo-500  focus:ring-2 focus:ring-indigo-900 text-base outline-none text-black py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" onChange={(e) =>setAddData({...addData,password:e.target.value})} />
          </div>
          <div class="p-2 w-full text-sm">
            <button class="flex mx-auto text-gray-200 bg-green-600 border-0 py-1.5 px-6 focus:outline-none hover:bg-green-700 hover:text-white rounded text-lg" onClick={login} >{loading ? <TailSpin height={26} color='white' /> : "Login"}</button>
          </div>
          <div className='flex justify-center items-center w-full text-sm'>
            <h1 >Do not have account?</h1>
            <Link className='ml-1 text-blue-500' to={"/signup"}>Sign Up</Link>
          </div>
        </div>
      </div>
    </div>
  </section>
  )
}

export default Login;