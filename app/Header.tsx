type HeaderProps = {
  ingredientsFilter: string;
  setIngredientsFilter: (value: string) => void;
  effectFilter: string;
  setEffectFilter: (value: string) => void;
};

const Header: React.FC<HeaderProps> = ({
  ingredientsFilter,
  setIngredientsFilter,
  effectFilter,
  setEffectFilter,
}) => (
  <header>
    <div className="text-sm">
      TOK Recipe Search
    </div>
    <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 justify-evenly bg-sky-400 p-2 ">
      <div className="flex items-center gap-2">
        <span>Ingredients</span>
        <input
          className="rounded-xl p-1"
          value={ingredientsFilter}
          onChange={e => setIngredientsFilter(e.target.value)}
          placeholder="Search ingredients"
        />
      </div>
      <div className="flex items-center gap-2">
        <span>Effect</span>
        <input
          className="rounded-xl p-1"
          value={effectFilter}
          onChange={e => setEffectFilter(e.target.value)}
          placeholder="Search effect"
        />
      </div>
    </div>
  </header>
);

export default Header;
