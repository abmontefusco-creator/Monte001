import React from "react";
import { Card } from "./Card.jsx";

export const StatCard = ({ icon, title, value, children }) => (
  <Card>
    <div className="flex items-center">
      <div className="p-3 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-500 dark:text-blue-300 mr-4">
        {icon}
      </div>
      <div>
        <p className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">{title}</p>
        <p className="text-2xl font-semibold text-gray-900 dark:text-white">{value}</p>
      </div>
    </div>
    {children && <div className="mt-4">{children}</div>}
  </Card>
);
