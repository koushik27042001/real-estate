import MenuLeft from "./MenuLeft";
import MenuMiddle from "./MenuMiddle";
import MenuPromo from "./MenuPromo";

const MegaMenu = ({ activeCategory, setActiveCategory, open, onMouseEnter, onMouseLeave }) => {
  if (!open) return null;

  return (
    <div
      className="absolute left-0 top-full z-[120] w-full"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className="mx-auto mt-3 w-full max-w-[1100px] overflow-hidden rounded-xl bg-white shadow-2xl">
        <div className="grid grid-cols-[240px_1fr_260px] gap-8">
          <div className="bg-gray-50 px-6 py-6">
            <MenuLeft active={activeCategory} setActive={setActiveCategory} />
          </div>
          <div className="px-4 py-6">
            <MenuMiddle active={activeCategory} />
          </div>
          <div className="px-6 py-6">
            <MenuPromo />
          </div>
        </div>
        <div className="border-t border-gray-100 px-6 py-3 text-xs text-gray-400">
          Email us at services@99acres.com or call us at 1800 41 99099 (IND Toll-Free)
        </div>
      </div>
    </div>
  );
};

export default MegaMenu;
