const DeliveryDetail = () => {
  return (
    <div>
      <h2 className="mb-5 text-lg font-black text-gray-900">
        Delivery Details
      </h2>
      <div className="space-y-4">
        <div>
          <label
            htmlFor=""
            className="mb-1.5 block text-sm font-semibold text-gray-700"
          >
            Full Name *
          </label>
          <input
            type="text"
            placeholder="e.g. Sarina Shrestha"
            className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm font-medium placeholder-gray-400 transition-all focus:ring-2 focus:ring-[#FF7A00] focus:outline-none"
          />
        </div>
        <div>
          <label
            htmlFor=""
            className="mb-1.5 block text-sm font-semibold text-gray-700"
          >
            Phone Number *
          </label>
          <input
            type="number"
            placeholder="e.g. 9867517425"
            className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm font-medium placeholder-gray-400 transition-all focus:ring-2 focus:ring-[#FF7A00] focus:outline-none"
          />
        </div>
        <div>
          <label
            htmlFor=""
            className="mb-1.5 block text-sm font-semibold text-gray-700"
          >
            Delivery Address *
          </label>
          <textarea
            placeholder="e.g. 123 Thamel, Kathmandu"
            className="w-full resize-none rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm font-medium placeholder-gray-400 transition-all focus:ring-2 focus:ring-[#FF7A00] focus:outline-none"
          />
        </div>
        <div>
          <label
            htmlFor=""
            className="mb-1.5 block text-sm font-semibold text-gray-700"
          >
            Order Notes *
          </label>
          <textarea
            name=""
            id=""
            placeholder="Any special requests?"
            className="w-full resize-none rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm font-medium placeholder-gray-400 transition-all focus:ring-2 focus:ring-[#FF7A00] focus:outline-none"
          />
        </div>
      </div>
    </div>
  )
}

export default DeliveryDetail
