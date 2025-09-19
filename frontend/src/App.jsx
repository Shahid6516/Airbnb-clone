import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Signup from './pages/Signup'
import Login from './pages/Login'
import ListingPage1 from './pages/ListingPage1'
import Listingpage2 from './pages/Listingpage2'

const App = () => {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/listingpage1' element={<ListingPage1 />} />
        <Route path='/listingpage2' element={<Listingpage2 />} />
      </Routes>
    </>
  )
}

export default App