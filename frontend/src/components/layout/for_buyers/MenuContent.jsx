import { buyerMenu } from "./menuConfig";

const MenuContent = ({ activeCategory }) => {
  const data = buyerMenu[activeCategory];

  if (!data) return null;

  return (
    <div className="grid grid-cols-2 gap-10">
      {data.columns.map((col) => (
        <div key={col.title}>
          <h4 className="mb-3 text-[11px] font-bold uppercase tracking-wider text-gray-500">
            {col.title}
          </h4>
          <ul className="space-y-2 text-sm text-gray-700">
            {col.items.map((item) => (
              <li key={item} className="cursor-pointer hover:text-blue-600">
                {item}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default MenuContent;
