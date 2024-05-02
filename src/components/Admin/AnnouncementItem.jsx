/* eslint-disable react/prop-types */
import AnnounceContext from "../../context/announcements/AnnounceContext"
import { useContext, useRef } from "react"
import { toast } from "react-toastify"

const AnnouncementItem = (props) => {
     const ref = useRef(null);
     const openRef = useRef(null);
     const context = useContext(AnnounceContext)
     const { deleteAnnouncement } = context
     const { announcement, updateAnnouncement } = props;

     const confirmDelete = (e) =>{
          e.preventDefault();
          openRef.current.click()
     }

     const handleDelete = () => {
          deleteAnnouncement(announcement._id)
          ref.current.click()
          toast('🗑️ Announcement Deleted!', {
               position: "top-center",
               autoClose: 3000,
               hideProgressBar: false,
               closeOnClick: true,
               pauseOnHover: true,
               draggable: true,
               progress: undefined,
               theme: "light",
               });
     }

     return (
          <div>
               <div className="modal fade" id="staticBackdrop2" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                    <div className="modal-dialog">
                         <div className="modal-content">
                              <div className="modal-header">
                                   <h1 className="modal-title fs-5" id="staticBackdropLabel">Do you really want to delete this announcement?</h1>
                                   <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                              </div>
                              <div className="d-flex justify-content-center my-3">
                                   <button type="button" className="btn btn-secondary mx-2" data-bs-dismiss="modal" ref={ref}>No</button>
                                   <button type="button" className="btn btn-primary mx-2" onClick={handleDelete}>Yes, Delete</button>
                              </div>
                         </div>
                    </div>
               </div>
               <button type="button" ref={openRef} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#staticBackdrop2">
                    Launch static backdrop modal
               </button>
               <div className="card w-100 mb-3">
                    <div className="card-body">
                         <h5 className="card-title">{announcement.title}</h5>
                         <p className="card-text">{announcement.description}</p>
                         <i className="fa-solid fa-trash mx-2 cursor-pointer" onClick={confirmDelete}></i>
                         <i className="fa-solid fa-pen-to-square mx-2 cursor-pointer" onClick={() => { updateAnnouncement(announcement) }}></i>
                    </div>
               </div>
          </div>
     )
}

export default AnnouncementItem
