/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */

const ApplicationItem = (props) => {
     const { application } = props;

     return (
          <div className="w-75 mx-1">
               <div className="card w-100 mb-3">
                    <div className="d-flex justify-align-align-content-xl-between">
                         <div className="card-body d-flex">
                              <div className="my-1 mx-4"><svg xmlns="http://www.w3.org/2000/svg" height="52" width="52" viewBox="0 0 448 512"><path d="M219.3 .5c3.1-.6 6.3-.6 9.4 0l200 40C439.9 42.7 448 52.6 448 64s-8.1 21.3-19.3 23.5L352 102.9V160c0 70.7-57.3 128-128 128s-128-57.3-128-128V102.9L48 93.3v65.1l15.7 78.4c.9 4.7-.3 9.6-3.3 13.3s-7.6 5.9-12.4 5.9H16c-4.8 0-9.3-2.1-12.4-5.9s-4.3-8.6-3.3-13.3L16 158.4V86.6C6.5 83.3 0 74.3 0 64C0 52.6 8.1 42.7 19.3 40.5l200-40zM111.9 327.7c10.5-3.4 21.8 .4 29.4 8.5l71 75.5c6.3 6.7 17 6.7 23.3 0l71-75.5c7.6-8.1 18.9-11.9 29.4-8.5C401 348.6 448 409.4 448 481.3c0 17-13.8 30.7-30.7 30.7H30.7C13.8 512 0 498.2 0 481.3c0-71.9 47-132.7 111.9-153.6z" /></svg></div>
                              <div>
                                   <h5 className="card-title">{application.userid}</h5>
                                   <p className="card-text">{application.username}</p>
                                   <p className="card-text">App id: {application.aid}</p>
                              </div>
                         </div>
                         <div className="card-body">
                              <h5 className="card-title">{application.companyname} ({application.type})</h5>
                              <p className="card-text">Status: {application.status}</p>
                              <p className="card-text">Apply Date: {application.applydate}</p>
                         </div>
                    </div>
               </div>
          </div>
     )
}

export default ApplicationItem