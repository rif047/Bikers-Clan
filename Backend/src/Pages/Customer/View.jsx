import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import CloseIcon from '@mui/icons-material/Close';


const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '90%',
    maxWidth: 500,
    maxHeight: '90vh',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 3,
    overflowY: 'auto',
    borderRadius: 2,
};


const capitalizeWords = (str) => {
    return str
        .replace(/_/g, ' ')
        .replace(/\b\w/g, (char) => char.toUpperCase());
};



export default function View({ open, onClose, viewData }) {
    const fieldsToView = ['name', 'phone', 'alt_phone', 'address', 'shipping_address', 'email', 'answer', 'password'];

    return (
        <Modal open={open} onClose={onClose}>
            <Box sx={modalStyle}>
                <div className='flex justify-between mb-5'>
                    <Typography variant="h6" component="h2" className='!font-bold !flex !items-center !space-x-1'>
                        <span>{viewData ? viewData.name.toUpperCase() : 'Loading...'} Details</span>
                    </Typography>

                    <div onClick={onClose} className='cursor-pointer'>
                        <CloseIcon />
                    </div>
                </div>

                {viewData ? (
                    fieldsToView.map((field) => (
                        viewData[field] && (
                            <Typography key={field}>
                                <strong>{capitalizeWords(field)}:</strong> {viewData[field]}
                            </Typography>
                        )
                    ))
                ) : (
                    <Typography>Loading...</Typography>
                )}
            </Box>
        </Modal>
    );
}
