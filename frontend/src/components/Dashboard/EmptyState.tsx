import React from 'react'; // Import React for ReactNode type

interface EmptyStateProps {
  onUploadClick: () => void;
  iconElement: React.ReactNode;
  headline: string;
  subtext: string;
  buttonText: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({ 
  onUploadClick, 
  iconElement,
  headline,
  subtext,
  buttonText 
}) => {
  return (
    <div className="flex flex-col items-center justify-center text-center p-10 border border-gray-200 rounded-lg bg-white shadow-sm">
      <div className="mb-6">
        {iconElement}
      </div>
      <h2 className="text-2xl font-semibold text-gray-800 mb-3">
        {headline}
      </h2>
      <p className="text-lg text-gray-600 mb-8">
        {subtext}
      </p>
      <button
        onClick={onUploadClick}
        className="bg-primary text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:bg-teal-700 transition-colors duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50"
      >
        {buttonText}
      </button>
    </div>
  );
};

export default EmptyState;
