import React, { useState, useRef } from 'react';
import '../CSS/UploadImage.css'
function UploadImage(props) {
  const [selectedImage, setSelectedImage] = useState(null);
  const fileInputRef = useRef(null);
  const saveEvent = props.saveEvent
  

  const handleAreaClick = () => {
    fileInputRef.current.click();
  };

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    saveEvent(file);
    previewImage(file);
  };

  const previewImage = (file) => {
    const reader = new FileReader();

    reader.onload = () => {
      setSelectedImage(reader.result);
    };

    reader.readAsDataURL(file);
  };

  return (
    <div className= "upload_image">
        <div className='image_space'>
      {selectedImage ? 
      ( <img src={selectedImage} alt="Selected" className="preview-image" />) : 
      (<span>Drop the image here</span>)
      }
      </div>
      <button onClick={handleAreaClick}> Upload image
      <input type="file" ref={fileInputRef} onChange={handleFileInputChange} style={{ display: 'none' }} />
      </button>
    </div>
  );
}

export default UploadImage;
