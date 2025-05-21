
import { Message } from '@/api/types';
import CitationTooltip from './CitationTooltip';

interface MessageBubbleProps {
  message: Message;
}

const MessageBubble = ({ message }: MessageBubbleProps) => {
  const isUser = message.role === 'user';
  
  // Insert citations as superscript markers
  const renderContent = () => {
    if (!message.citations || message.citations.length === 0 || isUser) {
      return <p>{message.content}</p>;
    }
    
    // This is a very simple citation renderer
    // In a real implementation, you'd need to parse the content
    // to place citations at specific positions
    return (
      <div>
        <p>{message.content}</p>
        <div className="mt-2 flex flex-wrap gap-1">
          {message.citations.map((citation, index) => (
            <CitationTooltip 
              key={citation.id || index}
              citation={citation}
              index={index}
            />
          ))}
        </div>
      </div>
    );
  };
  
  return (
    <div className={`message-bubble ${isUser ? 'user-message' : 'assistant-message'}`}>
      {renderContent()}
    </div>
  );
};

export default MessageBubble;
