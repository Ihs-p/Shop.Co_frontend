import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-secondary flex flex-col justify-center items-center">
      {/* Container */}
      <div className="bg-white shadow-lg rounded-lg p-8 text-center max-w-md mx-auto">
        {/* Icon */}
        <div className="mb-6">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-20 w-20 text-gray-500 mx-auto"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9.75 9.75L14.25 14.25M14.25 9.75L9.75 14.25M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        {/* Title */}
        <h1 className="text-3xl font-bold text-gray-800">404 - Page Not Found</h1>
        {/* Description */}
        <p className="text-gray-600 mt-4">
          Oops! The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        {/* Back to Home Button */}
        <div className="mt-6">
          <Link
            href="/"
            className="px-10 py-4 border rounded-full border-black bg-black text-white font-semibold hover:bg-white hover:text-black transition"
          >
            Go Back Home
          </Link>
        </div>
      </div>
    </div>
  );
}
