import { DocumentTextIcon } from '@heroicons/react/outline'; // Using Heroicons v1

interface DocCardProps {
  title: string;
  lastOpened: string; // e.g., "Yesterday", "2 days ago"
  // thumbnailUrl?: string; // Optional: if we have actual thumbnails
  progress?: number; // Optional: e.g., 50 for 50%
}

const DocCard = ({ title, lastOpened, progress }: DocCardProps) => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-4 flex flex-col justify-between hover:shadow-xl transition-shadow duration-300">
      <div>
        {/* Thumbnail Placeholder */}
        <div className="bg-gray-200 h-32 rounded-md flex items-center justify-center mb-4">
          <DocumentTextIcon className="w-16 h-16 text-gray-400" />
        </div>

        {/* Title */}
        <h3 className="text-lg font-semibold text-gray-800 mb-1 truncate" title={title}>
          {title}
        </h3>

        {/* Last Opened */}
        <p className="text-sm text-gray-500 mb-2">
          Last opened: {lastOpened}
        </p>
      </div>

      {/* Progress Bar Placeholder */}
      {progress !== undefined && (
        <div className="mt-auto">
          <p className="text-xs text-gray-500 mb-1">Progress: {progress}%</p>
          <div className="bg-gray-200 rounded-full h-2.5">
            <div
              className="bg-primary h-2.5 rounded-full" // Using primary color from Tailwind config
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DocCard;
