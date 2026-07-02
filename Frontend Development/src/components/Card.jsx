import React from 'react';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

export const Card = ({ children, className, noPadding = false, ...props }) => {
  return (
    <div 
      className={twMerge(
        clsx(
          'bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden',
          !noPadding && 'p-6',
          className
        )
      )}
      {...props}
    >
      {children}
    </div>
  );
};
