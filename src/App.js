import Card from "./components/Card/Card";
import Sidebar from "./components/Sidebar/Sidebar";
import Filter from "./components/Filter/Filter";
import InfoCard from "./components/Card/InfoCard";
import Submenu from "./components/Filter/FilterDropdown";
import { useGlobalContext } from "./components/context";
import { AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import ReactGA from 'react-ga4';

function App() {
  ReactGA.initialize("G-GFMSEK89EK");

  const { appChains, closeSubmenu } = useGlobalContext();
  const [windowSize, setWindowSize] = useState([
    window.innerWidth,
    window.innerHeight,
  ]);

  const handleSubmenu = (e) => {
    if (
      e.target.classList.contains("list") ||
      e.target.classList.contains("content")
    ) {
      closeSubmenu();
    }
  };

  useEffect(() => {
    const handleWindowResize = () => {
      setWindowSize([window.innerWidth, window.innerHeight]);
    };

    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  return (
    <>
      {windowSize[0] <= 1325 ? (
        <div className="small-screen-container">
          <h1 className="small-screen-message">
            AppchainsList is not yet available for mobile use. Please open on a larger screen.
          </h1>
        </div>
      ) : (
        <div className="container" onClick={handleSubmenu}>
          <Sidebar />
          <div className="content">
            <Filter />
            <Submenu />

            {/* If appchains exist list them, else show empty state */}
            {appChains.length > 0 ? (
              <div className="list">
                {appChains?.map((data, index) => {
                  return <Card key={index} {...data} />;
                })}
              </div>
            ) : (
              <div className="no-results-list">
                <h3>No Results Found</h3>
                <h5>
                  Please try selecting different options to refine your search.
                </h5>
              </div>
            )}
            <AnimatePresence>
              <InfoCard />
            </AnimatePresence>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
