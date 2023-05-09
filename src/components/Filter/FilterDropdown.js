import React, { useState, useRef, useEffect } from "react";
import { useGlobalContext } from "./../context";
import "./Filter.css";

const FilterDropdown = () => {
  const { isSubmenuOpen, location, type, filterList, filterData } =
    useGlobalContext();
  const container = useRef(null);
  const [list, setList] = useState([]);

  const handleFilterClick = (id) => {
    const newList = list.map((item, index) => {
      if (index === id) {
        const updatedItem = {
          ...item,
          checked: !item.checked,
        };

        return updatedItem;
      }

      return item;
    });

    filterData(type, newList);
  };

  useEffect(() => {
    setList([]);
    if (filterList[type]?.length > 0) {
      const submenu = container.current;
      const { center, bottom } = location;
      submenu.style.left = `${center}px`;
      submenu.style.top = `${bottom}px`;
      
      setList(() => filterList[type]);
    } 
  }, [location, filterList, type]);

    return (
      <aside
        className={`${
          isSubmenuOpen && list.length > 0 ? "filter-submenu show" : "filter-submenu"
        }`}
        ref={container}
      >
        <section className="filter-submenu-center">
          {list.map((item, index) => {
            const { checked, data, icon } = item;

            return (
              <div className="submenu-item" key={index} onClick={() => handleFilterClick(index)}>
                <input
                  className="submenu-checkbox"
                  checked={checked}
                  type="checkbox"
                ></input>
                {icon ? (
                  <div className="submenu-icon-container">
                    <img className="submenu-icon" src={icon} alt=""></img>
                  </div>
                ) : (
                  <></>
                )}
                <span>{data}</span>
              </div>
            );
          })}
        </section>
      </aside>
    );
};

export default FilterDropdown;
