type EffectsFilterProps = {
  effectFilter: string;
  setEffectFilter: (value: string) => void;
};

const EffectsFilter: React.FC<EffectsFilterProps> = ({
  effectFilter,
  setEffectFilter,
}) => (
  <div>
    <span>Effect</span>
    <input
      value={effectFilter}
      onChange={e => setEffectFilter(e.target.value)}
      placeholder="Search effect"
    />
  </div>
);

export default EffectsFilter;
