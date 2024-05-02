/* eslint-disable react/jsx-key */
/* eslint-disable react/jsx-no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useRef, useState } from "react"
import {useNavigate} from 'react-router-dom'
import AnnouncementItem from "./AnnouncementItem";
import AnnounceContext from "../../context/announcements/AnnounceContext"
import { toast } from 'react-toastify';

const Announcements = () => {
  const navigate = useNavigate();
  const context = useContext(AnnounceContext)
  const { announcements, fetchAnnouncements, editAnnouncement, addAnnouncement } = context;
  useEffect(() => {
    if(localStorage.getItem('token')){
    fetchAnnouncements()
    }
    else{
      navigate('/login')
    }
  }, [])

  const [announcement, setAnnouncement] = useState({eid:"", etitle: "", edescription: "" })
  const ref = useRef(null)
  const refadd = useRef(null)
  const refClose = useRef(null)

  const updateAnnouncement = (currentAnnouncement) => {
    ref.current.click()
    setAnnouncement({eid: currentAnnouncement._id, etitle: currentAnnouncement.title, edescription: currentAnnouncement.description})
  }

  const adddAnnouncement = () => {
    refadd.current.click()
    // setAnnouncement({eid: '', etitle: currentAnnouncement.title, edescription: currentAnnouncement.description})
  }

  const handleChange = (e) => {
    setAnnouncement({ ...announcement, [e.target.name]: e.target.value })
  }

  const handleClick = (e) => {
    e.preventDefault()
    if(announcement.etitle.trim().length <3){
      toast.warn('Title must be atleast 3 characters!', {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        });
    return;
  }
    if(announcement.edescription.trim().length <5){
      toast.warn('Description must be atleast 5 characters!', {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        });
    return;
  }

    editAnnouncement(announcement.eid, announcement.etitle, announcement.edescription)
    toast('🌸 Announcement Updated!', {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      });
    refClose.current.click()
}

  return (
    <div className="py-2">
      <button type="button" ref={ref} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
        Launch static backdrop modal
      </button>

      <button type="button" ref={refadd} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
        Launch static backdrop modal
      </button>

      <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">

        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="staticBackdropLabel">Edit Announcement</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form className="py-3">
                <div className="mb-3">
                  <label htmlFor="etitle" className="form-label">Title</label>
                  <input type="text" className="form-control w-100" aria-describedby="textHelp" name="etitle" id="etitle" placeholder="Enter title..." value={announcement.etitle} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                  <label htmlFor="edesc" className="form-label">Description</label>
                  <input type="text" className="form-control w-100" name="edescription" id="edesc" value={announcement.edescription} placeholder="Enter description..." onChange={handleChange} required/>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" ref={refClose}>Cancel</button>
              <button type="button" className="btn btn-primary" onClick={handleClick}>Update Announcement</button>
            </div>
          </div>
        </div>
      </div>
      <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">

        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="staticBackdropLabel">Edit Announcement</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form className="py-3">
                <div className="mb-3">
                  <label htmlFor="etitle" className="form-label">Title</label>
                  <input type="text" className="form-control w-100" aria-describedby="textHelp" name="etitle" id="etitle" placeholder="Enter title..." value={announcement.etitle} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                  <label htmlFor="edesc" className="form-label">Description</label>
                  <input type="text" className="form-control w-100" name="edescription" id="edesc" value={announcement.edescription} placeholder="Enter description..." onChange={handleChange} required/>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" ref={refClose}>Cancel</button>
              <button type="button" className="btn btn-primary" onClick={handleClick}>Update Announcement</button>
            </div>
          </div>
        </div>
      </div>
      <div className="d-flex justify-content-center align-items-center gap-3">
      <h2 className="my-4">All Announcements</h2> <i className="fa-solid fa-circle-plus fa-2xl cursor-pointer" onClick={adddAnnouncement}></i> </div>
          {announcements.length === 0 && <h6 className="py-2">No announcements to display!</h6>}
      <div className="row g-1">
        {announcements.map((announcement) => {
          return <AnnouncementItem key={announcement._id} updateAnnouncement={updateAnnouncement} announcement={announcement} />
        })}
      </div>
    </div>
  )
}

export default Announcements