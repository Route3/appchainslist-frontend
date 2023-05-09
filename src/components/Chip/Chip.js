import "./Chip.css";

const Chip = ({ data, selected, toggleSelected }) => {
  return (
    <div
      className={`${selected ? "chip selected-chip" : "chip"}`}
      onClick={(e) => {
        toggleSelected(data)
        e.stopPropagation()
      }}
    >
      <span className="chip-name">{data}</span>
    </div>
  );
};

export default Chip;
