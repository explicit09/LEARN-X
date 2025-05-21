import { useRef } from 'react';
import { Box, Text } from '@chakra-ui/react';
import { uploadDocument } from '../../services/documents';

interface DragDropUploadProps {
  onUpload?: () => void;
}
const DragDropUpload = ({ onUpload }: DragDropUploadProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFiles = (files: FileList | null) => {
    if (!files || files.length === 0) return;
    const file = files[0];
    uploadDocument(file)
      .then(() => {
        console.log('Uploaded file', file.name);
        onUpload?.();
      })
      .catch(() => {
        console.error('Failed to upload', file.name);
      });
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    handleFiles(e.dataTransfer.files);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleFiles(e.target.files);
  };

  return (
    <Box
      border="2px dashed"
      borderColor="gray.300"
      p={6}
      textAlign="center"
      borderRadius="md"
      onDrop={handleDrop}
      onDragOver={(e) => e.preventDefault()}
      cursor="pointer"
      onClick={() => inputRef.current?.click()}
    >
      <input
        type="file"
        accept="application/pdf"
        ref={inputRef}
        style={{ display: 'none' }}
        onChange={handleChange}
      />
      <Text color="gray.600">Drag & drop PDF here or click to select</Text>
    </Box>
  );
};

export default DragDropUpload;
