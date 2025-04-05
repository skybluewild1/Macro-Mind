import "./Workouts.css";
import { useNavigate } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import { UserContext } from "../../context/userContext";
import axios from "axios";

export default function Workouts() {
    const {user, setUser} = useContext(UserContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            axios.get('/profile')
                .then(({ data }) => {
                    console.log("Fetched user:", data); // Debugging: Check full user object
                    setUser(data);
                })
                .catch(error => {
                    console.error("Error fetching user data:", error);
                });
        }
    }, [user]);  // This useEffect only runs once

    return (
        <div>
            <h2>Welcome to your Workouts!</h2>
        </div>
    );

}