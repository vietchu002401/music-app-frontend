import React from 'react';
import { Link } from 'react-router-dom';
import bg from "../../assets/backgroundImage/texture-old-faded-vintage-paper-beige-retro-background-grunge-paper-with-spots-streaks_213524-157.jpg"

const NotFound = () => {
    return (
        <div className="background-page">
            <div style={{ backgroundImage: "url(" + bg + ")" }} className="title">
                <h1 style={{ textAlign: "center" }}>404 Not Found</h1>
            </div>
            <Link to="/"><button className="my-button">Go back to Home Page</button></Link>
        </div>
    );
};

export default NotFound;