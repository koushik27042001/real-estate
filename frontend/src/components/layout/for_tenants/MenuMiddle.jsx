import { tenantsMenu } from "./menuConfig";

const MenuMiddle = ({ active }) => {
  const data = tenantsMenu[active];

  if (!data) return null;

  return (
    <div>
      <h4 className="mb-3 text-[11px] font-bold uppercase tracking-wider text-gray-500">
        {data.title}
      </h4>
      <ul className="space-y-2 text-sm text-gray-700">
        {data.links.map((link) => (
          <li key={link} className="cursor-pointer hover:text-blue-600">
            {link}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MenuMiddle;
