import React, { useState, useRef, useEffect } from 'react';
import AvatarEditor from 'react-avatar-editor';
import { Web3Storage } from 'web3.storage';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const ProfilePictureEditor = () => {
  const [image, setImage] = useState(null);
  const [editor, setEditor] = useState(null);
  const [scale, setScale] = useState(1);
  const [rotate, setRotate] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const fileInputRef = useRef(null);
  const [croppedImage,setCroppedImage] = useState(null);
  const [imageSrc, setImageSrc] = useState('');
  const [CID,setCID] = useState('');
  const [buttonAvailable,setButtonAvailable] = useState(false);


  const handleImageChange = () => {
    const file = fileInputRef.current.files[0];
    setImage(URL.createObjectURL(file));
  };

  const handleScaleChange = (event) => {
    const scaleValue = parseFloat(event.target.value);
    setScale(scaleValue);
  };

  const handleRotate = (direction) => {
    setRotate((prevRotate) => (direction === 'left' ? prevRotate - 90 : prevRotate + 90));
  };

   const handleCrop = async () => {
    if (editor) {
      const canvas = editor.getImageScaledToCanvas().toDataURL();
      setCroppedImage(canvas);
      await storeFiles(canvas);

      //console.log(canvas);
      // Do something with the cropped image canvas
    }
  };

  function getAccessToken() {
    return "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDQ5NTg0QzFjYjQ1QzczMTQwODQ3RjY2NjBkQ0Y5MzNjODNBM2NFMjAiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2ODc4OTc1NDg1NzIsIm5hbWUiOiJjb21tdXRlLWlvLXBmcC1zdG9yYWdlIn0.ocUIDWupDo_fnouuAGN2rPvsA2uhd-BG_eHvWal55Ps";
  }
  
  function makeStorageClient() {
    return new Web3Storage({ token: getAccessToken() });
  }

  const dataURLToBlob = async (dataURL) => {
    const response = await fetch(dataURL);
    const blob = await response.blob();
  
    // Extract file type from data URL
    const fileType = dataURL.split(',')[0].split(':')[1].split(';')[0].split('/')[1];
    // Generate a unique file name using a timestamp
    const fileName = `image.${fileType}`;
    return new File([blob], fileName, { type: blob.type });
  };
  
  
  const storeFiles = async (canvas) => {
    const blob = await dataURLToBlob(canvas);
    const files = [blob];
    console.log(typeof(files));
    const client = makeStorageClient();

    if (files==null) {
      console.error('No files selected.');
      return;
    }

    try {
        const cid = await client.put(files);
        alert();
        console.log('stored files with cid:',cid);
        setButtonAvailable(true);
        setCID(cid);
      
    } catch (error) {
      alert("There was an upload problem.")
      console.log(error);
    }
  };

  const handleRetrieveCroppedImage = async() => {
    await retrieve();
  };

  const retrieve = async () => {
    const client = makeStorageClient();

    try {
      if(!(CID=="")){
        const res = await client.get(CID);
        console.log(`Got a response! [${res.status}] ${res.statusText}`);
        if (!res.ok) {
          throw new Error(`Failed to get ${CID}`);
        }
        const baseWeb3StorageUrl = 'https://ipfs.io/ipfs/';
        const file = '/image.png';
        const fileName = `${baseWeb3StorageUrl}${CID}${file}`;
        console.log('Retrieved file name:', fileName);
        setImageSrc(fileName);
    
      } 
     
    } catch (error) {
      console.error('Error retrieving image:', error);
    }
  };

  useEffect(() => {
    if (fileInputRef.current && fileInputRef.current.files.length > 0) {
      const file = fileInputRef.current.files[0];
      setImage(URL.createObjectURL(file));
    }
    retrieve();
  }, []);


  return (
    <div>
      <input type="file" accept="image/*" ref={fileInputRef} onChange={handleImageChange} />

      {!(image==null) && (
        <div>
          <div
            style={{
              borderRadius: '50%',
              height: '200px',
              width: '200px',
              backgroundColor: 'transparent',
              marginTop: '1vh',
              marginRight: '-5vw',
              border: 'solid 1px white',
              overflow: 'hidden',
            }}
          >
            <img src={image} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="Profile" />
          </div>
        </div>
      )}

      {(image==null) && (
        <div>
          <div>No image was selected.</div>
        </div>
      )}

{!(image==null) && (
      <div>
        <AvatarEditor
          ref={(ref) => setEditor(ref)}
          image={image}
          width={200}
          height={200}
          border={0}
          borderRadius={100}
          color={[255, 255, 255, 0.6]} // Color of the border, RGBA
          scale={scale}
          rotate={rotate}
        />
        <div>
          <label>
            Scale:
            <input type="range" min="0.1" max="2" step="0.1" value={scale} onChange={handleScaleChange} />
          </label>
          <button onClick={() => handleRotate('left')}>Rotate Left</button>
          <button onClick={() => handleRotate('right')}>Rotate Right</button>
          <button onClick={handleCrop}>
      Crop Image
    </button>
        </div>
      </div>
    )}

    {!(croppedImage==null) && (<div>
        Cropped Image:
        <div
            style={{
              borderRadius: '50%',
              height: '200px',
              width: '200px',
              backgroundColor: 'transparent',
              marginTop: '1vh',
              marginRight: '-5vw',
              border: 'solid 1px white',
              overflow: 'hidden',
            }}
          >
            <img src={croppedImage} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="Profile" />
          </div>

    </div>)

    }
    
    <div style={{ position: 'relative', width: '200px', height: '200px', borderRadius: '50%', overflow: 'hidden' }}>
  {imageSrc !== "" ? (
    <AvatarEditor
      image={imageSrc}
      width={200}
      height={200}
      border={0}
      borderRadius={100}
      color={[255, 255, 255, 0]}
      scale={1}
      rotate={rotate}
    />
  ) : (
    <div><button onClick={handleRetrieveCroppedImage}>Update Cropped Image</button></div>
  )}
</div>








    </div>
  );
};

export default ProfilePictureEditor;
