import React from 'react';

function Loading() {
  return (
    <>
      <style>
        {`
        .loader {
          width: 100%;
          height: 500px;
          font-weight: bold;
          font-family: 'Courier New', monospace;
          font-size: 30px;
          text-align: center;
          color: #4B5563; /* Tailwind's gray-500 */
          background: linear-gradient(90deg, #E5E7EB 25%, #D1D5DB 50%, #E5E7EB 75%);
          background-size: 200% 100%;
          animation: shimmer 2s infinite, l4 1s steps(4) infinite;
          clip-path: inset(0 3ch 0 0);

        }

        .loader:before {
          content: "Loading...";
        }

        @keyframes shimmer {
          0% {
            background-position: 200% 0;
          }
          100% {
            background-position: -200% 0;
          }
        }

        @keyframes l4 {
          to {
            clip-path: inset(0 -1ch 0 0);
          }
        }
        `}
      </style>
      <div className="loader"></div>
    </>
  );
}

export default Loading;
