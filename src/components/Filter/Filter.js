import React, { useEffect, useState } from "react";
import { useGlobalContext } from "../context";
import downArrowIcon from "./../../assets/images/down-icon.svg";
import searchIcon from "./../../assets/images/search-icon.svg";
import "./Filter.css";

const Filter = () => {
  const [submenuOpened, setSubmenuOpened] = useState("");
  const [activeEcosystemFilters, setActiveEcosystemFilters] = useState(0);
  const [activeCategoryFilters, setActiveCategoryFilters] = useState(0);
  const [activeTagFilters, setActiveTagFilters] = useState(0);

  const {
    isSubmenuOpen,
    openSubmenu,
    closeSubmenu,
    searchString,
    setSearchString,
    filterData,
    filterList,
    setFilterList,
    filterCount,
    setFilterCount,
    appChains,
  } = useGlobalContext();

  const toggleSubmenu = (e) => {
    let clicked = e.target.textContent;

    if (isSubmenuOpen && submenuOpened === clicked) {
      setSubmenuOpened("");
      closeSubmenu();
    } else {
      setSubmenuOpened(clicked);
      displaySubmenu(e);
    }
  };

  const displaySubmenu = (e) => {
    const textContent = e.target.textContent.replace(/[0-9]/g, "")
    const tempBtn = e.target.getBoundingClientRect();
    const center = (tempBtn.left + tempBtn.right) / 2;
    const bottom = tempBtn.bottom + 10;
    openSubmenu(textContent, { center, bottom });
  };

  const handleSubmenu = (e) => {
    if (!e.target.classList.contains("filter-btn")) {
      setSubmenuOpened("");
      closeSubmenu();
    }
  };

  const clearFilters = () => {
    setActiveEcosystemFilters(0);
    filterList["ecosystems"].forEach((item) => {
      item.checked = false;
    });

    setActiveCategoryFilters(0);
    filterList["categories"].forEach((item) => {
      item.checked = false;
    });

    setActiveTagFilters(0);
    filterList["tags"].forEach((item) => {
      item.checked = false;
    });

    filterData("ecosystems", filterList["ecosystems"])
    filterData("categories", filterList["categories"])
    filterData("tags", filterList["tags"])

    setFilterCount(0)
    setSearchString("")
  }

  useEffect(() => {
    filterData("");
  }, [searchString]);

  useEffect(() => {
    // Find number of tags ecosystems filters
    const getNumberOfActiveFilters = () => {
      if (filterList["ecosystems"]) {
        setActiveEcosystemFilters(() => {
          return filterList["ecosystems"].filter((item) => {
            return item.checked === true;
          }).length;
        });
      }
      // Find number of active categories filters
      if (filterList["categories"]) {
        setActiveCategoryFilters(() => {
          return filterList["categories"].filter((item) => {
            return item.checked === true;
          }).length;
        });
      }
      // Find number of tags categories filters
      if (filterList["tags"]) {
        setActiveTagFilters(() => {
          return filterList["tags"].filter((item) => {
            return item.checked === true;
          }).length;
        });
      }
    };

    getNumberOfActiveFilters();
  }, [filterList]);

  return (
    <div className="filter-wrapper">
      <div className="filter-bar" onClick={handleSubmenu}>
        <div className="search-container">
          <input
            onChange={(e) => setSearchString(e.target.value)}
            className="search-input"
            placeholder="Search by network, ecosystem, token name..."
            value={searchString}
          ></input>
          <img className="filter-img" src={searchIcon} alt="filter"></img>
        </div>

        <button className="filter-btn" onClick={toggleSubmenu}>
          <span className={`filter-count ${activeEcosystemFilters > 0 ? "active" : ""}`}>{activeEcosystemFilters}</span>
          <span className="filter-name">Ecosystems</span>
          <img
            className="filter-arrow"
            src={downArrowIcon}
            alt="downArrowIcon"
          ></img>
        </button>

        <button className="filter-btn " onClick={toggleSubmenu}>
          <span className={`filter-count ${activeCategoryFilters > 0 ? "active" : ""}`}>{activeCategoryFilters}</span>
          <span className="filter-name">Categories</span>
          <img
            className="filter-arrow"
            src={downArrowIcon}
            alt="downArrowIcon"
          ></img>
        </button>

        <button className="filter-btn" onClick={toggleSubmenu}>
          <span className={`filter-count ${activeTagFilters > 0 ? "active" : ""}`}>{activeTagFilters}</span>
          <span className="filter-name">Tags</span>
          <img
            className="filter-arrow"
            src={downArrowIcon}
            alt="downArrowIcon"
          ></img>
        </button>
      </div>
      <div className="filter-info">
        <span>{appChains !== undefined ? appChains.length : 0} networks found.</span>
        {filterCount > 0 &&
          <span className="filter-clear" onClick={clearFilters}>Clear all filters.</span>
        }
      </div>
    </div>
  );
};

export default Filter;
