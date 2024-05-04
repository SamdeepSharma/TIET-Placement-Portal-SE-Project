/* eslint-disable react/prop-types */

const AnnouncementItem = (props) => {
     const { announcement } = props;

     return (
          <div>
               
               <div className="card w-100 mb-3">
                    <div className="card-body">
                         <h5 className="card-title">{announcement.title}</h5>
                         <p className="card-text">{announcement.description}</p>
                    </div>
               </div>
          </div>
     )
}

export default AnnouncementItem