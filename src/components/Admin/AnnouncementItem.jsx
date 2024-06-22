/* eslint-disable react/prop-types */

const AnnouncementItem = (props) => {
     const { announcement, updateAnnouncement, delAnnouncement } = props;

     return (
          <div className="w-50 m-2">
               <div className="card w-100 mb-3">
                    <div className="card-body d-flex justify-align-align-content-xl-between gap-5">
                         <div>
                              <svg className="my-1 mx-5" xmlns="http://www.w3.org/2000/svg" height="52" width="52" viewBox="0 0 576 512"><path d="M0 80v48c0 17.7 14.3 32 32 32H48 96V80c0-26.5-21.5-48-48-48S0 53.5 0 80zM112 32c10 13.4 16 30 16 48V384c0 35.3 28.7 64 64 64s64-28.7 64-64v-5.3c0-32.4 26.3-58.7 58.7-58.7H480V128c0-53-43-96-96-96H112zM464 480c61.9 0 112-50.1 112-112c0-8.8-7.2-16-16-16H314.7c-14.7 0-26.7 11.9-26.7 26.7V384c0 53-43 96-96 96H368h96z" /></svg>
                              <div className="d-flex flex-column align-items-center">
                                   <em className="mx-1 small">posted: {announcement.date}</em>
                                   <div className="m-1">
                                   <i className="fa-solid fa-trash mx-2 cursor-pointer" onClick={() => { delAnnouncement(announcement) }}></i>
                                   <i className="fa-solid fa-pen-to-square mx-2 cursor-pointer" onClick={() => { updateAnnouncement(announcement) }}></i>
                              </div></div>
                         </div>
                         <div className="my-1">
                              <h5 className="card-title">{announcement.title}</h5>
                              <p className="card-text">{announcement.description}</p>
                         </div>
                    </div>
               </div>
          </div>
     )
}

export default AnnouncementItem