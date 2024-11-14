import React from "react";
import "./Footer.css";
import whatsapp from "../../images/whatsapp.png";
import instagram from "../../images/instagram.png";

export default function Footer() {
  return (
    <footer className="footer">
      <p>&copy; 2024 Dolly's E-Commerce. All Rights Reserved.</p>
      <div className="footer-links">
        <div className="link-button">
          <button>Privacy Policy</button>
          <button>Terms of Service</button>
          <button>FAQ</button>
        </div>
        <p>Email: contact@gmail.com</p>
        <div className="social-media">
          <a href="https://www.whatsapp.com">
            <img src={whatsapp} alt="whatsapp" />
          </a>
          <a href="https://www.instagram.com">
            <img src={instagram} alt="instagram" />
          </a>
        </div>
      </div>
    </footer>
  );
}
