export default function SizeChart() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8 text-[#831113]">Size Chart</h1>

      <div className="mb-8">
        <p className="text-gray-600 mb-6">
          Find your perfect fit with our detailed size chart. All measurements are in inches.
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-50">
              <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Size</th>
              <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Length</th>
              <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Chest</th>
              <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Sleeve</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-gray-300 px-4 py-3 font-medium">S</td>
              <td className="border border-gray-300 px-4 py-3">28</td>
              <td className="border border-gray-300 px-4 py-3">40</td>
              <td className="border border-gray-300 px-4 py-3">23.5</td>
            </tr>
            <tr className="bg-gray-50">
              <td className="border border-gray-300 px-4 py-3 font-medium">M</td>
              <td className="border border-gray-300 px-4 py-3">29</td>
              <td className="border border-gray-300 px-4 py-3">42</td>
              <td className="border border-gray-300 px-4 py-3">24</td>
            </tr>
            <tr>
              <td className="border border-gray-300 px-4 py-3 font-medium">L</td>
              <td className="border border-gray-300 px-4 py-3">30</td>
              <td className="border border-gray-300 px-4 py-3">44</td>
              <td className="border border-gray-300 px-4 py-3">24.5</td>
            </tr>
            <tr className="bg-gray-50">
              <td className="border border-gray-300 px-4 py-3 font-medium">XL</td>
              <td className="border border-gray-300 px-4 py-3">31</td>
              <td className="border border-gray-300 px-4 py-3">46</td>
              <td className="border border-gray-300 px-4 py-3">25</td>
            </tr>
            <tr>
              <td className="border border-gray-300 px-4 py-3 font-medium">XXL</td>
              <td className="border border-gray-300 px-4 py-3">32</td>
              <td className="border border-gray-300 px-4 py-3">48</td>
              <td className="border border-gray-300 px-4 py-3">25.5</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="mt-8 p-6 bg-gray-50 rounded-lg">
        <h2 className="text-xl font-semibold mb-4 text-[#831113]">How to Measure</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div>
            <h3 className="font-medium mb-2">Length</h3>
            <p className="text-sm text-gray-600">Measure from the highest point of the shoulder to the bottom hem.</p>
          </div>
          <div>
            <h3 className="font-medium mb-2">Chest</h3>
            <p className="text-sm text-gray-600">Measure around the fullest part of your chest, keeping the tape horizontal.</p>
          </div>
          <div>
            <h3 className="font-medium mb-2">Sleeve</h3>
            <p className="text-sm text-gray-600">Measure from the shoulder seam down to the cuff edge.</p>
          </div>
        </div>
      </div>

      <div className="mt-8 text-center">
        <p className="text-gray-600">
          Still unsure about your size? <a href="/contact" className="text-[#831113] hover:underline">Contact us</a> for personalized assistance.
        </p>
      </div>
    </div>
  );
}