export default function BusinessInfo() {
  return (
    <div className="w-full max-w-4xl mx-auto py-8 px-4">
      <div className="bg-white/80 backdrop-blur-sm rounded-lg shadow-lg p-6 border border-white/20">
        <h2 className="text-2xl font-bold mb-4 text-blue-900">About Nawa Fuku</h2>
        <p className="text-gray-700 mb-6">
          Welcome to Nawa Fuku, your destination for delicious homemade kue kering and cheese cake in Jakarta. 
          We take pride in crafting traditional kue kering with premium ingredients and creating 
          irresistible cheese cakes that will satisfy your sweet cravings.
        </p>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h3 className="text-xl font-semibold flex items-center gap-2 text-blue-800">
              Our Specialties
            </h3>
            <div className="space-y-2 text-gray-700">
              <p className="flex justify-between">
                <span>Kue Kering</span>
                <span>Various Flavors</span>
              </p>
              <p className="flex justify-between">
                <span>Cheese Cake</span>
                <span>Fresh Daily</span>
              </p>
              <p className="flex justify-between">
                <span>Special Orders</span>
                <span>Available</span>
              </p>
            </div>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-xl font-semibold flex items-center gap-2 text-blue-800">
              Location & Delivery
            </h3>
            <p className="text-gray-700">
              Based in Jakarta, Indonesia<br />
              Available for nationwide shipping<br />
              Fresh delivery within Jakarta area
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 