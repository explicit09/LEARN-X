
import { useState, useEffect, useRef } from 'react';
import * as pdfjs from 'pdfjs-dist';
import { downloadDocument } from '@/api/services';
import { toast } from 'sonner';

// Initialize PDF.js worker
const pdfjsLib = pdfjs;
pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.js`;

interface PdfViewerProps {
  documentId: string;
}

const PdfViewer = ({ documentId }: PdfViewerProps) => {
  const [pdf, setPdf] = useState<pdfjs.PDFDocumentProxy | null>(null);
  const [numPages, setNumPages] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [scale, setScale] = useState<number>(1.2);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const loadPdf = async () => {
      setIsLoading(true);
      
      try {
        // Download the document as a blob
        const pdfBlob = await downloadDocument(documentId);
        const pdfData = await pdfBlob.arrayBuffer();
        
        // Load the PDF
        const loadedPdf = await pdfjsLib.getDocument({ data: pdfData }).promise;
        setPdf(loadedPdf);
        setNumPages(loadedPdf.numPages);
      } catch (error) {
        console.error('Failed to load PDF:', error);
        toast.error('Failed to load PDF');
      } finally {
        setIsLoading(false);
      }
    };
    
    loadPdf();
    
    return () => {
      // Clean up: cancel any render tasks
      if (pdf) {
        pdf.cleanup();
        pdf.destroy();
      }
    };
  }, [documentId]);
  
  useEffect(() => {
    const renderPage = async () => {
      if (!pdf || !canvasRef.current) return;
      
      try {
        // Get the page
        const page = await pdf.getPage(currentPage);
        
        // Prepare canvas for rendering
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        
        if (!context) return;
        
        // Calculate viewport to render the page at the specified scale
        const viewport = page.getViewport({ scale });
        canvas.height = viewport.height;
        canvas.width = viewport.width;
        
        // Render the page
        const renderContext = {
          canvasContext: context,
          viewport: viewport
        };
        
        await page.render(renderContext).promise;
      } catch (error) {
        console.error('Failed to render page:', error);
        toast.error(`Failed to render page ${currentPage}`);
      }
    };
    
    renderPage();
  }, [pdf, currentPage, scale]);
  
  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  
  const goToNextPage = () => {
    if (currentPage < numPages) {
      setCurrentPage(currentPage + 1);
    }
  };
  
  const zoomIn = () => {
    setScale(prevScale => Math.min(prevScale + 0.2, 3.0));
  };
  
  const zoomOut = () => {
    setScale(prevScale => Math.max(prevScale - 0.2, 0.6));
  };
  
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full w-full bg-muted rounded-md p-8">
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-sm text-gray-500">Loading PDF...</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="pdf-container">
      <div className="bg-white border-b p-2 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <button
            onClick={goToPreviousPage}
            disabled={currentPage <= 1}
            className="p-1 rounded-md hover:bg-gray-100 disabled:opacity-50"
          >
            <svg 
              className="w-5 h-5" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M15 19l-7-7 7-7" 
              />
            </svg>
          </button>
          
          <span className="text-sm">
            Page {currentPage} of {numPages}
          </span>
          
          <button
            onClick={goToNextPage}
            disabled={currentPage >= numPages}
            className="p-1 rounded-md hover:bg-gray-100 disabled:opacity-50"
          >
            <svg 
              className="w-5 h-5" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M9 5l7 7-7 7" 
              />
            </svg>
          </button>
        </div>
        
        <div className="flex items-center space-x-2">
          <button
            onClick={zoomOut}
            className="p-1 rounded-md hover:bg-gray-100"
          >
            <svg 
              className="w-5 h-5" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M20 12H4" 
              />
            </svg>
          </button>
          
          <span className="text-sm">{Math.round(scale * 100)}%</span>
          
          <button
            onClick={zoomIn}
            className="p-1 rounded-md hover:bg-gray-100"
          >
            <svg 
              className="w-5 h-5" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M12 4v16m8-8H4" 
              />
            </svg>
          </button>
        </div>
      </div>
      
      <div className="flex-1 overflow-auto bg-gray-100 p-4">
        <div className="pdf-page relative">
          <canvas ref={canvasRef} className="mx-auto shadow-lg" />
        </div>
      </div>
    </div>
  );
};

export default PdfViewer;
