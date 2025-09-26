import React from "react";

const Shimmer = ({ className }) => (
  <div
    className={`bg-gray-300 rounded-md animate-pulse ${className}`}
    aria-busy="true"
    aria-label="Loading content"
  />
);

export default Shimmer;
