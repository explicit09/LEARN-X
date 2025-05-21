import { useEffect, useRef, useState } from 'react';
import { Box, Button, Flex, Spinner, Text, IconButton } from '@chakra-ui/react';
import * as pdfjsLib from 'pdfjs-dist';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';

// Set worker source path
pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

interface PDFViewerProps {
  fileUrl: string;
}

const PDFViewer = ({ fileUrl }: PDFViewerProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [pdfDoc, setPdfDoc] = useState<pdfjsLib.PDFDocumentProxy | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const [scale, setScale] = useState(1.2);

  // Load PDF document
  useEffect(() => {
    setLoading(true);
    const loadDocument = async () => {
      try {
        const loadingTask = pdfjsLib.getDocument(fileUrl);
        const pdf = await loadingTask.promise;
        setPdfDoc(pdf);
        setTotalPages(pdf.numPages);
        setCurrentPage(1);
      } catch (error) {
        console.error('Error loading PDF document:', error);
      } finally {
        setLoading(false);
      }
    };

    if (fileUrl) {
      loadDocument();
    }
  }, [fileUrl]);

  // Render page
  useEffect(() => {
    if (!pdfDoc || !canvasRef.current) return;

    const renderPage = async () => {
      setLoading(true);
      try {
        const page = await pdfDoc.getPage(currentPage);
        const viewport = page.getViewport({ scale });
        
        const canvas = canvasRef.current;
        if (!canvas) return;
        
        const context = canvas.getContext('2d');
        if (!context) return;
        
        canvas.height = viewport.height;
        canvas.width = viewport.width;
        
        const renderContext = {
          canvasContext: context,
          viewport
        };
        
        await page.render(renderContext).promise;
      } catch (error) {
        console.error('Error rendering PDF page:', error);
      } finally {
        setLoading(false);
      }
    };

    renderPage();
  }, [pdfDoc, currentPage, scale]);

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const zoomIn = () => {
    setScale(prev => Math.min(prev + 0.2, 3)); // Max zoom: 3x
  };

  const zoomOut = () => {
    setScale(prev => Math.max(prev - 0.2, 0.5)); // Min zoom: 0.5x
  };

  const handleTextSelection = () => {
    const text = window.getSelection()?.toString();
    if (text) {
      // TODO: send selected text to generate a question automatically
      console.log('Selected text:', text);
    }
  };

  return (
    <Box className="pdf-viewer" w="100%" h="100%" bg="white" borderRadius="md" overflow="hidden">
      {loading && (
        <Flex justify="center" align="center" h="100%" w="100%">
          <Spinner size="xl" color="teal.500" />
        </Flex>
      )}
      
      <Flex direction="column" h="100%">
        <Flex justify="space-between" align="center" p={2} bg="gray.100">
          <Flex align="center">
            <IconButton
              aria-label="Previous page"
              icon={<ChevronLeftIcon />}
              onClick={prevPage}
              isDisabled={currentPage <= 1}
              size="sm"
              mr={1}
            />
            <Text fontSize="sm">
              Page {currentPage} of {totalPages}
            </Text>
            <IconButton
              aria-label="Next page"
              icon={<ChevronRightIcon />}
              onClick={nextPage}
              isDisabled={currentPage >= totalPages}
              size="sm" 
              ml={1}
            />
          </Flex>
          <Flex>
            <Button size="sm" onClick={zoomOut} mr={1}>-</Button>
            <Text fontSize="sm" mx={2}>{Math.round(scale * 100)}%</Text>
            <Button size="sm" onClick={zoomIn}>+</Button>
          </Flex>
        </Flex>
        
        <Box
          flex="1"
          p={4}
          overflow="auto"
          display="flex"
          justifyContent="center"
          onMouseUp={handleTextSelection}
        >
          <canvas ref={canvasRef} />
        </Box>
      </Flex>
    </Box>
  );
};

export default PDFViewer;
