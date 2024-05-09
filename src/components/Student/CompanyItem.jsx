/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */


const CompanyItem = (props) => {
     const { company, addApp } = props;

     return (
          <div className="w-50 m-1">
               <div className="card w-100 mb-3">
                    <div className="d-flex justify-align-align-content-xl-between">
                         <div className="card-body d-flex">
                              <div className="my-1 mx-4"><svg xmlns="http://www.w3.org/2000/svg" height="52" width="52" viewBox="0 0 512 512"><path d="M184 48H328c4.4 0 8 3.6 8 8V96H176V56c0-4.4 3.6-8 8-8zm-56 8V96H64C28.7 96 0 124.7 0 160v96H192 320 512V160c0-35.3-28.7-64-64-64H384V56c0-30.9-25.1-56-56-56H184c-30.9 0-56 25.1-56 56zM512 288H320v32c0 17.7-14.3 32-32 32H224c-17.7 0-32-14.3-32-32V288H0V416c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V288z" /></svg></div>
                              <div>
                                   <h5 className="card-title">{company.companyName}</h5>
                                   <p className="card-text">offering: {company.type}</p>
                                   <p className="card-text">forms open till: {company.closingDate.slice(0, 10)}</p>
                              </div>
                         </div>
                         <div className="card-body">
                              <h5 className="card-title">Batch: {company.batch}</h5>
                              <p className="card-text">Required GPA: {company.requiredGPA}</p>
                              <button className="btn btn-primary" onClick={() => { addApp(company) }}>Apply</button>
                         </div>
                    </div>
               </div>
               {/* <div className="card w-100 mb-3">
                    <div className="d-flex justify-align-align-content-xl-between align-align-items-center">
                         <div className="card-body d-flex">
                              <div className="my-1 mx-4">
                                   <svg xmlns="http://www.w3.org/2000/svg" height="52" width="52" viewBox="0 0 512 512"><path d="M184 48H328c4.4 0 8 3.6 8 8V96H176V56c0-4.4 3.6-8 8-8zm-56 8V96H64C28.7 96 0 124.7 0 160v96H192 320 512V160c0-35.3-28.7-64-64-64H384V56c0-30.9-25.1-56-56-56H184c-30.9 0-56 25.1-56 56zM512 288H320v32c0 17.7-14.3 32-32 32H224c-17.7 0-32-14.3-32-32V288H0V416c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V288z" /></svg>
                              </div>
                              <div className="card-body">
                              <h5 className="card-title">{company.companyName}</h5>
                              <p className="card-text">{company.type}</p>
                              <em className="mx-1 small">forms open till: {company.closingDate.slice(0, 10)}</em>
                              </div>
                         </div>
                         <div className="card-body d-flex align-items-center justify-content-center">
                              <button className="btn btn-primary" disabled={!checkit.success} onClick={() => { addApp(company) }}>{checkit.success ? <span>Apply</span> : <span>Applied</span>}</button>
                         </div>
                    </div>
               </div> */}
          </div >
     )
}

export default CompanyItem