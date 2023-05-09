import { useState } from "react";
import { useGlobalContext } from "./../context";
import closeIcon from "./../../assets/images/close-icon.svg";
import "./InfoCard.css";
import Chip from "./../Chip/Chip";
import copyIcon from "./../../assets/images/copy-img.svg";
import { motion, AnimatePresence } from "framer-motion";

import getLogo from "../../logos";

const InfoCard = (cardData) => {
  const { viewAppChain, isModalOpen, closeModal, filterData, filterList, setFilterList } =
    useGlobalContext();
  const [readMore, setReadMore] = useState(false);
  const {
    name,
    shortName,
    ecosystem,
    blockNumber,
    value,
    valueUpdated,
    blockNumberUpdated,
    logo,
    blockExplorer,
    jsonRPC,
    description,
    category,
    tags,
    url
  } = viewAppChain;

  const formatDate = (date) => {
    const newDate = new Date(date);
    const options = { year: "numeric", month: "short", day: "numeric" };
    return (
      newDate.toLocaleDateString(undefined, options) +
      " at " +
      newDate.toLocaleTimeString()
    );
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

  const setFilter = (list, data) => {
    //Find in list value to change
    let newFilter = filterList[list].find((item) => {
      return item.data === data;
    });

    //Invert value
    newFilter.checked = !newFilter.checked;

    //Find position and replace with new valiue
    var indexOfChangingValue = filterList[list].findIndex(
      (item) => item.data === data
    );
    filterList[list][indexOfChangingValue] = newFilter;

    //Filter
    filterData("");

    setFilterList(filterList)

    closeModal();
  };

  if (viewAppChain !== undefined && Object.keys(viewAppChain).length !== 0) {
    return (
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 0.2 } }}
            exit={{ opacity: 0 }}
            className={`${
              isModalOpen ? "info-overlay show-info" : "info-overlay"
            }`}
            onClick={(e) =>
              e.target.className === "info-overlay show-info"
                ? closeModal()
                : false
            }
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1, transition: { duration: 0.2 } }}
              exit={{ scale: 0 }}
              className="info-container"
            >
              <button className="close-info-btn" onClick={closeModal}>
                <img className="close-img" src={closeIcon} alt="close"></img>
              </button>

              <div className="info-header">
                <div>
                  <img className="info-logo" src={logo} alt="logo"></img>
                </div>
                <h2 className="info-title">{name}</h2>
                <h3 className="info-subtitle">{shortName}</h3>
                <a className="info-url" href={url} target="_blank" rel="noreferrer">Link to website</a>
              </div>

              <div className="info-description">
                {description.length > 120 &&
                  <p className="info-text">
                    {readMore ? description : `${description.substring(0, 120)}...`}
                    <button
                      className="info-read-more-btn"
                      onClick={() => setReadMore(!readMore)}
                    >
                      {readMore ? "show less" : "  read more"}
                    </button>
                  </p>
                }
                {description.length <= 120 &&
                  <p className="info-text">
                    {description}
                  </p>
                }
                <div className="info-chips">
                  {category?.map((data, index) => {
                    return (
                      <Chip
                        key={index}
                        data={data}
                        toggleSelected={() => setFilter("categories", data)}
                        icon=""
                      />
                    );
                  })}
                  {tags?.map((data, index) => {
                    return (
                      <Chip
                        key={index}
                        data={data}
                        toggleSelected={() => setFilter("tags", data)}
                        icon=""
                      />
                    );
                  })}
                </div>
              </div>

              <div className="box">
                <div className="info-updatable-data">
                  <div className="info-value">
                    {value &&
                    <h3 className="info-value-title">
                      ${Math.round(value * 100) / 100}
                    </h3>
                    }
                    {!value &&
                    <h3 className="info-value-title">N/A</h3>
                    }
                    <h4 className="info-value-subtitle">Value (USD)</h4>
                  </div>
                  <div className="vertical-separator"></div>
                  <div className="info-value">
                    <h3 className="info-value-title">
                      {blockNumber ? blockNumber : "N/A"}
                    </h3>
                    <h4 className="info-value-subtitle">Blocks</h4>
                  </div>
                </div>
                <div className="info-list">
                  <div className="info-link">
                    <span>Block Explorer</span>
                    <div className="info-link-open">
                      <a href={blockExplorer} target="_blank" rel="noreferrer">
                        {blockExplorer
                          ? blockExplorer.substring(
                              0,
                              blockExplorer.indexOf("/", 10)
                            )
                          : "N/A"}
                      </a>
                      <button
                        className="copy-btn"
                        onClick={() => copyToClipboard(blockExplorer)}
                      >
                        <img
                          className="copy-icon"
                          src={copyIcon}
                          alt="copy"
                        ></img>
                      </button>
                    </div>
                  </div>
                  <hr className="info-separator-1"></hr>
                  <div className="info-link">
                    <span>RPC</span>
                    {!jsonRPC && 
                    <div className="info-link-open">
                        <span>N/A</span>
                    </div>
                    }

                    {jsonRPC &&
                    <div className="info-link-open">
                      <a href={jsonRPC} target="_blank" rel="noreferrer">{jsonRPC}</a>
                      <button
                        className="copy-btn"
                        onClick={() => copyToClipboard(jsonRPC)}
                      >
                        <img
                          className="copy-icon"
                          src={copyIcon}
                          alt="copy"
                        ></img>
                      </button>
                    </div>
                    }
                  </div>
                </div>
                {(valueUpdated || blockNumberUpdated) &&
                <div className="info-value-updated">
                  Last updated {formatDate(valueUpdated || blockNumberUpdated)}
                </div>
                }
                {!(valueUpdated || blockNumberUpdated) &&
                <div className="info-value-updated">
                  Last updated N/A
                </div>
                }
                <hr className="info-separator"></hr>
                <div className="info-footer">
                  <a className="info-footer-contribute" href="https://github.com/Route3/AppchainsList/blob/main/README.md" target="_blank" rel="noreferrer">Contribute to this listing</a>
                  <h5 className="info-footer-text">{ecosystem} </h5>
                  <div className="info-footer-container">
                    <img
                      className="info-footer-logo"
                      src={getLogo(ecosystem)}
                      alt="logo"
                    ></img>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    );
  }
  return <></>;
};

export default InfoCard;
