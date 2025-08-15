import './App.css'
// S3FileUploader.jsx
import React, { useState } from 'react';
import { uploadData } from 'aws-amplify/storage';

const S3FileUploader = () => {
  const [files, setFiles] = useState([]);
  const [uploadStatus, setUploadStatus] = useState({});

  const handleFileChange = (e) => {
    setFiles(Array.from(e.target.files));
    setUploadStatus({});
  };

  const handleUpload = async () => {
    for (const file of files) {
      try {
        setUploadStatus((prev) => ({
          ...prev,
          [file.name]: 'Uploading...',
        }));

        const result = await uploadData({path: file.name, data: file}).result;

        setUploadStatus((prev) => ({
          ...prev,
          [file.name]: `✅ Uploaded to S3 with Size ${result.size}`,
        }));
      } catch (err) {
        console.error(err);
        setUploadStatus((prev) => ({
          ...prev,
          [file.name]: '❌ Upload failed',
        }));
      }
    }
  };

  return (
    <div>
      <h2>Upload Files</h2>
      <input type="file" multiple onChange={handleFileChange} />
      <button onClick={handleUpload} disabled={files.length === 0}>
        Upload
      </button>
      <ul>
        {files.map((file) => (
          <li key={file.name}>
            {file.name}: {uploadStatus[file.name] || 'Waiting'}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default S3FileUploader;
