/* eslint-disable react/jsx-key */
/* eslint-disable react/jsx-no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useRef, useState } from "react"
import { useNavigate } from 'react-router-dom'
import CompanyItem from "./CompanyItem";
import JobAppContext from "../../context/applications/JobAppContext"
import { toast } from 'react-toastify';

const Companies = () => {
  const navigate = useNavigate();
  const context = useContext(JobAppContext)
  const { companies, fetchCompanies, addCompany, deleteCompany } = context;
  useEffect(() => {
    if (localStorage.getItem('token')) {
      fetchCompanies()
    }
    else {
      navigate('/login')
    }
  }, [])

  const [addcompany, setAddcompany] = useState({ type: "", name: "", gpa: "", date: "", batch: "" })
  const [current, setCurrent] = useState({ did: "" })
  const refadd = useRef(null)
  const refClose2 = useRef(null)
  const refdel = useRef(null);
  const openRef = useRef(null);

  const delCompany = (currentAnn) => {
    setCurrent({ did: currentAnn._id })
    openRef.current.click()
  }

  const handleDelete = () => {
    deleteCompany(current.did)
    refdel.current.click()
    toast('🗑️ Company Deleted!', {
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

  const adddCompany = () => {
    refadd.current.click()
    setAddcompany({ type: '', name: '', gpa: '', date: '', batch: '' })
  }

  const handleChange2 = (e) => {
    if (e.target.name && e.target.name === 'type') {
      let opptype = e.target.value.toLowerCase();
      setAddcompany({ ...addcompany, [e.target.name]: opptype })
      return;
    }
    setAddcompany({ ...addcompany, [e.target.name]: e.target.value })
  }

  const handleClick2 = (e) => {
    e.preventDefault()
    if (addcompany.name.trim().length < 3) {
      toast.warn('Name must be atleast 3 characters!', {
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

    if (addcompany.type !== 'job' && addcompany.type !== 'internship') {
      toast.warn(`Type must be 'job' or 'internship'!`, {
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

    if (addcompany.gpa > 10 || addcompany.gpa < 1) {
      toast.warn(`Required Gpa must be between 1 to 10!`, {
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

    if (addcompany.batch > 2027 || addcompany.batch < 2024) {
      toast.warn(`Batch must be inside 2024 to 2027 (both inclusive)!`, {
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

    addCompany(addcompany.type, addcompany.name, addcompany.gpa, addcompany.date, addcompany.batch)
    toast('🌟 Company added!', {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    refClose2.current.click()
  }

  return (
    <div className="py-2">

      <button type="button" ref={refadd} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#staticBackdrop3">
        Launch static backdrop modal
      </button>

      <div className="modal fade" id="staticBackdrop3" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">

        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="staticBackdropLabel3">Add Company</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form className="py-3">
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">Company Name</label>
                  <input type="text" className="form-control w-100" name="name" id="name" value={addcompany.name} placeholder="Enter company name..." onChange={handleChange2} required />
                </div>
                <div className="mb-3">
                  <label htmlFor="type" className="form-label">Opportunity Type</label>
                  <input type="text" className="form-control w-100" aria-describedby="textHelp" name="type" id="type" placeholder="Enter type (job/internship)..." value={addcompany.type} onChange={handleChange2} required />
                </div>
                <div className="mb-3">
                  <label htmlFor="gpa" className="form-label">Required GPA</label>
                  <input type="text" className="form-control w-100" name="gpa" id="gpa" value={addcompany.gpa} placeholder="Enter required gpa..." onChange={handleChange2} required />
                </div>
                <div className="mb-3">
                  <label htmlFor="date" className="form-label">Forms Closing Date</label>
                  <input type="date" className="form-control w-100" name="date" id="date" value={addcompany.date} placeholder="Enter forms closing date..." onChange={handleChange2} required />
                </div>
                <div className="mb-3">
                  <label htmlFor="batch" className="form-label">Batch</label>
                  <input type="text" className="form-control w-100" name="batch" id="batch" value={addcompany.batch} placeholder="Enter the batch (2024-2027)..." onChange={handleChange2} required />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" ref={refClose2}>Cancel</button>
              <button type="button" className="btn btn-primary" onClick={handleClick2}>Add Company</button>
            </div>
          </div>
        </div>
      </div>
      <div className="modal fade" id="staticBackdrop2" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="staticBackdropLabel2">Do you really want to delete this company?</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="d-flex justify-content-center my-3">
              <button type="button" className="btn btn-secondary mx-2" data-bs-dismiss="modal" ref={refdel}>No</button>
              <button type="button" className="btn btn-primary mx-2" onClick={handleDelete}>Yes, Delete</button>
            </div>
          </div>
        </div>
      </div>
      <button type="button" ref={openRef} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#staticBackdrop2">
        Launch static backdrop modal
      </button>
      <div className="d-flex justify-content-center align-items-center gap-3">
        <h2 className="my-4">All Companies</h2> <i className="fa-solid fa-circle-plus fa-2xl cursor-pointer" onClick={adddCompany}></i> </div>
      {companies.length === 0 && <h6 className="py-2">No companies hiring right now! Visit again after some time.</h6>}
      <div className="row g-1 overflow-auto m-2 d-flex justify-content-center" style={{ maxHeight: '70vh', minHeight: '60vh' }}>
        {companies.map((company) => {
          return <CompanyItem key={company._id} delCompany={delCompany} company={company} />
        })}
      </div>
    </div>
  )
}

export default Companies