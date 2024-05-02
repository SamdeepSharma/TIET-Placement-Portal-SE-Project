/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import AnnounceContext from "./AnnounceContext";
import { useState } from "react";

const AnnouncementState = (props) => {
    const host = 'http://localhost:5000';
    const initialAnnouncements = []

    const [announcements, setAnnouncements] = useState(initialAnnouncements)

    //get all announcements
    const fetchAnnouncements = async () => {
        //API call
        const response = await fetch(`${host}/api/announcements/fetchannouncements`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                'auth-token': localStorage.getItem('token')
            },
        });
        const json = await response.json()
        console.log(json)
        setAnnouncements(json)
    }

    //Add Announcement
    const addAnnouncement = async (title, description) => {
        //API call
        const response = await fetch(`${host}/api/announcements/addannouncements`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
            },
            body: JSON.stringify({title, description}),
        });
        const announcement = await response.json()
        //frontend logic
        setAnnouncements(announcements.concat(announcement))
    }

    //Delete Announcement
    const deleteAnnouncement = async(id) => {
        //API call
        const response = await fetch(`${host}/api/announcements/deleteannouncements/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
            },
        });
        //frontend logic
        const newAnnouncements = announcements.filter((announcement) => {
            return announcement._id != id
        })
        setAnnouncements(newAnnouncements)
    }

    //Edit Announcement
    const editAnnouncement = async(id, title, description) => {
        //API call
        const response = await fetch(`${host}/api/announcements/updateannouncements/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
            },
            body: JSON.stringify({title, description}),
        });
        const json_data= await response.json();
        //frontend logic
        let newAnnouncements = JSON.parse(JSON.stringify(announcements))
        for (let index = 0; index < newAnnouncements.length; index++) {
            if (newAnnouncements[index]._id === id){
                newAnnouncements[index].title = title
                newAnnouncements[index].description = description
                break;
            }
        }
        setAnnouncements(newAnnouncements)
    }

    return (

        <AnnounceContext.Provider value={{ announcements, addAnnouncement, deleteAnnouncement, editAnnouncement, fetchAnnouncements }}>
            {props.children}
        </AnnounceContext.Provider>

    )
}

export default AnnouncementState;