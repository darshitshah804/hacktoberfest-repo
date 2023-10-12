import React from 'react';

const ShimmerTodoList = () => {
  const shimmerRows = Array.from({ length: 7 }, (_, index) => (
    <div key={index} className="animate-pulse">
      <div className="bg-gray-200 h-8 w-full mb-4 rounded"></div> {/* Adjusted width to 3/4 (75%) */}
    </div>
  ));

  return (
    <div>
      {shimmerRows}      
    </div>
  );
};

export default ShimmerTodoList;
