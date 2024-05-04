/* eslint-disable react/jsx-key */
/* eslint-disable react/jsx-no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useContext } from "react"
import {useNavigate} from 'react-router-dom'
import StudentItem from "./StudentItem";
import AnnounceContext from "../../context/announcements/AnnounceContext"

const Students = () => {
  const navigate = useNavigate();
  const context = useContext(AnnounceContext)
  const { students, fetchStudents } = context;

  useEffect(() => {
    if(localStorage.getItem('token') && localStorage.getItem('user') === 'admin'){
    fetchStudents()}
    else{
      navigate('/login')
    }
  }, [])

  return (
    <div className="py-2">
      <div className="d-flex justify-content-center align-items-center">
      <h2 className="my-4">Students list</h2>
      </div>
          {students.length === 0 && <h6 className="py-2">No students enrolled!</h6>}
      <div className="row g-1 d-flex justify-content-center overflow-auto m-2" style={{maxHeight: '70vh', minHeight: '60vh'}}>
        { students.map((student) => {
          return <StudentItem key={student._id} student={student} />
        })}
      </div>
    </div>
  )
}

export default Students