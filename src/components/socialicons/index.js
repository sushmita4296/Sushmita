import React from "react";
import {
  FaFacebookF, FaGithub, FaLinkedin
} from "react-icons/fa";
import {
  SiGmail
} from "react-icons/si";
import { socialprofils } from "../../content_option";
import "./style.css";

const Socialicons = (params) => {
  return (
    <div className="stick_follow_icon">
      <ul>

        {socialprofils.github && (
          <li>
            <a href={socialprofils.github} target="_blank">
              <FaGithub />
            </a>
          </li>
        )}
        {socialprofils.facebook && (
          <li>
            <a href={socialprofils.facebook} target="_blank">
              <FaFacebookF />
            </a>
          </li>
        )}
        {socialprofils.linkedin && (
          <li>
            <a href={socialprofils.linkedin} target="_blank">
              <FaLinkedin />
            </a>
          </li>
        )}
        {socialprofils.gmail && (
          <li>
            <a href={socialprofils.gmail} target="_blank">
              <SiGmail />
            </a>
          </li>
        )}
      </ul>
      <p>Follow Me</p>
    </div>
  );
};

export default Socialicons;