'use client';

import { useState, useRef } from 'react';
import { CloudinaryUploadResponse } from '@/lib/cloudinary';

interface ImageUploadProps {
  onUploadSuccess?: (response: CloudinaryUploadResponse) => void;
  onUploadError?: (error: string) => void;
  folder?: string;
  accept?: string;
  multiple?: boolean;
}

export function ImageUpload({
  onUploadSuccess,
  onUploadError,
  folder = 'ecommerce',
  accept = 'image/*',
  multiple = false,
}: ImageUploadProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUpload = async (files: FileList | null) => {
    if (!files) return;

    for (const file of Array.from(files)) {
      setIsLoading(true);
      setProgress(0);

      try {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('folder', folder);

        const xhr = new XMLHttpRequest();

        // Track upload progress
        xhr.upload.addEventListener('progress', (e) => {
          if (e.lengthComputable) {
            const percentComplete = (e.loaded / e.total) * 100;
            setProgress(Math.round(percentComplete));
          }
        });

        // Handle completion
        xhr.addEventListener('load', () => {
          if (xhr.status === 200) {
            const response = JSON.parse(xhr.responseText);
            onUploadSuccess?.(response);
            setProgress(0);
          } else {
            const error = JSON.parse(xhr.responseText);
            onUploadError?.(error.error || 'Upload failed');
          }
        });

        // Handle error
        xhr.addEventListener('error', () => {
          onUploadError?.('Network error during upload');
        });

        xhr.open('POST', '/api/upload');
        xhr.send(formData);
      } catch (error) {
        onUploadError?.(error instanceof Error ? error.message : 'Upload failed');
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleUpload(e.target.files);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    handleUpload(e.dataTransfer.files);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  return (
    <div className="w-full">
      <input
        ref={fileInputRef}
        type="file"
        accept={accept}
        multiple={multiple}
        onChange={handleFileChange}
        className="hidden"
      />

      <div
        onClick={() => fileInputRef.current?.click()}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition"
      >
        <svg
          className="mx-auto h-12 w-12 text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 4v16m8-8H4"
          />
        </svg>
        <p className="mt-2 text-sm font-medium text-gray-700">
          Drop images here or click to upload
        </p>
        <p className="text-xs text-gray-500 mt-1">PNG, JPG, WebP up to 10MB</p>
      </div>

      {isLoading && (
        <div className="mt-4">
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-sm text-gray-600 mt-2">{progress}% uploaded</p>
        </div>
      )}
    </div>
  );
}
