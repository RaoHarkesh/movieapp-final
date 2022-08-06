import Navbar from './components/Navbar';
import './App.css';
import Banner from './components/Banner';
import Movies from './components/Movies';
import Fav from './components/Fav';
import {BrowserRouter,Routes,Route,Router} from 'react-router-dom'
function App() {
  return (
    <BrowserRouter>
    <Navbar/>
    {/* <Banner/>
    <Movies/>
    <Fav/>  */}
    <Routes>
      <Route path='/' element={<><Banner/><Movies/></>}/>
      <Route path='/favourites' element={<Fav/>}/>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
