
import React from 'react';

const StatsCard = ({ title, count, icon: Icon, color = "text-blue-600", bg = "bg-blue-50", onClick }) => {
  return (
    <div 
      onClick={onClick}
      className="cursor-pointer bg-white rounded-xl shadow-sm border border-gray-100 p-5 hover:shadow-md transition-all duration-200"
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500 font-medium">{title}</p>
          <p className="text-2xl font-bold text-gray-800 mt-1">{count}</p>
        </div>
        <div className={`${bg} p-3 rounded-full`}>
          <Icon className={`h-5 w-5 ${color}`} />
        </div>
      </div>
    </div>
  );
};

export default StatsCard;