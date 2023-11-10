import React, { useState } from "react";
import "./dashboard.css";
import logo from "../../assets/logo.png";
import Button from '@mui/material/Button';
import { Drawer, Tooltip } from "@mui/material";
import DrawerComponent from "../../components/QueryContainer";
import ImageArea from "../../components/ImageArea";
import jsPDF from 'jspdf';
import ClearModal from "../../components/ClearModal";


async function query(data) {
	const response = await fetch(
		"https://xdwvg9no7pefghrn.us-east-1.aws.endpoints.huggingface.cloud",
		{
			headers: { 
				"Accept": "image/png",
				"Authorization": "Bearer VknySbLLTUjbxXAXCjyfaFIPwUTCeRXbFSOjwRiCxsxFyhbnGjSFalPKrpvvDAaPVzWEevPljilLVDBiTzfIbWFdxOkYJxnOPoHhkkVGzAknaOulWggusSFewzpqsNWM", 
				"Content-Type": "application/json" 
			},
			method: "POST",
			body: JSON.stringify(data),
		}
	);
	const result = await response.blob();
	return result;
}

function Dashboard() {
    const [isDrawerOpen, setDrawerOpen] = useState(false);
    const [generatedImages, setGeneratedImages] = useState([]);
    const [inputText, setInputText] = useState('');

    const toggleDrawer = () => {
        setDrawerOpen(!isDrawerOpen);
    };

    const handleInputChange = (event) => {
        setInputText(event.target.value);
    };

    const handleSubmit = async () => {
        try {
          const result = await query({ "inputs": inputText });
    
          // Set the generated image in the state
          setGeneratedImages((prevImages) => [...prevImages, URL.createObjectURL(result)].slice(-10));
    
          // Optionally, you can display the image or do other things with the result
        } catch (error) {
          console.error("Error fetching image:", error);
        }

        // Optionally, you can clear the input field after submitting
        setInputText('');
    
        // Close the drawer
        toggleDrawer();
    };

    const handleDeleteImage = (index) => {
        const updatedImages = [...generatedImages];
        updatedImages.splice(index, 1);
        setGeneratedImages(updatedImages);
    };

    const isAddButtonDisabled = generatedImages.length >= 10;

    const isClearButtonDisabled = generatedImages.length == 0;

    const generatePdf = () => {
        const pdf = new jsPDF('p', 'mm', [326, 131]);
        let xOffset = 1;
        let yOffset = 1;
    
        for (let i = 0; i < generatedImages.length; i++) {
          if (i % 2 === 0 && i !== 0) {
            yOffset += 65; // Adjust as needed
            xOffset = 1;
          }
          else if(i !== 0) {
            xOffset = 66;
          }
    
          const img = new Image();
          img.src = generatedImages[i];
          //console.log(generatedImages[i]);
    
          pdf.addImage(img, 'PNG', xOffset, yOffset, 64, 64);
          //xOffset += 100; // Adjust as needed
        }
    
        pdf.save('comic-panel.pdf');
    };

    const [openClearModal, setOpenClearModal] = useState(false);
    const handleOpenClearModal = () => setOpenClearModal(true);
    const handleCloseClearModal = () => setOpenClearModal(false);

    const clearPanel = () => {
        setGeneratedImages([]);
        handleCloseClearModal();
    }

    return (
        <div>
            <nav className="navbar">
                <img src={logo} alt="Logo" className="logo" />
                <span className="name">DASHTOON</span>
            </nav>
            <div className="options">
                <Tooltip title={isAddButtonDisabled ? 'Maximum 10 images allowed' : ''}>
                    <span>
                        <Button variant="contained" onClick={toggleDrawer} disabled={isAddButtonDisabled}>Add Comic Strip</Button>
                    </span>
                </Tooltip>
                <Button variant="outlined" color='error' onClick={handleOpenClearModal} disabled={isClearButtonDisabled}>Clear Panel</Button>
                <ClearModal open={openClearModal} handleClose={handleCloseClearModal} clearPanel={clearPanel} />
                <Tooltip title={!isAddButtonDisabled ? '10 images required' : ''}>
                    <span>
                        <Button variant="contained" onClick={generatePdf} disabled={!isAddButtonDisabled}>Share Comic Strip</Button>
                    </span>
                </Tooltip>
            </div>
            <Drawer anchor="right" open={isDrawerOpen} onClose={toggleDrawer}>
                <DrawerComponent
                    handleInputChange={handleInputChange}
                    handleSubmit={handleSubmit}
                    inputText={inputText}
                />
            </Drawer>
            <ImageArea generatedImages={generatedImages} onDeleteImage={handleDeleteImage} />
        </div>
    )
}

export default Dashboard;