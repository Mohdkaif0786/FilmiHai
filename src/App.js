import { Routes, Route } from 'react-router';
import './App.css';
import Header from './components/header';
import Cards from './components/cards';
import AddMovie from './components/AddMovie';
import Detail from './components/detail';
import { createContext,useState } from 'react';
import Login from './components/login';
import SignUp from './components/signUp';
export const Appstate=createContext();

function App() {
const [userName,setUserName]=useState("");
const [login,setLogin]=useState(false);
  return (
    <Appstate.Provider value={{userName,setUserName,login,setLogin}}>
    <div className="App relative"> 
      <Header />
      <Routes>
        <Route path='/' element={<Cards/>}/>
        <Route path='/addMovie' element={<AddMovie/>}/>
        <Route path="/detail/:id" element={<Detail/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<SignUp/>}/>
      </Routes>
    </div>
    </Appstate.Provider>
  );
}
export default App;
