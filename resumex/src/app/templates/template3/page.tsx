"use client";

import React from "react";

const InProgressPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-black text-white">
      <div className="text-center space-y-4 animate-pulse">
        <h1 className="text-4xl font-bold tracking-widest uppercase">Coming Soon</h1>
        <p className="text-lg text-gray-300">This page is currently under development.</p>
        <p className="text-sm text-gray-500">Stay tuned for updates!</p>
      </div>
    </div>
  );
};

export default InProgressPage;