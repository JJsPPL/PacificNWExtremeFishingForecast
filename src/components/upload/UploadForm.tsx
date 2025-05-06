
import { useEffect, RefObject } from "react";
import { 
  FileItem, 
  ProcessingProgress, 
  ProcessingError,
  ProcessedDataSummary,
  DataPreview 
} from "@/components/upload/UploadStatusIndicators";
import { FileDropZone } from "@/components/upload/FileDropZone";
import { UploadControls } from "@/components/upload/UploadControls";
import { useFileUpload } from "@/hooks/useFileUpload";

interface UploadFormProps {
  fileInputRef: RefObject<HTMLInputElement>;
  setProcessedData: (data: any[] | null) => void;
  toast: any;
}

export const UploadForm: React.FC<UploadFormProps> = ({ 
  fileInputRef, 
  setProcessedData,
  toast 
}) => {
  const [
    { 
      isUploading, 
      selectedFile, 
      processingProgress, 
      processingError, 
      processedData, 
      originalRecordCount,
      dataFields 
    },
    { 
      handleFileChange, 
      handleUpload, 
      clearProcessedData, 
      setSelectedFile,
      loadExistingData
    }
  ] = useFileUpload({ setProcessedData, toast });

  // Load existing data on mount
  useEffect(() => {
    loadExistingData();
  }, []);

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const onFileChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileChange(e);
    }
  };

  return (
    <>
      <FileDropZone onFileSelect={triggerFileInput} />
      
      <UploadControls
        selectedFile={selectedFile}
        isUploading={isUploading}
        onFileSelect={triggerFileInput}
        onUpload={handleUpload}
        onRemoveFile={() => setSelectedFile(null)}
        fileInputRef={fileInputRef}
        toast={toast}
      />
      
      {selectedFile && (
        <FileItem fileName={selectedFile.name} onRemove={() => setSelectedFile(null)} />
      )}
      
      {processingError && (
        <ProcessingError message={processingError} />
      )}
      
      {isUploading && (
        <ProcessingProgress progress={processingProgress} />
      )}
      
      {processedData && processedData.length > 0 && (
        <>
          <ProcessedDataSummary 
            dataLength={processedData.length} 
            fileName={selectedFile?.name || ''} 
            originalCount={originalRecordCount}
            dataFields={dataFields}
            onReset={clearProcessedData} 
          />
          <DataPreview data={processedData} />
        </>
      )}
    </>
  );
};
