const DocCardSkeleton = () => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-4 animate-pulse">
      {/* Thumbnail Placeholder */}
      <div className="bg-gray-300 h-32 rounded-md mb-4"></div>

      {/* Title Placeholder */}
      <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
      <div className="h-4 bg-gray-300 rounded w-1/2 mb-4"></div>


      {/* Last Opened Placeholder */}
      <div className="h-3 bg-gray-300 rounded w-1/2 mb-4"></div>
      
      {/* Progress Bar Placeholder */}
      <div className="mt-auto">
        <div className="h-2 bg-gray-300 rounded-full w-1/4 mb-1"></div>
        <div className="bg-gray-300 rounded-full h-2.5 w-full"></div>
      </div>
    </div>
  );
};

export default DocCardSkeleton;
