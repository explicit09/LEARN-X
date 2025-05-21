import { useRef, useState } from 'react'; // Added useState
import { Box, Text, VStack, Spinner } from '@chakra-ui/react'; // Added Spinner
import { ArrowUpTrayIcon } from '@heroicons/react/24/outline';
import { uploadDocument } from '../../services/documents';

interface DragDropUploadProps {
  onUpload?: () => Promise<void> | void; // Allow onUpload to be async
  mainText?: string;
  subText?: string;
}
const DragDropUpload = ({ 
  onUpload, 
  mainText = "Drag & drop your PDF here", 
  subText = "or click to select a file" 
}: DragDropUploadProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleFiles = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    const file = files[0];
    setIsUploading(true);
    try {
      await uploadDocument(file);
      console.log('Uploaded file', file.name);
      if (onUpload) {
        await onUpload(); // Await if onUpload is async
      }
    } catch (err) {
      console.error('Failed to upload', file.name, err);
      // Optionally show an error message to the user here
    } finally {
      setIsUploading(false);
      // Clear the input value so the same file can be selected again if needed
      if (inputRef.current) {
        inputRef.current.value = ""; 
      }
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.currentTarget.classList.remove('border-primary');
    if (isUploading) return; // Prevent drop if already uploading
    handleFiles(e.dataTransfer.files);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (isUploading) return; // Prevent change if already uploading
    handleFiles(e.target.files);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (isUploading) return;
    e.currentTarget.classList.add('border-primary');
  };
  
  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (isUploading) return;
    e.currentTarget.classList.remove('border-primary');
  };

  const handleClick = () => {
    if (isUploading) return; // Prevent opening file dialog if uploading
    inputRef.current?.click();
  };

  return (
    <Box
      border="2px solid"
      borderColor={isUploading ? "teal.500" : "gray.300"} // Use teal border during upload
      className={`p-8 rounded-lg text-center transition-colors duration-200 ease-in-out bg-gray-50 ${isUploading ? 'cursor-not-allowed opacity-75' : 'cursor-pointer hover:bg-teal-50'}`}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onClick={handleClick}
    >
      {isUploading ? (
        <VStack spacing={4}>
          <Spinner size="xl" color="teal.500" />
          <Text className="text-xl text-teal-600">Uploading...</Text>
          <Text className="text-sm text-gray-500">Please wait while your document is being processed.</Text>
        </VStack>
      ) : (
        <VStack spacing={4}>
          <ArrowUpTrayIcon className="w-12 h-12 text-gray-400" />
          <Text className="text-xl text-gray-600">{mainText}</Text>
          <Text className="text-sm text-gray-500">{subText}</Text>
        </VStack>
      )}
      <input
        type="file"
        accept="application/pdf"
        ref={inputRef}
        style={{ display: 'none' }}
        onChange={handleChange}
        disabled={isUploading} // Disable input during upload
      />
    </Box>
  );
};

export default DragDropUpload;
