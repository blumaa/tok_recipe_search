type IngredientsFilterProps = {
  ingredientsFilter: string;
  setIngredientsFilter: (value: string) => void;
};

const IngredientsFilter: React.FC<IngredientsFilterProps> = ({
  ingredientsFilter,
  setIngredientsFilter,
}) => (
  <div>
    <span>Ingredients</span>
    <input
      value={ingredientsFilter}
      onChange={e => setIngredientsFilter(e.target.value)}
      placeholder="Search ingredients"
    />
  </div>
);

export default IngredientsFilter;
