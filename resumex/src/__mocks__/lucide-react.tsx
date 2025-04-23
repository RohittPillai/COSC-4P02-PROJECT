import React from 'react';

const createIconComponent = (name: string) => {
  const IconComponent = (props: any) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <rect x={0} y={0} width={24} height={24} />
      <text x={12} y={12} textAnchor="middle" dominantBaseline="middle" fill="currentColor">
        {name}
      </text>
    </svg>
  );
  IconComponent.displayName = name;
  return IconComponent;
};

// Add all icons used in your components
export const Github = createIconComponent('Github');
export const Twitter = createIconComponent('Twitter');
export const Facebook = createIconComponent('Facebook');
export const Instagram = createIconComponent('Instagram');
export const Linkedin = createIconComponent('Linkedin');
export const Menu = createIconComponent('Menu');
export const X = createIconComponent('X');
export const ChevronDown = createIconComponent('ChevronDown');
export const ChevronUp = createIconComponent('ChevronUp');
export const Check = createIconComponent('Check');
export const Plus = createIconComponent('Plus');
export const Minus = createIconComponent('Minus');
export const Download = createIconComponent('Download');
export const Edit = createIconComponent('Edit');
export const Trash = createIconComponent('Trash');
export const Save = createIconComponent('Save');
export const Share = createIconComponent('Share');
export const Copy = createIconComponent('Copy');
export const Eye = createIconComponent('Eye');
export const EyeOff = createIconComponent('EyeOff');
export const Lock = createIconComponent('Lock');
export const Unlock = createIconComponent('Unlock');
export const Settings = createIconComponent('Settings');
export const User = createIconComponent('User');
export const Mail = createIconComponent('Mail');
export const Phone = createIconComponent('Phone');
export const Calendar = createIconComponent('Calendar');
export const Clock = createIconComponent('Clock');
export const Search = createIconComponent('Search');
export const Filter = createIconComponent('Filter');
export const Sort = createIconComponent('Sort');
export const ArrowUp = createIconComponent('ArrowUp');
export const ArrowDown = createIconComponent('ArrowDown');
export const ArrowLeft = createIconComponent('ArrowLeft');
export const ArrowRight = createIconComponent('ArrowRight');
export const Home = createIconComponent('Home');
export const Info = createIconComponent('Info');
export const Help = createIconComponent('Help');
export const Warning = createIconComponent('Warning');
export const Error = createIconComponent('Error');
export const Success = createIconComponent('Success');
export const Star = createIconComponent('Star');
export const Heart = createIconComponent('Heart');
export const Bell = createIconComponent('Bell');
export const Send = createIconComponent('Send');
export const Upload = createIconComponent('Upload');
export const Loader = createIconComponent('Loader'); 