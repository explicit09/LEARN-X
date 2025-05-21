
import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { useDocumentsStore } from '@/state/documentsStore';
import { toast } from 'sonner';

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 MB

const UploadArea = () => {
  const { uploadNewDocument, uploadProgress } = useDocumentsStore();
  const [title, setTitle] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const validateFile = (file: File): boolean => {
    // Check file type
    if (file.type !== 'application/pdf') {
      toast.error('Please upload a PDF file');
      return false;
    }
    
    // Check file size
    if (file.size > MAX_FILE_SIZE) {
      toast.error('File size exceeds 10 MB limit');
      return false;
    }
    
    return true;
  };
  
  const handleFileSelect = (file: File) => {
    if (validateFile(file)) {
      setSelectedFile(file);
      
      // Try to use filename (without extension) as title if not set
      if (!title) {
        const fileName = file.name.replace(/\.[^/.]+$/, '');
        setTitle(fileName);
      }
    } else {
      setSelectedFile(null);
    }
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFileSelect(files[0]);
    }
  };
  
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };
  
  const handleDragLeave = () => {
    setIsDragging(false);
  };
  
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      handleFileSelect(files[0]);
    }
  };
  
  const handleUpload = async () => {
    if (!selectedFile) {
      toast.error('Please select a file first');
      return;
    }
    
    try {
      await uploadNewDocument(selectedFile, title);
      toast.success('File uploaded successfully');
      setSelectedFile(null);
      setTitle('');
    } catch (error) {
      console.error('Upload error:', error);
    }
  };
  
  const openFileDialog = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-medium">Upload Document</h2>
        <span className="text-sm text-gray-500">Max: 10 MB</span>
      </div>
      
      <div 
        className={`
          border-2 border-dashed rounded-lg p-6 
          flex flex-col items-center justify-center space-y-4
          text-center cursor-pointer
          ${isDragging ? 'border-primary bg-primary/5' : 'border-gray-300 hover:border-gray-400'}
        `}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={openFileDialog}
      >
        <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
          <svg 
            className="w-6 h-6 text-primary" 
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
        </div>
        <div>
          <p className="text-sm font-medium">
            {selectedFile ? selectedFile.name : 'Click or drag file to upload'}
          </p>
          <p className="text-xs text-gray-500 mt-1">PDF only, up to 10 MB</p>
        </div>
        <Input 
          type="file"
          ref={fileInputRef}
          onChange={handleInputChange}
          accept=".pdf,application/pdf"
          className="hidden"
        />
      </div>
      
      {selectedFile && (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Document Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter document title"
            />
          </div>
          
          <Button 
            className="w-full" 
            onClick={handleUpload}
            disabled={!!uploadProgress}
          >
            {uploadProgress ? 'Uploading...' : 'Upload Document'}
          </Button>
        </div>
      )}
      
      {uploadProgress !== null && (
        <div className="space-y-2">
          <Progress value={uploadProgress} className="h-2" />
          <p className="text-xs text-gray-500 text-right">{uploadProgress}%</p>
        </div>
      )}
    </div>
  );
};

export default UploadArea;
