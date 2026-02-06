import { ownersMenu } from "./menuConfig";

const MenuMiddle = ({ active }) => {
  const data = ownersMenu[active];

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
            {link.highlight && (
              <span className="ml-2 rounded bg-green-100 px-2 py-0.5 text-[10px] font-bold text-green-700">
                {link.highlight}
              </span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MenuMiddle;
