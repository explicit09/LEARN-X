
import { useState } from 'react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Citation } from '@/api/types';

interface CitationTooltipProps {
  citation: Citation;
  index: number;
}

const CitationTooltip = ({ citation, index }: CitationTooltipProps) => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <TooltipProvider>
      <Tooltip open={isOpen} onOpenChange={setIsOpen}>
        <TooltipTrigger asChild>
          <span
            role="button"
            tabIndex={0}
            className="citation"
            onClick={() => setIsOpen(!isOpen)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                setIsOpen(!isOpen);
                e.preventDefault();
              }
            }}
          >
            {index + 1}
          </span>
        </TooltipTrigger>
        <TooltipContent className="max-w-md">
          <div className="p-1">
            <p className="text-sm">{citation.text}</p>
            <p className="text-xs text-gray-500 mt-1">Page {citation.page}</p>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default CitationTooltip;
