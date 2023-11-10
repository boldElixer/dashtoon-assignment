import React, { useState } from "react";
import "./dashboard.css";
import logo from "../../assets/logo.png";
import Button from '@mui/material/Button';
import { Drawer, Tooltip } from "@mui/material";
import DrawerComponent from "../../components/QueryContainer";
import ImageArea from "../../components/ImageArea";

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

    return (
        <div>
            <nav className="navbar">
                <img src={logo} alt="Logo" className="logo" />
                <span className="name">DASHTOON</span>
            </nav>
            <Tooltip title={isAddButtonDisabled ? 'Maximum 10 images allowed' : ''}>
                <span>
                    <Button onClick={toggleDrawer} disabled={isAddButtonDisabled}>Add Comic Strip</Button>
                </span>
            </Tooltip>
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