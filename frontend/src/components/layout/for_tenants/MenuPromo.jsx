const MenuPromo = () => {
  return (
    <div className="rounded-xl border border-blue-100 bg-blue-50 p-4">
      <div className="mb-3 flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded bg-blue-600 text-white text-xs font-bold">
          i
        </div>
        <div>
          <div className="text-[10px] font-bold uppercase text-blue-600">Introducing</div>
          <div className="text-lg font-bold text-gray-800">Insights</div>
        </div>
      </div>
      <ul className="space-y-2 text-sm text-gray-700">
        <li>Understand localities</li>
        <li>Read resident reviews</li>
        <li>Check price trends</li>
        <li>Tools, utilities & more</li>
      </ul>
    </div>
  );
};

export default MenuPromo;
