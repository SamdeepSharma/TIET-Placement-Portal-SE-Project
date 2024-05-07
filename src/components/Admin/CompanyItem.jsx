/* eslint-disable react/prop-types */

const CompanyItem = (props) => {
     const { company, delCompany } = props;

     return (
          <div>
               <div className="card w-100 mb-3">
                    <div className="card-body">
                         <h5 className="card-title">{company.companyName}</h5>
                         <p className="card-text">{company.type}</p>
                         <em className="mx-1 small">forms open till: {company.closingDate}</em>
                         <i className="fa-solid fa-trash mx-2 cursor-pointer" onClick={()=>{ delCompany(company) }}></i>
                    </div>
               </div>
          </div>
     )
}

export default CompanyItem