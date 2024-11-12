import React from "react";
import Error from "../images/error.png";
import "./NotFoundPage.css";

export default function NotFoundPage({ message = "Something went wrong!" }) {
  return (
    <div className="error-page">
      <img src={Error} alt="Error" className="error-image" />
    </div>
  );
}
