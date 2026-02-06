import { dealersMenu } from "./menuConfig";

const MenuMiddle = ({ active }) => {
  const data = dealersMenu[active];

  if (!data) return null;

  return (
    <div>
      <h4 className="mb-3 text-[11px] font-bold uppercase tracking-wider text-gray-500">
        {data.title}
      </h4>
      <ul className="space-y-2 text-sm text-gray-700">
        {data.links.map((link) => (
          <li key={link.label} className="cursor-pointer hover:text-blue-600">
            {link.label}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MenuMiddle;
