import "./Card.css";
import Chip from "./../Chip/Chip";
import { useGlobalContext } from "./../context";
import { motion } from "framer-motion";
import getLogo from "../../logos";

const Card = (cardData) => {
  const { openModal, filterData, filterList } = useGlobalContext();
  const { name, shortName, ecosystem, tags, logo, category } =
    cardData;

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
  };

  return (
    <motion.div
      className="card"
      onClick={() => openModal(name)}
      exit={{ scaleY: 200 }}
    >
      <div className="card-content">
        <div className="card-logo-container">
          <img className="card-logo" src={logo} alt={name}></img>
        </div>

        <div className="card-text">
          <h3 className="card-title">{name}</h3>
          <h4 className="card-subtitle">{shortName}</h4>
          <div className="card-chips">
            {category.map((data, index) => {
              return (
                <Chip
                  key={index}
                  data={data}
                  toggleSelected={() => setFilter("categories", data)}
                />
              );
            })}
            {tags.map((data, index) => {
              return (
                <Chip
                  key={index}
                  data={data}
                  toggleSelected={() => setFilter("tags", data)}
                />
              );
            })}
          </div>
        </div>
      </div>
      <div className="card-separator"></div>
      <div className="card-footer">
        <h5 className="card-footer-text">{ecosystem} </h5>
        <div className="card-footer-container">
          <img
            className="card-footer-logo"
            src={getLogo(ecosystem)}
            alt="logo"
          ></img>
        </div>
      </div>
    </motion.div>
  );
};

export default Card;
