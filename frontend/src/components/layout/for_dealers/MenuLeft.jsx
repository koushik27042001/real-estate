import { dealersMenu } from "./menuConfig";

const MenuLeft = ({ active, setActive }) => {
  const categories = Object.keys(dealersMenu);

  return (
    <ul className="space-y-3 text-sm font-semibold uppercase tracking-wide">
      {categories.map((cat) => (
        <li
          key={cat}
          onMouseEnter={() => setActive(cat)}
          className={`cursor-pointer rounded-lg px-3 py-2 transition-colors ${
            active === cat ? "bg-sky-100 text-sky-700" : "text-slate-700 hover:bg-slate-100 hover:text-sky-600"
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
