
import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faTwitter,
  faLinkedin,
  faGithub,
} from "@fortawesome/free-brands-svg-icons";
import { faEnvelope, faPhone } from "@fortawesome/free-solid-svg-icons";
import Button from "../Components/Button";
import "./Footer.css"

function Footer() {

return(
    <>
<footer className="footer-section my-5">
<div className="container-fluid">
  <div className="row">
    <div className="col-md-4 text-left" id="fleft">
      <h5>GET IN TOUCH</h5>
      <p>
        <FontAwesomeIcon icon={faEnvelope} /> kr12@hptmil.com
      </p>
      <p>
        <FontAwesomeIcon icon={faPhone} /> 717-555-1234
      </p>
    </div>
    <div className="col-md-4 text-center" id="fcenter">
      <Button text="CONTACT ME" />
    </div>
    <div className="col-md-4 text-right" id="fright">
      <div className="social-icons">
        <a href="#">
          <FontAwesomeIcon icon={faFacebook} />
        </a>
        <a href="#">
          <FontAwesomeIcon icon={faTwitter} />
        </a>
        <a href="#">
          <FontAwesomeIcon icon={faLinkedin} />
        </a>
        <a href="#">
          <FontAwesomeIcon icon={faGithub} />
        </a>
      </div>
      <p className="copyright">Copyright © 2019 KR</p>
    </div>
  </div>
</div>
</footer>

</>
);
}

export default Footer;
