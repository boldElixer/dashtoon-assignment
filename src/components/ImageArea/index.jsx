import React from 'react';
import "./ImageArea.css";
import DeleteIcon from '@mui/icons-material/Delete';

function ImageArea({ generatedImages, onDeleteImage }) {
  return (
    <div className="image-board">
      {generatedImages.map((image, index) => (
        <div key={index} className="image-container">
            <img src={image} alt={`Generated Image ${index + 1}`} className="generated-image" />
            <DeleteIcon style={{color: 'red'}} onClick={() => onDeleteImage(index)} className="delete-button"/>
        </div>
      ))}
    </div>
  );
}

export default ImageArea;