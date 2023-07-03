import React, { useRef } from 'react';
import { Web3Storage } from 'web3.storage';

const getAccessToken = () => {
  return "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDQ5NTg0QzFjYjQ1QzczMTQwODQ3RjY2NjBkQ0Y5MzNjODNBM2NFMjAiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2ODc4OTc1NDg1NzIsIm5hbWUiOiJjb21tdXRlLWlvLXBmcC1zdG9yYWdlIn0.ocUIDWupDo_fnouuAGN2rPvsA2uhd-BG_eHvWal55Ps";
};

const makeStorageClient = () => {
  return new Web3Storage({ token: getAccessToken() });
};

const storeFiles = async (files) => {
  const client = makeStorageClient();
  const cid = await client.put(files);
  console.log('stored files with cid:', cid);
  retrieve(cid);
};

async function retrieve(cid) {
    try {
      const client = makeStorageClient();
      const res = await client.get(cid);
      console.log(`Got a response! [${res.status}] ${res.statusText}`);
      if (!res.ok) {
        throw new Error(`failed to get ${cid}`);
      }
  
      const baseWeb3StorageUrl = 'https://ipfs.io/ipfs/';
      const fileName = `${baseWeb3StorageUrl}${cid}`;
  
      console.log('Retrieved file name:', fileName);
  
      // Handle the response object here...
    } catch (error) {
      console.error('Error occurred during retrieval:', error);
    }
  }

const MyComponent = () => {
  const fileInputRef = useRef(null);

  const handleFileUpload = async () => {
    const file = fileInputRef.current.files[0];
    if (file) {
      const files = [file];
      await storeFiles(files);
    }
  };

  return (
    <div>
      <input type="file" ref={fileInputRef} accept="image/*" />
      <button onClick={handleFileUpload}>Upload</button>
    </div>
  );
};

export default MyComponent;
