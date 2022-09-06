import { Routes,Route } from 'react-router-dom';
import Header from './Header.js';
import MainSearchPage from './MainSearchPage.js'
import ToListenList from './ToListenList.js';
import Footer from'./Footer.js';

function App() {
  

  return (
    <div className="App"> 
      <Routes>
        <Route path="/" element={<Header />}/>
        <Route path="/main" element={<MainSearchPage />}/>
        <Route path="/List" element={<ToListenList  />}/>    
      </Routes>
      <Footer /> 
    </div> 
  );
}

export default App;
