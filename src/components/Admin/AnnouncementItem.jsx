/* eslint-disable react/prop-types */

const AnnouncementItem = (props) => {
     const { announcement, updateAnnouncement, delAnnouncement } = props;

     return (
          <div>
               <div className="card w-100 mb-3">
                    <div className="card-body">
                         <h5 className="card-title">{announcement.title}</h5>
                         <p className="card-text">{announcement.description}</p>
                         <i className="fa-solid fa-trash mx-2 cursor-pointer" onClick={()=>{ delAnnouncement(announcement) }}></i>
                         <i className="fa-solid fa-pen-to-square mx-2 cursor-pointer" onClick={() => { updateAnnouncement(announcement) }}></i>
                    </div>
               </div>
          </div>
     )
}

export default AnnouncementItem