export default function Background() {
  return (
    <div className="fixed inset-0 -z-10">
      {/* Main gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-blue-50"></div>
      
      {/* Pattern overlay */}
      <div className="absolute inset-0 opacity-10">
        <svg width="100%" height="100%">
          <pattern
            id="leaves"
            x="0"
            y="0"
            width="40"
            height="40"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M20 2C14 2 10 6 10 12C10 18 14 22 20 22C26 22 30 18 30 12C30 6 26 2 20 2ZM20 4C24 4 28 7 28 12C28 17 24 20 20 20C16 20 12 17 12 12C12 7 16 4 20 4Z"
              fill="currentColor"
              className="text-blue-900"
            />
            <path
              d="M20 6C16 6 14 9 14 12C14 15 16 18 20 18C24 18 26 15 26 12C26 9 24 6 20 6Z"
              fill="currentColor"
              className="text-blue-800"
            />
          </pattern>
          <rect width="100%" height="100%" fill="url(#leaves)" />
        </svg>
      </div>
    </div>
  );
} 