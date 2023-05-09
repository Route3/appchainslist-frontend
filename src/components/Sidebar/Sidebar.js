import "./Sidebar.css";
import githubIcon from "./../../assets/images/github-icon.png";
import logo from "./../../assets/images/Logo.svg";
import { useEffect, useRef, useState,useCallback } from "react";

const Sidebar = () => {
  const sliderRef = useRef();
  const [carouselPosition, setCarouselPosition] = useState(0);

  const openInNewTab = (url) => {
    window.open(url, "_blank", "noreferrer");
  };

  const scrollSlide = useCallback(
    (index) => {
      let position = sliderRef.current;
      position.style.marginLeft = -index * position.clientWidth + "px";
      setCarouselPosition(index);
    },
    []
  );

  useEffect(() => {
    const interval = setInterval(() => {
      let nextPosition = (carouselPosition + 1) % 3;
      scrollSlide(nextPosition)
    }, 5000)

    return () => clearInterval(interval);
  }, [carouselPosition])

  return (
    <div className="sidebar-contianer">
      <div className="sidebar">
        <img className="logo" src={logo} alt="logo"></img>

        <div className="slider">
          <div className="slides">
            <div ref={sliderRef} className="first slide">
              <h2 className="sidebar-info-title">
                Comprehensive Appchain List
              </h2>
              <p className="sidebar-info-text">
                Whether you're a developer, an investor or a Web3 enthusiast, this is the place for you. Easily search for an appchain of your interest, learn about its features and capabilities.
              </p>
            </div>

            <div className="slide">
              <h2 className="sidebar-info-title">Get Your Appchain Listed</h2>
              <p className="sidebar-info-text">
                Want your project to show up in searches? It's a simple matter of updating our GitHub repo. Click the Get Listed button below to get started.
              </p>
            </div>
            <div className="slide">
              <h2 className="sidebar-info-title">Share your thoughts</h2>
              <p className="sidebar-info-text">
                Got an idea on how to improve this site, or just general
                feedback? Hop onto our <a href="https://discord.gg/z3xWnM5Wjw" target="_blank">Discord</a> server and let us
                know!
              </p>
            </div>
          </div>
          <div className="navigation">
            <label onClick={() => scrollSlide(0)}>
              <input
                type="radio"
                className="navigation-btn"
                name="radio-btn"
                id="radio1"
                onChange = {() => {}}
                checked = {carouselPosition === 0}
              />
            </label>
            <label onClick={() => scrollSlide(1)}>
              <input
                type="radio"
                className="navigation-btn"
                name="radio-btn"
                id="radio2"
                onChange = {() => {}}
                checked = {carouselPosition === 1}
              />
            </label>
            <label onClick={() => scrollSlide(2)}>
              <input
                type="radio"
                className="navigation-btn"
                name="radio-btn"
                id="radio3"
                onChange = {() => {}}
                checked = {carouselPosition === 2}
              />
            </label>
          </div>
        </div>

        <button
          className="github-btn"
          onClick={() =>
            openInNewTab("https://github.com/Route3/AppchainsList/blob/main/README.md")
          }
        >
          <div className="github-logo">
            <img className="github-icon" src={githubIcon} alt="github"></img>
          </div>
          <span className="github-text">Get Listed</span>
        </button>
        <a href="https://discord.gg/z3xWnM5Wjw" className="sidebar-footer-text">Made with 🧡 by Route3</a>
      </div>
    </div>
  );
};

export default Sidebar;
