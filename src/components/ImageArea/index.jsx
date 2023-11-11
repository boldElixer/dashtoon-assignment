import React, { useState } from 'react';
import "./ImageArea.css";
import DeleteIcon from '@mui/icons-material/Delete';
import DeleteModal from '../DeleteModal';

function ImageArea({ generatedImages, onDeleteImage }) {

  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const handleOpenDeleteModal = () => setOpenDeleteModal(true);
  const handleCloseDeleteModal = () => setOpenDeleteModal(false);

  const deleteImage = (index) => {
    onDeleteImage(index);
    setOpenDeleteModal(false);
  }

  return (
    <div className="image-board">
      {generatedImages.map((image, index) => (
        <div key={index} className="image-container">
            <img src={image} alt={`Generated Image ${index + 1}`} className="generated-image" />
            <DeleteIcon style={{color: 'red'}} onClick={handleOpenDeleteModal} className="delete-button"/>
        </div>
      ))}
      <DeleteModal open={openDeleteModal} handleClose={handleCloseDeleteModal} deleteImage={deleteImage} />
    </div>
  );
}

export default ImageArea;