import React from "react";
import { Link } from "react-router-dom";
import "./card.css"; // Import CSS for styling

const Card = ({ title, description, bgColor, link, linkText }) => {
  return (
    <div className="col-lg-4 mb-4">
      <div className={`card custom-card ${bgColor} shadow`}>
        <div className="card-body">
          <h5 className="card-title mb-2">{title}</h5>
          <p className="card-text small">{description}</p>
        </div>
        <div className="card-footer p-4">
          <Link to={link} className="card-footer custom-card-footer clearfix rounded-full">
            <span>{linkText}</span>
            <i className="fas fa-angle-right float-right"></i>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Card;
