export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white mt-8">
      <div className="max-w-4xl mx-auto py-8 px-4">
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-semibold mb-4">Contact Us</h3>
            <div className="space-y-2">
              <a
                href="https://wa.me/6285694481583"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-green-400 transition"
              >
                <span>+62 856-9448-1583</span>
              </a>
              <a
                href="https://instagram.com/nawa.fuku"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-pink-400 transition"
              >
                <span>@nawa.fuku</span>
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-xl font-semibold mb-4">About</h3>
            <p className="text-gray-400">
              Nawa Fuku brings you delightful homemade treats in Jakarta. 
              We specialize in traditional kue kering and freshly baked cheese cakes, 
              made with love and the finest ingredients.
            </p>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} Nawa Fuku. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
} 