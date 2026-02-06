import { dealersMenu } from "./menuConfig";

const MenuLeft = ({ active, setActive }) => {
  const categories = Object.keys(dealersMenu);

  return (
    <ul className="space-y-4 text-sm font-semibold uppercase tracking-wide text-gray-700">
      {categories.map((cat) => (
        <li
          key={cat}
          onMouseEnter={() => setActive(cat)}
          className={`cursor-pointer transition-colors ${
            active === cat ? "text-blue-600" : "text-gray-800 hover:text-blue-600"
          }`}
        >
          {cat}
        </li>
      ))}
      <li className="pt-6 text-[11px] font-normal normal-case text-gray-500">
        contact us toll free on
        <div className="text-sm font-semibold text-gray-700">1800 41 99099</div>
        <div className="text-[10px] text-gray-400">(9AM-11PM IST)</div>
      </li>
    </ul>
  );
};

export default MenuLeft;
