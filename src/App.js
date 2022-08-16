import { Routes,Route } from 'react-router-dom';
import Header from './Header.js';
import MainSearchPage from './MainSearchPage.js'
import ToListenList from './ToListenList.js';
import Footer from'./Footer.js';

function App() {
  

  return (
    <div className="App">
      
      <Header />
        
      <main id='main'>
        <Routes>
          <Route path="/" element={<MainSearchPage />}/>
          <Route path="/List" element={<ToListenList  />}/>
        </Routes>
      </main>

      
      
      <Footer />
    </div>
    
  );
}

export default App;
