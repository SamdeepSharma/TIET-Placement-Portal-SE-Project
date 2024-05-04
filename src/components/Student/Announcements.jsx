/* eslint-disable react/jsx-key */
/* eslint-disable react/jsx-no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useContext } from "react"
import {useNavigate} from 'react-router-dom'
import AnnouncementItem from "./AnnouncementItem";
import AnnounceContext from "../../context/announcements/AnnounceContext"

const Announcements = () => {
  const navigate = useNavigate();
  const context = useContext(AnnounceContext)
  const { announcements, fetchAnnouncements } = context;
  
  useEffect(() => {
    if(localStorage.getItem('token')){
    fetchAnnouncements()}
    else{
      navigate('/login')
    }
  }, [])

  return (
    <div className="py-2">
      <div className="d-flex justify-content-center">
      <h2 className="my-4">All Announcements</h2>
      </div>
          {announcements.length === 0 && <h6 className="py-2">No announcements to display!</h6>}
      <div className="row g-1 overflow-auto m-2 d-flex justify-content-center" style={{maxHeight: '70vh', minHeight: '60vh'}}>
        { announcements.map((announcement) => {
          return <AnnouncementItem key={announcement._id} announcement={announcement} />
        })}
      </div>
    </div>
  )
}

export default Announcements