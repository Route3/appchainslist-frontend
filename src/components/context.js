import React, { useState, useContext, useEffect } from "react";
import Fuse from "fuse.js";
import getLogo from "../logos";

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const [appChains, setAppChains] = useState([]);

  // List of existing values to create filter
  const [filterList, setFilterList] = useState({});
  const [searchString, setSearchString] = useState("");

  //Is model open & model data for viewing
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [viewAppChain, setViewAppChain] = useState({});

  //Submenu
  const [isSubmenuOpen, setIsSubmenuOpen] = useState(false);
  const [location, setLocation] = useState({});
  const [type, setType] = useState();

  const [filterCount, setFilterCount] =  useState(0);

  // Modal open & close functions
  const openModal = (name) => {
    const AppChainById = appChains.find((el) => el.name === name);
    setViewAppChain(AppChainById);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Submenu open & close functions
  const openSubmenu = (text, coordinates) => {
    setType(text.toLowerCase());
    setLocation(coordinates);
    setIsSubmenuOpen(true);
  };

  const closeSubmenu = () => {
    setIsSubmenuOpen(false);
  };

  //Filtering function
  const filterData = (type = "", newData) => {
    let filteredData = data;
    let updatedFilterList = filterList;

    // If filtering by ecosystem/category/tag update filterList
    if (type !== "") {
      updatedFilterList[type] = newData;
      setFilterList(() => ({ ...updatedFilterList }));
    }

    if (!updatedFilterList.ecosystems || !updatedFilterList.categories || !updatedFilterList.tags) {
      return
    }

    // Filter ecosystems
    let ecosystemFilterValues = updatedFilterList.ecosystems
      .filter((el) => el.checked)
      .map((el) => el.data);
    if (ecosystemFilterValues.length > 0) {
      filteredData = filteredData.filter((el) => {
        return ecosystemFilterValues.some((e) => {
          return el.ecosystem === e;
        });
      });
    }

    // Filter categories
    let categoriesFilterValues = updatedFilterList.categories
      .filter((el) => el.checked)
      .map((el) => el.data);

    if (categoriesFilterValues.length > 0) {
      filteredData = filteredData.filter((el) =>
        categoriesFilterValues.some((e) => el.category.includes(e))
      );
    }

    //Filter tags
    let tagsFilterValues = updatedFilterList.tags
      .filter((el) => el.checked)
      .map((el) => el.data);

    if (tagsFilterValues.length > 0) {
      filteredData = filteredData.filter((el) =>
        tagsFilterValues.some((e) => el.tags.includes(e))
      );
    }

    // Filtering by search string
    if (searchString === "") {
      setFilterCount(ecosystemFilterValues.length + categoriesFilterValues.length + tagsFilterValues.length);
      setAppChains(filteredData);
      return;
    }

    const fuse = new Fuse(filteredData, {
      keys: [
        "name",
        "shortName",
      ],
    });
    const result = fuse.search(searchString);
    const finalResult = [];

    if (result.length) {
      result.forEach((item) => {
        finalResult.push(item.item);
      });
    }

    setFilterCount(ecosystemFilterValues.length + categoriesFilterValues.length + tagsFilterValues.length + 1);
    setAppChains(finalResult);
  };

  useEffect(() => {
    const fetchData = async () => {
      let url =
        "https://raw.githubusercontent.com/Route3/AppchainsList/main/data.json";
      fetch(url)
        .then((res) => res.json())
        .then((reponse) => {
          const data = reponse.data;

          setAppChains(data);
          setData(data);
        });
    };

    fetchData();
  }, []);

  useEffect(() => {
    const findFilters = () => {
      let allEcosystems = data.map((el) => {
        return {
          data: el.ecosystem,
          icon: getLogo(el.ecosystem),
          checked: false
        }
      })
      let uniqueEcosystems = [...new Map(allEcosystems.map(item => [item['data'], item])).values()];
      

      let allCategories = data.map((el) => el.category).flat();
      let uniqueCategories = [...new Set(allCategories)];
      uniqueCategories = uniqueCategories.map((el) => {
        return { data: el, checked: false };
      });

      const allTags = data.map((el) => el.tags).flat();
      let uniqueTags = [...new Set(allTags)];
      uniqueTags = uniqueTags.map((el) => {
        return { data: el, checked: false };
      });
      
      setFilterList({
        ecosystems: uniqueEcosystems,
        categories: uniqueCategories,
        tags: uniqueTags,
      });
    };

    findFilters();
  }, [data]);

  return (
    <AppContext.Provider
      value={{
        // Data
        data,
        appChains,
        setAppChains,
        // Modal
        isModalOpen,
        openModal,
        closeModal,
        viewAppChain,
        //Filter
        filterData,
        filterList,
        setFilterList,
        searchString,
        setSearchString,
        filterCount,
        setFilterCount,
        //Submenu
        isSubmenuOpen,
        openSubmenu,
        closeSubmenu,
        location,
        type,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
