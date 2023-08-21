import { BrowserRouter, Route, Routes,  } from 'react-router-dom';
import './App.css';
import Signin from "./pages/Signin"
import Homepage from './Homepage';
import SearchResults from './pages/SearchResults';
import Signup from './pages/Signup';

function App() {
  return (
       <BrowserRouter>
      <Routes>
        <Route path='/' element={<Signin/>} />
        <Route path='/signup' element={<Signup />} />
        <Route path="/homepage" >
          <Route index element={<Homepage/>} />
        </Route>
        <Route path='/SearchResults' element={<SearchResults />} />
        <Route path='*' element={<h1>404</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
