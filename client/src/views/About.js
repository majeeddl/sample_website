import React from "react";

const About = () => {
  return (
    <div className="mt-20 text-left">
      <h3 className="text-2xl">About Us</h3>
      <div className="mt-2">
        This project is written for showing my experience about working with
        backend and frontend technologies.
      </div>
      <div className="mt-2">I use following for frontend :</div>
      <ul className="ml-10 mt-2">
        <li> React js</li>
        <li> Redux</li>
        <li> Redux Tunck</li>
        <li> React Router</li>
        <li> Bootstrap</li>
        <li> Antd</li>
        <li> Tailwindcss </li>
      </ul>
      <div className="mt-2">And following for backend :</div>
      <ul className="ml-10 mt-2">
        <li> Node js</li>
        <li> Typescript</li>
        <li> Express</li>
        <li> JWT authentication</li>
        <li> Mongo DB</li>
      </ul>
    </div>
  );
};

export default About;
