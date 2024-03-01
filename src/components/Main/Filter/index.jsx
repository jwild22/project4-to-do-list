export const Filter = ({ buttonName, applyFilter }) => {
  return (
    <button className="filter" onClick={() => applyFilter(buttonName)}>
      {buttonName}
    </button>
  );
};
