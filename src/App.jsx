import './App.css'
import { Route, Routes } from 'react-router-dom'
import Home from './components/Home/index'
import Admin from './components/Admin/index'
import Student from './components/Student/index'
import ContactUs from './components/Common-pages/ContactUs/ContactUs'
import About from './components/Common-pages/About/About'
import Error_404 from './components/Common-pages/Error-404/err'
import Error_500 from './components/Common-pages/Error-500/err'

function App() {
     return (
          <>
               <Routes>
                    <Route path='/' element={<Home/>} />
                    <Route path='/Home' element={<Home/>} />
                    <Route path='/Admin' element={<Admin/>} />
                    <Route path='/Student' element={<Student/>} />
                    <Route path='/ContactUs' element={<ContactUs/>} />
                    <Route path='/About' element={<About/>} />
                    <Route path='/Error_404' element={<Error_404/>} />
                    <Route path='/Error_500' element={<Error_500/>} />
               </Routes>
          </>
     );
}

export default App
