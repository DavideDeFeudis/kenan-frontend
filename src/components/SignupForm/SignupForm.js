import React, { useState } from "react";
import { Button } from "../Button";
import Spinner from "../Spinner/Spinner";

/**
 * A form used to sign up for a workshop.
 */
export default function SignupForm(props) {
    const { setFeedback, subjectContent, workshopId } = props;

    const initialState = {
        workshopId,
        firstName: "",
        lastName: "",
        email: "",
        subject: subjectContent,
        text: "",
    };

    const [message, setMessage] = useState(initialState);
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setMessage({ ...message, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        sendFormData();
    };

    const sendFormData = () => {
        fetch(`${process.env.REACT_APP_BACKEND_HOST}/signup`, {
            method: "POST",
            body: JSON.stringify(message),
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((response) => response.json())
            .then((json) => {
                console.log("SignupForm json:", json);
                setLoading(false);
                setFeedback(json);
            })
            .catch((err) => {
                console.log("SignupForm err:", err);
                setLoading(false);
                setFeedback({});
            });
    };

    return (
        <div className="form">
            <div className="container">
                <form onSubmit={handleSubmit}>
                    <input
                        name="firstName"
                        type="text"
                        placeholder="First name"
                        onChange={handleChange}
                        value={message.firstName}
                        required
                    ></input>
                    <input
                        name="lastName"
                        type="text"
                        placeholder="Last name"
                        onChange={handleChange}
                        value={message.lastName}
                        required
                    ></input>
                    <input name="email" type="email" placeholder="Email" onChange={handleChange} value={message.email} required></input>
                    <textarea
                        name="text"
                        rows="3"
                        placeholder="Anything else you want to tell us?"
                        onChange={handleChange}
                        value={message.text}
                    ></textarea>
                    <Button type="submit" className="mb-2">
                        Sign up
                    </Button>
                </form>
            </div>
            <Spinner loading={loading} fullScreen />
        </div>
    );
}
