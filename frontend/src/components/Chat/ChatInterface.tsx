import { useState, forwardRef, useImperativeHandle } from 'react';
import {
  Box,
  Input,
  Flex,
  Text,
  VStack,
  Avatar,
  IconButton,
  useColorModeValue
} from '@chakra-ui/react';
import { ArrowUpIcon } from '@chakra-ui/icons';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

export interface ChatInterfaceHandle {
  askQuestion: (text: string) => void;
}

const ChatInterface = forwardRef<ChatInterfaceHandle, {}>((_, ref) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: 'Hello! I\'m your AI learning assistant. Upload a document or ask me questions about your study materials.',
      sender: 'ai',
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  
  const addUserMessage = (text: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      content: text,
      sender: 'user',
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMessage]);
  };

  const simulateAIResponse = () => {
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content:
          'This is a simulated response. In the actual application, this would be a response from your AI about the document you\'re viewing.',
        sender: 'ai',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiMessage]);
    }, 1000);
  };

  const handleSendMessage = () => {
    if (!input.trim()) return;
    addUserMessage(input);
    setInput('');
    simulateAIResponse();
  };

  useImperativeHandle(ref, () => ({
    askQuestion(text: string) {
      if (!text.trim()) return;
      addUserMessage(text);
      simulateAIResponse();
    }
  }));
  
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <Flex 
      direction="column" 
      h="100%" 
      bg={bgColor} 
      borderLeft="1px" 
      borderColor={borderColor}
    >
      {/* Chat header */}
      <Box p={4} borderBottom="1px" borderColor={borderColor}>
        <Text fontWeight="bold" fontSize="lg">Chat with AI Assistant</Text>
      </Box>
      
      {/* Messages area */}
      <VStack 
        flex="1" 
        p={4} 
        spacing={4} 
        overflowY="auto" 
        align="stretch"
      >
        {messages.map(message => (
          <Flex 
            key={message.id} 
            alignSelf={message.sender === 'user' ? 'flex-end' : 'flex-start'}
            maxW="80%"
            direction={message.sender === 'user' ? 'row-reverse' : 'row'}
          >
            <Avatar 
              size="sm" 
              name={message.sender === 'user' ? 'You' : 'AI'} 
              bg={message.sender === 'user' ? 'teal.500' : 'blue.500'} 
              color="white"
              mr={message.sender === 'user' ? 0 : 2}
              ml={message.sender === 'user' ? 2 : 0}
            />
            <Box 
              bg={message.sender === 'user' ? 'teal.500' : 'blue.100'} 
              color={message.sender === 'user' ? 'white' : 'black'}
              p={3} 
              borderRadius="lg"
            >
              <Text>{message.content}</Text>
              <Text fontSize="xs" color={message.sender === 'user' ? 'whiteAlpha.700' : 'gray.500'} textAlign="right">
                {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </Text>
            </Box>
          </Flex>
        ))}
      </VStack>
      
      {/* Input area */}
      <Flex p={4} borderTop="1px" borderColor={borderColor}>
        <Input
          placeholder="Type a message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          mr={2}
        />
        <IconButton
          colorScheme="teal"
          aria-label="Send message"
          icon={<ArrowUpIcon />}
          onClick={handleSendMessage}
        />
      </Flex>
    </Flex>
  );
};

export default ChatInterface;
