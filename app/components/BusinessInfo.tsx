
export default function BusinessInfo() {
  return (
    <div className="w-full max-w-4xl mx-auto py-8 px-4">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold mb-4">About Nawa Fuku</h2>
        <p className="text-gray-600 mb-6">
          Welcome to Nawa Fuku, your destination for authentic Japanese fashion in Indonesia. 
          We specialize in carefully curated Japanese clothing that combines traditional elements 
          with modern style.
        </p>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h3 className="text-xl font-semibold flex items-center gap-2">
              Business Hours
            </h3>
            <div className="space-y-2">
              <p className="flex justify-between">
                <span>Monday - Friday</span>
                <span>10:00 AM - 8:00 PM</span>
              </p>
              <p className="flex justify-between">
                <span>Saturday</span>
                <span>11:00 AM - 7:00 PM</span>
              </p>
              <p className="flex justify-between">
                <span>Sunday</span>
                <span>Closed</span>
              </p>
            </div>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-xl font-semibold flex items-center gap-2">
              Location
            </h3>
            <p className="text-gray-600">
              Jakarta, Indonesia<br />
              Available for nationwide shipping
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 