const OwnerBanner = () => {
  return (
    <div className="rounded-xl border border-blue-100 bg-blue-50 p-5">
      <h4 className="mb-2 text-sm font-bold text-gray-800">
        Sell or rent faster at the right price!
      </h4>
      <p className="mb-4 text-xs text-gray-600">List your property now for FREE</p>
      <button
        type="button"
        className="rounded bg-blue-600 px-4 py-2 text-xs font-bold uppercase tracking-wider text-white"
      >
        Post Property
      </button>
    </div>
  );
};

export default OwnerBanner;
