import { Routes,Route } from 'react-router-dom';
import Header from './Header.js';
import MainSearchPage from './MainSearchPage.js'
import ToListenList from './ToListenList.js';

function App() {
  

  return (
    <div className="App"> 
      <Routes>
        <Route path="/" element={<Header />}/>
        <Route path="/main" element={<MainSearchPage />}/>
        <Route path="/List" element={<ToListenList  />}/>    
      </Routes>
    </div> 
  );
}

export default App;
