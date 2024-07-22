import React, { useState } from 'react';
import axios from 'axios';
const FileUpload = () => {
    const [file, setFile] = useState(null);
    const  [customId, setCustomId] = useState('')

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleIdChange = (e) => {
        setCustomId(e.target.value[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        
        formData.append('file', file);
        formData.append('id', customId);
        try {
            await axios.post('http://localhost:5000/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            alert('File uploaded successfully');
        } catch (error) {
            console.error('Error uploading file:', error);
            alert('Failed to upload file');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
        <div>
            <label htmlFor="file">File:</label>
            <input type="file" id="file" onChange={handleFileChange} required />
        </div>
        <div>
            <label htmlFor="customId">Custom ID:</label>
            <input type="text" id="customId" value={customId} onChange={handleIdChange} required />
        </div>
        <button type="submit">Upload</button>
    </form>
    );
};

export default FileUpload;
