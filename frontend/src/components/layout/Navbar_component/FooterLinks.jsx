const FooterLinks = () => {
  return (
    <div className="mt-8 flex items-end justify-between text-sm text-gray-600">
      <div className="flex flex-wrap gap-4">
        <span>All India</span>
        <span>Dubai</span>
        <span>For NRI</span>
        <span>
          International
          <div className="text-xs text-gray-400">Powered by listglobally.com</div>
        </span>
      </div>

      <button type="button" className="font-semibold text-blue-600">
        View top cities →
      </button>
    </div>
  );
};

export default FooterLinks;
