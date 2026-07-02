import React from 'react';

export const Loader = ({ fullScreen = false }) => {
  const content = (
    <div className="flex justify-center items-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-white/80 backdrop-blur-sm z-50 flex justify-center items-center">
        {content}
      </div>
    );
  }

  return <div className="p-8">{content}</div>;
};
