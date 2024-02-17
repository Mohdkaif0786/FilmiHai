import React, { useState } from 'react';
import swal from 'sweetalert';
import { Link,useNavigate} from 'react-router-dom';
import { addDoc } from 'firebase/firestore';
import { usersRef } from './firebase/firebase';
import  bcrypt from "bcryptjs";
import {RecaptchaVerifier,signInWithPhoneNumber,getAuth} from 'firebase/auth'
import { TailSpin } from 'react-loader-spinner';
import app from './firebase/firebase';
const initial = {
  user: "",
  mobile:"",
  password: ""
}
const auth=getAuth(app);
const SignUp = () => {
  const navigator=useNavigate();
  const [loading, setLoading] = useState(false);
  const [addData, setAddData] = useState(initial);
  const [otpSendt, setOtpSendt] = useState(false);
  const [OTP,setOTP]=useState("");   
 
  const genReCaptcha=()=>{
    window.recaptchaVerifier = new RecaptchaVerifier('sign-in-button', {
      'size': 'invisible',
      'callback': (response) => {
        // reCAPTCHA solved, allow signInWithPhoneNumber.
        
      }
    }, auth);
  }
 const requestOTP=()=>{
    setLoading(true)
    genReCaptcha();
  let appVerifier=window.recaptchaVerifier;
  signInWithPhoneNumber(auth,`+91${addData.mobile}`,appVerifier)
  .then(confirmationResult=>{
    window.confirmationResult=confirmationResult;
    swal({
      text:"OTP Sent",
      icon:"success",
      button:false,
      timer:3000
    });
    setOtpSendt(true);
    setLoading(false);
     console.log(addData);
  }).catch(error=>{
    swal({
      text:error,
      icon:"error",
      button:false,
      timer:3000,
    })
  });
 }

 const VerifyOTP=()=>{
  setLoading(true);
  try{
    window.confirmationResult.confirm(OTP).then((result)=>{
      uploadData();
      swal({
        title:"suceesfull",
        icon:"success",
        button:false,
        timer:3000
      });
    })
    navigator("/login");
  }
  catch(err){
    swal({
      title:err,
      icon:"error",
      button:false,
      timer:3000
    })
  }
  setLoading(false);
 }
 
 const uploadData= async ()=>{
  try{
    const salt=bcrypt.genSaltSync(10);
    let hash=bcrypt.hashSync(addData.password,salt);
    await addDoc(usersRef,{
      user:addData.user,
      password:hash,
      mobile:addData.mobile
    });
  }
  catch(err){
      alert(err);
  }
 }
  return (
    <section class="text-gray-400 bg-black body-font relative">
      <div class="container px-5 py-5 mx-auto">
        <div class="flex flex-col text-center w-full mb-2">
          <h1 class=" text-xl font-medium title-font mb-2 text-white">Sign Up</h1>
        </div>
        <div class="lg:w-2/5 w-full md:w-2/4 mx-auto">
          <div class="flex flex-wrap -m-2">
            {
            otpSendt ?
              <>
                <div class="p-2 w-full">
                  <div class="relative">
                    <label for="name" class="leading-7 text-sm text-white">OTP</label>
                  </div>
                  <input  value={OTP} class="w-full bg-white  rounded border border-gray-700 focus:border-indigo-500  focus:ring-2 focus:ring-indigo-900 text-base outline-none text-black py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" onChange={(e) => setOTP(e.target.value)} />
                </div>
                <div class="p-2 w-full">
                  <button class="flex mx-auto text-gray-200 bg-green-600 border-0 py-1.5 px-4 focus:outline-none hover:bg-green-700 hover:text-white rounded text-lg"  onClick={VerifyOTP}>{loading ? <TailSpin height={28} color='white' /> : "Confirm OTP"}</button>
                </div>
              </> 
              :
              <>
                <div class="p-2 w-full">
                  <div class="relative">
                    <label for="name" class="leading-7 text-sm text-white">Name</label>
                  </div>
                  <input type="text" id="name" name="name" class="w-full bg-white  rounded border border-gray-700 focus:border-indigo-500  focus:ring-2 focus:ring-indigo-900 text-base outline-none text-black py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" onChange={(e) => setAddData({ ...addData, user: e.target.value })} />
                </div>
                <div class="p-2 w-full">
                  <div class="relative">
                    <label for="name" class="leading-7 text-sm text-white">Mobile No.</label>
                  </div>
                  <input type="number" name="mobile" class="w-full bg-white  rounded border border-gray-700 focus:border-indigo-500  focus:ring-2 focus:ring-indigo-900 text-base outline-none text-black py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" onChange={(e) => setAddData({ ...addData, mobile: e.target.value })} />
                </div>
                <div class="p-2 w-full">
                  <div class="relative">
                    <label for="email" class="leading-7 text-sm text-white">Password</label>
                  </div>
                  <input type="text" name="password" class="w-full bg-white  rounded border border-gray-700 focus:border-indigo-500  focus:ring-2 focus:ring-indigo-900 text-base outline-none text-black py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" onChange={(e) => setAddData({ ...addData, password: e.target.value })} />
                </div>

                <div class="p-2 w-full">
                  <button onClick={requestOTP} class="flex mx-auto text-gray-200 bg-green-600 border-0 py-1.5 px-4 focus:outline-none hover:bg-green-700 hover:text-white rounded text-lg" >{loading ? <TailSpin height={28} color='white' /> : "Request OTP"}</button>
                </div>
              </>
            }
            <div className='flex justify-center items-center w-full text-sm'>
              <h1 >Already have an account?</h1>
              <Link className='ml-1 text-blue-500' to={"/login"}>Login</Link>
            </div>
            <div id="sign-in-button"></div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default SignUp;