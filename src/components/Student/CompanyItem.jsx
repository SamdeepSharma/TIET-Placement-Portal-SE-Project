/* eslint-disable react/prop-types */

const CompanyItem = (props) => {
     const { company, addApp } = props;

     return (
          <div className="w-75">
               <div className="card w-100 mb-3">
                    <div className="d-flex card-body justify-space-between">
                         <div>
                              <h5 className="card-title">{company.companyName}</h5>
                              <p className="card-text">{company.type}</p>
                              <em className="mx-1 small">forms open till: {company.closingDate}</em>
                         </div>
                         <div>
                              <button className="btn btn-primary" onClick={() => { addApp(company) }}>Apply</button>
                         </div>
                    </div>
               </div>
          </div>
     )
}

export default CompanyItem