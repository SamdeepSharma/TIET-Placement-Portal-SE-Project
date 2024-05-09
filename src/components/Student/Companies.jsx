/* eslint-disable react/jsx-key */
/* eslint-disable react/jsx-no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState, useRef } from "react"
import { useNavigate } from 'react-router-dom'
import CompanyItem from "./CompanyItem";
import JobAppContext from "../../context/applications/JobAppContext"
import { toast } from 'react-toastify';

const Companies = () => {
  const navigate = useNavigate();
  const context = useContext(JobAppContext)
  const { companies, fetchCompanies, submitApp, student, fetchStudent} = context;
  const [filterComp, setfilterComp] = useState([])
  useEffect(() => {
    if (localStorage.getItem('token')) {
      fetchCompanies()
      fetchStudent()
      const filtered = companies.filter(company => {
        if(company.requiredGPA <= parseFloat(student.gpa) && company.batch == parseInt(student.year) && new Date(company.closingDate) >= Date.now())
          return company
    });
      setfilterComp(filtered)
    }
    else {
      navigate('/login')
    }
  }, [])

  const [current, setCurrent] = useState({ did: ""})
  const refadd = useRef(null);
  const openRef = useRef(null);

  const addApp = (currentComp) =>{
    setCurrent({did: currentComp._id})
    openRef.current.click()
}

const handleApp = () => {
  submitApp(current.did)
  refadd.current.click()
  toast.success(' Applied Successfully!', {
       position: "top-center",
       autoClose: 3000,
       hideProgressBar: false,
       closeOnClick: true,
       pauseOnHover: true,
       draggable: true,
       progress: undefined,
       theme: "light",
       });
       navigate('/student/applications')
}

  return (
    <div className="py-2">
            <div className="modal fade" id="staticBackdrop2" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="staticBackdropLabel2">Do you really want to apply? This change cannot be reverted.</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="d-flex justify-content-center my-3">
              <button type="button" className="btn btn-secondary mx-2" data-bs-dismiss="modal" ref={refadd}>No</button>
              <button type="button" className="btn btn-primary mx-2" onClick={handleApp} >Yes, Apply</button>
            </div>
          </div>
        </div>
      </div>
      <button type="button" ref={openRef} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#staticBackdrop2">
        Launch static backdrop modal
      </button>
      <div className="gap-3">
        <h2 className="d-flex justify-content-center my-4">Eligible Companies</h2>
      {companies.length === 0 && <h6 className="py-2">No companies hiring right now! Visit again after some time.</h6>}
      <div className="row g-1 d-flex justify-content-center overflow-auto m-2" style={{maxHeight: '70vh', minHeight: '60vh'}}>
        {filterComp.map((company) => {
          return <CompanyItem key={company._id} company={company} addApp={addApp}/>
        })}
      </div>
    </div>
    </div>
  )
}

export default Companies