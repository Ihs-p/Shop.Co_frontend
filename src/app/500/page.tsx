import Link from "next/link";

export default function Custom500() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100">
      {/* Error Icon */}
      <div className="mb-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-24 w-24 text-red-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M10.29 3.86L1.82 12.34c-.78.78-.78 2.04 0 2.82l8.47 8.47c.78.78 2.04.78 2.82 0l8.47-8.47c.78-.78.78-2.04 0-2.82L13.11 3.86c-.78-.78-2.04-.78-2.82 0z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 11h.01M9 11h.01M12 15h.01"
          />
        </svg>
      </div>

      {/* Title */}
      <h1 className="text-4xl font-bold text-gray-800">500 - Server Error</h1>

      {/* Description */}
      <p className="text-gray-600 mt-4">
        Oops! Something went wrong on our end. Please try again later.
      </p>

      {/* Back to Home Button */}
      <div className="mt-6">
        <Link
          href="/"
          className="px-6 py-3 text-white bg-black rounded-full hover:bg-gray-800 transition"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  );
}
