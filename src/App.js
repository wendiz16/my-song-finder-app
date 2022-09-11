import { Routes,Route } from 'react-router-dom';
import Header from './Header.js';
import Login from './Login.js';
import MainSearchPage from './MainSearchPage.js'
import ToListenList from './ToListenList.js';

import {useState} from "react";
// import {signOut} from "firebase/auth";
function App() {
  const  [isAuth, setIsAuth] = useState(localStorage.getItem("isAuth"));
  return (
    <div className="App"> 
      <Routes>
        <Route path="/" element={<Header setIsAuth={setIsAuth} />}/>
        <Route path="/Login" element={<Login setIsAuth={setIsAuth}/>}/>
        <Route path="/Search" element={<MainSearchPage setIsAuth={setIsAuth} isAuth={isAuth}/>}/>
        <Route path="/Library" element={<ToListenList setIsAuth={setIsAuth} />}/>    
      </Routes>
    </div> 
  );
}

export default App;
