import React from "react";

const Footer = () => {
  return (
    <section className="c-space pt-7 pb-3 border-3 border-black-300 flex justify-between items-center flex-wrap gap-5 ">
      <div className="text-white-500 flex gap-2">
        <p>Terms & Conditions</p>
        <p>|</p>
        <p>Privacy Policy</p>
      </div>
      <div className="flex gap-3">
        <a
          className="social-icon"
          href="https://github.com/Dev-Faith/"
          target="_blank"
          rel="noreferrer"
          aria-label="GitHub"
        >
          <img src="/assets/github.svg" alt="github" className="w-1/2 h-1/2" />
        </a>
        <a
          className="social-icon"
          href="https://x.com/FaithMuyiwa"
          target="_blank"
          rel="noreferrer"
          aria-label="Twitter"
        >
          <img
            src="/assets/twitter.svg"
            alt="twitter"
            className="w-1/2 h-1/2"
          />
        </a>
        <a
          className="social-icon"
          href="https://www.linkedin.com/in/adebayo-faith-eyitope-1b4502185/"
          target="_blank"
          rel="noreferrer"
          aria-label="LinkedIn"
        >
          <img
            src="/assets/linkedin.svg"
            alt="linkedin"
            className="w-1/2 h-1/2"
          />
        </a>
      </div>
      <p className="text-white-500">Ⓒ 2024 Muyiwa. All rights reserved</p>
    </section>
  );
};

export default Footer;
