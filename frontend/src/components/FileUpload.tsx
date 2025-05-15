import React, { useState } from 'react';
import { UploadCloudIcon, FileTextIcon, LoaderIcon } from 'lucide-react';

const FileUpload = () => {
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [downloadLink, setDownloadLink] = useState<string | null>(null);
  const [message, setMessage] = useState('');

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const droppedFile = e.dataTransfer.files[0];
      if (droppedFile.type === 'application/pdf') {
        setFile(droppedFile);
      } else {
        alert('Please upload a PDF file');
      }
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      if (selectedFile.type === 'application/pdf') {
        setFile(selectedFile);
      } else {
        alert('Please upload a PDF file');
      }
    }
  };

  const handleUpload = async () => {
    if (!file) return;
    setIsUploading(true);
    setUploadProgress(0);
    setMessage('');
    setDownloadLink(null);

    const formData = new FormData();
    formData.append("file", file);

    for (let i = 0; i <= 100; i += 10) {
      await new Promise(r => setTimeout(r, 600)); // 50ms delay
      setUploadProgress(i);
    }

    try {
      const response = await fetch("https://recallr-backend.onrender.com/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Upload failed");

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);


      // Optional: let the user download again or show a message
      setUploadProgress(100);
      setDownloadLink(url);
      setMessage("✅ Your Anki cards are ready!");

      // Adjust according to your FastAPI response

    } catch (error) {
      console.error("Upload error:", error);
      alert("Something went wrong during upload.");
    } finally {
      setTimeout(() => {
        setIsUploading(false);
      }, 300);
    }
  };

  const handleRemoveFile = () => {
    setFile(null);
    setMessage('');
    setDownloadLink(null);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      {!file ? (
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`border-2 border-dashed rounded-lg p-8 text-center ${isDragging ? 'border-indigo-500 bg-indigo-50' : 'border-gray-300 hover:border-indigo-400'
            } transition-colors duration-200 cursor-pointer`}
        >
          <UploadCloudIcon className="mx-auto h-12 w-12 text-gray-400" />
          <p className="mt-4 text-lg font-medium text-gray-700">
            Drag and drop your PDF here
          </p>
          <p className="mt-2 text-sm text-gray-500">or</p>
          <input
            id="file-upload"
            name="file-upload"
            type="file"
            accept=".pdf"
            className="hidden"
            onChange={handleFileChange}
          />
          <label
            htmlFor="file-upload"
            className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Select PDF file
          </label>
          <p className="mt-2 text-xs text-gray-500">PDF files only, max 10MB</p>
        </div>
      ) : (
        <div className="border rounded-lg p-6">
          <div className="flex items-center">
            <FileTextIcon className="h-10 w-10 text-indigo-500" />
            <div className="ml-4 flex-1">
              <p className="font-medium text-gray-900 truncate">{file.name}</p>
              <p className="text-sm text-gray-500">
                {(file.size / 1024 / 1024).toFixed(2)} MB
              </p>
            </div>
            {!isUploading && (
              <button
                onClick={handleRemoveFile}
                className="ml-4 text-gray-400 hover:text-gray-500"
              >
                Remove
              </button>
            )}
          </div>

          {isUploading ? (
            <div className="mt-4">
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div
                  className="bg-gradient-to-r from-indigo-600 to-purple-600 h-2.5 rounded-full"
                  style={{ width: `${uploadProgress}%` }}
                ></div>
              </div>
              <div className="flex justify-between mt-2">
                <span className="text-sm text-gray-500">Processing...</span>
                <span className="text-sm text-gray-500">{uploadProgress}%</span>
              </div>
            </div>
          ) : (
            <button
              onClick={handleUpload}
              className="mt-4 w-full inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Convert to Anki Cards
            </button>
          )}
        </div>
      )}

      {message && (
        <div className="mt-6 bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
          <h3 className="text-lg font-semibold text-green-600">{message}</h3>

          {downloadLink && (
            <button
              onClick={() => {
                const link = document.createElement('a');
                link.href = downloadLink;
                link.download = 'anki_cards.apkg';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                // Optionally revoke the blob URL after download
                window.URL.revokeObjectURL(downloadLink);
              }}
              className="mt-4 inline-flex items-center justify-center px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium rounded-md shadow hover:from-indigo-700 hover:to-purple-700 transition"
            >
              ⬇️ Download .apkg
            </button>
          )}


          <div className="mt-4 text-sm text-gray-600 space-y-1">
            <p>🧠 <strong>How to import into Anki:</strong></p>
            <ul className="list-disc pl-5">
              <li>Open the Anki desktop app</li>
              <li>Click on <strong>File → Import</strong></li>
              <li>Select the downloaded <code>.apkg</code> file</li>
              <li>Click <strong>Open</strong> — your cards will be added!</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default FileUpload;
