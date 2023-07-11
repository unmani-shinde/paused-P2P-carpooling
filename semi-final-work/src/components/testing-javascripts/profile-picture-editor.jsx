import React, { useState } from 'react';
import AvatarEditor from 'react-avatar-editor';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const ProfilePictureEditor = () => {
  const [image, setImage] = useState(null);
  const [editor, setEditor] = useState(null);
  const [scale, setScale] = useState(1);
  const [rotate, setRotate] = useState(0);
  const [showModal, setShowModal] = useState(false);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setImage(URL.createObjectURL(file));
    setShowModal(true);
  };

  const handleCrop = () => {
    if (editor) {
      const canvas = editor.getImageScaledToCanvas().toDataURL();
      console.log(canvas);
      // Do something with the cropped image canvas
      setShowModal(false);
    }
  };

  const handleScaleChange = (event) => {
    const scaleValue = parseFloat(event.target.value);
    setScale(scaleValue);
  };

  const handleRotate = (direction) => {
    setRotate((prevRotate) => (direction === 'left' ? prevRotate - 90 : prevRotate + 90));
  };

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleImageChange} />

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Crop Image</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {image && (
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
              </div>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleCrop}>
            Crop Image
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ProfilePictureEditor;

