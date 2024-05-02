import './App.css'
import { Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar';
import Notfound from './components/Notfound';
import About from './components/About';
import Contact from './components/Contact';
import Home from './components/Home';
import Login from './components/Login';
import ACompanies from './components/Admin/Companies';
import SCompanies from './components/Student/Companies';
import AAnnouncements from './components/Admin/Announcements';
import SAnnouncements from './components/Student/Announcements';
import AApplications from './components/Admin/Applications';
import SApplications from './components/Student/Applications';
import AStudents from './components/Admin/Students';
import AnnounceState from './context/announcements/AnnounceState'

function App() {
     return (
          <>
               <AnnounceState>
                    <Navbar />
                    <div className='container'>
                         <Routes>
                              <Route path='/' element={<Home />} />
                              <Route path='/login' element={<Login />} />
                              <Route path='/contact-us' element={<Contact />} />
                              <Route path='/about' element={<About />} />
                              {
                                   localStorage.getItem('token') && localStorage.getItem('user') === 'student' &&
                                   <>
                                        <Route path='/student/announcements' element={<SAnnouncements />} />
                                        <Route path='/student/applications' element={<SApplications />} />
                                        <Route path='/student/companies' element={<SCompanies />} />
                                   </>
                              }
                              {
                                   localStorage.getItem('token') && localStorage.getItem('user') === 'admin' &&
                                   <>
                                        <Route path='/admin/announcements' element={<AAnnouncements />} />
                                        <Route path='/admin/applications' element={<AApplications />} />
                                        <Route path='/admin/companies' element={<ACompanies />} />
                                        <Route path='/admin/students' element={<AStudents />} />
                                   </>
                              }
                              <Route path='*' element={<Notfound />} />
                         </Routes>
                    </div>
               </AnnounceState>
          </>
     );
}

export default App
