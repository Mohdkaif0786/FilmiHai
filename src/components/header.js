import React,{useContext} from 'react'
import AddIcon from '@mui/icons-material/Add';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { Appstate } from '../App';
const Header = () => {
    const appstate=useContext(Appstate);
    return (
        <div className='header sticky top-0 bg-slate-900 z-50'>
            <div className='text-3xl  text-red-500 font-bold p-3 border-b-2 border-gray-500 flex item-center justify-between'>
                <Link to={"/"}><span>Filmy<span className='text-white'>Verse</span></span></Link>

                {appstate.login ?
                    <Link to={"/addMovie"}>
                        <h1 className='text-xl text-center font-bold text-white flex item-center cursor-pointer'> 
                        <Button><AddIcon className='mr-1' color="secondary" />ADD NEW </Button>
                        </h1>
                    </Link> :

                    <Link to={"/login"}>
                            <h1 className='text-sm text-center w-20 py-2 bg-green-600  text-white  cursor-pointer'>Login</h1>
                    </Link>
                }

            </div>
        </div>
    )
}

export default Header;