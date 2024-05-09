/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import JobAppContext from "./JobAppContext";
import { useState } from "react";

const JobAppState = (props) => {
    const host = 'https://tiet-pms-backend.vercel.app';
    const initially = []

    const [applications, setApplications] = useState(initially)
    const [companies, setCompanies] = useState(initially)
    const [student, setStudent] = useState(initially)
    const [checkit, setCheckit] = useState(initially)

    //get applications
    const fetchApps = async () => {
        //API call
        const response = await fetch(`${host}/api/applications/fetchapplications`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                'auth-token': localStorage.getItem('token')
            },
        });
        const json = await response.json()
        setApplications(json)
    }

    //get all applications
    const fetchAllApps = async () => {
        //API call
        const response = await fetch(`${host}/api/applications/fetchall`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                'auth-token': localStorage.getItem('token')
            },
        });
        const allapps = await response.json()
        setApplications(allapps)
    }

    //Submit application
    const submitApp = async (id) => {
        //API call
        const response = await fetch(`${host}/api/applications/submitapplications/${id}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
            },
        });
        const application = await response.json()
        //frontend logic
        setCompanies(applications.concat(application))
    }

    //Check if already applied
    const checkApp = async (id) => {
        //API call
        const response = await fetch(`${host}/api/applications/checkapplications/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
            },
        });
        const check = await response.json()
        //frontend logic
        setCheckit({id, check})
    }

    //get all companies
    const fetchCompanies = async () => {
        //API call
        const response = await fetch(`${host}/api/jobs/fetchjobs`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                'auth-token': localStorage.getItem('token')
            },
        });
        const json = await response.json()
        console.log(json)
        setCompanies(json)
    }

    //get student data
    const fetchStudent = async () => {
        //API call
        const response = await fetch(`${host}/api/auth/getdata`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                'auth-token': localStorage.getItem('token')
            },
        });
        const stu = await response.json()
        console.log(stu)
        setStudent(stu)
    }

    //Add Company
    const addCompany = async (type, companyName, requiredGPA, closingDate, batch) => {
        //API call
        const response = await fetch(`${host}/api/jobs/addjobs`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
            },
            body: JSON.stringify({ type, companyName, requiredGPA, closingDate, batch }),
        });
        console.log(type, companyName, closingDate, requiredGPA, batch)
        const company = await response.json()
        console.log(company)
        //frontend logic
        setCompanies(companies.concat(company))
    }

    //Delete Company
    const deleteCompany = async (id) => {
        //API call
        const response = await fetch(`${host}/api/jobs/deletejobs/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
            },
        });
        //frontend logic
        const newCompanies = companies.filter((company) => {
            return company._id != id
        })
        setCompanies(newCompanies)
    }

    return (

        <JobAppContext.Provider value={{ applications, fetchAllApps, fetchApps, student, fetchStudent, checkit, checkApp, companies, fetchCompanies, addCompany, deleteCompany, submitApp }}>
            {props.children}
        </JobAppContext.Provider>

    )
}

export default JobAppState;