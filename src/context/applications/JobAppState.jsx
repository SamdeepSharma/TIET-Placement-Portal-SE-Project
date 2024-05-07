/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import JobAppContext from "./JobAppContext";
import { useState } from "react";

const JobAppState = (props) => {
    const host = 'http://localhost:5000';
    const initially = []

    const [applications, setApplications] = useState(initially)
    const [companies, setCompanies] = useState(initially)

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

    //Add Company
    // const addCompany = async (title, description) => {
    //     //API call
    //     const response = await fetch(`${host}/api/companies/addcompanies`, {
    //         method: "POST",
    //         headers: {
    //             "Content-Type": "application/json",
    //             "auth-token": localStorage.getItem('token')
    //         },
    //         body: JSON.stringify({title, description}),
    //     });
    //     const company = await response.json()
    //     //frontend logic
    //     setCompanies(companies.concat(company))
    // }

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
    
        //Add Company
        const addCompany = async (type, companyName, closingDate, requiredGPA) => {
            //API call
            const response = await fetch(`${host}/api/jobs/addjobs`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": localStorage.getItem('token')
                },
                body: JSON.stringify({type, companyName, closingDate, requiredGPA}),
            });
            const company = await response.json()
            //frontend logic
            setCompanies(companies.concat(company))
        }
    
        //Delete Company
        const deleteCompany = async(id) => {
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

        <JobAppContext.Provider value={{ applications, fetchAllApps, fetchApps, companies, fetchCompanies, addCompany, deleteCompany }}>
            {props.children}
        </JobAppContext.Provider>

    )
}

export default JobAppState;