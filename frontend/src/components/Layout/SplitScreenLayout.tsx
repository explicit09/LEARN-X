import { useState, ReactNode } from 'react';
import { Box, Flex, IconButton, useBreakpointValue } from '@chakra-ui/react';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';

interface SplitScreenLayoutProps {
  leftContent: ReactNode;
  rightContent: ReactNode;
  initialLeftSize?: number; // Percentage (0-100)
}

const SplitScreenLayout = ({
  leftContent,
  rightContent,
  initialLeftSize = 50
}: SplitScreenLayoutProps) => {
  const [leftSize, setLeftSize] = useState(initialLeftSize);
  const [isDragging, setIsDragging] = useState(false);
  
  // Use responsive layout on smaller screens
  const isMobile = useBreakpointValue({ base: true, lg: false });
  const [showLeftPanel, setShowLeftPanel] = useState(true);

  // Handle drag resize
  const handleMouseDown = () => {
    setIsDragging(true);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    
    const containerRect = e.currentTarget.getBoundingClientRect();
    const newLeftSize = Math.min(
      Math.max(
        ((e.clientX - containerRect.left) / containerRect.width) * 100,
        20 // Min 20%
      ),
      80 // Max 80%
    );
    
    setLeftSize(newLeftSize);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Handle mobile toggle
  const togglePanel = () => {
    setShowLeftPanel(!showLeftPanel);
  };

  // Mobile layout
  if (isMobile) {
    return (
      <Flex 
        direction="column" 
        h="100vh" 
        position="relative"
        onMouseUp={handleMouseUp}
      >
        <Box 
          position="absolute"
          top="50%" 
          right={showLeftPanel ? '10px' : 'calc(100% - 30px)'} 
          zIndex={10}
          transform="translateY(-50%)"
        >
          <IconButton
            aria-label={showLeftPanel ? "Show chat" : "Show document"}
            icon={showLeftPanel ? <ChevronRightIcon /> : <ChevronLeftIcon />}
            onClick={togglePanel}
            colorScheme="teal"
            size="sm"
          />
        </Box>
        
        <Box 
          h="100%" 
          w="100%" 
          display={showLeftPanel ? "block" : "none"}
          overflow="hidden"
        >
          {leftContent}
        </Box>
        
        <Box 
          h="100%" 
          w="100%" 
          display={!showLeftPanel ? "block" : "none"}
          overflow="hidden"
        >
          {rightContent}
        </Box>
      </Flex>
    );
  }

  // Desktop layout
  return (
    <Flex 
      h="100vh" 
      onMouseMove={handleMouseMove} 
      onMouseUp={handleMouseUp} 
      onMouseLeave={handleMouseUp}
      position="relative"
      userSelect={isDragging ? "none" : "auto"}
    >
      <Box 
        h="100%" 
        w={`${leftSize}%`}
        overflow="hidden"
      >
        {leftContent}
      </Box>
      
      {/* Resizer */}
      <Box
        w="6px"
        h="100%"
        bg="gray.200"
        cursor="col-resize"
        onMouseDown={handleMouseDown}
        _hover={{ bg: "teal.300" }}
        _active={{ bg: "teal.400" }}
        transition="background 0.2s"
      />
      
      <Box 
        h="100%" 
        w={`${100 - leftSize}%`}
        overflow="hidden"
      >
        {rightContent}
      </Box>
    </Flex>
  );
};

export default SplitScreenLayout;
