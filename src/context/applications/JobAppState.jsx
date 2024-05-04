/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import JobAppContext from "./JobAppContext";
import { useState } from "react";

const JobAppState = (props) => {
    const host = 'http://localhost:5000';
    const initially = []

    const [applications, setApplications] = useState(initially)

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

    //Add Announcement
    // const addAnnouncement = async (title, description) => {
    //     //API call
    //     const response = await fetch(`${host}/api/announcements/addannouncements`, {
    //         method: "POST",
    //         headers: {
    //             "Content-Type": "application/json",
    //             "auth-token": localStorage.getItem('token')
    //         },
    //         body: JSON.stringify({title, description}),
    //     });
    //     const announcement = await response.json()
    //     //frontend logic
    //     setAnnouncements(announcements.concat(announcement))
    // }

    return (

        <JobAppContext.Provider value={{ applications, fetchAllApps, fetchApps }}>
            {props.children}
        </JobAppContext.Provider>

    )
}

export default JobAppState;