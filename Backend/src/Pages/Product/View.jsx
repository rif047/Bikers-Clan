import React, { useState } from 'react';
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

export default function View({ open, onClose, viewData }) {
    const [imgCurrentIndex, setImgCurrentIndex] = useState(0);

    const fieldsToView = [
        { label: 'Category Name', value: viewData?.category?.name },
        { label: 'Product Name', value: viewData?.name },
        { label: 'Buying Price', value: `${viewData?.buying} tk` },
        { label: 'Selling Price', value: `${viewData?.selling} tk` },
        { label: 'Stock', value: `${viewData?.stock}` },
        { label: 'Feature Product', value: `${viewData?.feature}` },
        { label: 'Upload On Website', value: `${viewData?.onWeb}` },
        { label: 'Description', value: viewData?.description },
    ];

    const EndPoint = 'products';

    const handleNext = () => {
        if (viewData.images) {
            setImgCurrentIndex((prevIndex) => (prevIndex + 1) % viewData.images.length);
        }
    };

    const handlePrev = () => {
        if (viewData.images) {
            setImgCurrentIndex((prevIndex) =>
                prevIndex === 0 ? viewData.images.length - 1 : prevIndex - 1
            );
        }
    };

    const currentImageUrl = `http://localhost:9000/Images/${EndPoint}/${viewData?.images?.[imgCurrentIndex]}`;

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
                    <>
                        {fieldsToView.map(
                            (field, index) =>
                                field.value && (
                                    <Typography key={index}>
                                        <strong>{field.label}:</strong> {field.value}
                                    </Typography>
                                )
                        )}

                        {viewData.images && viewData.images.length > 0 && (
                            <Box sx={{ mt: 3 }}>
                                <Typography variant="h6" sx={{ mb: 1, mt: 5, textAlign: 'center', fontWeight: 'bold' }}>
                                    Voucher:
                                </Typography>
                                <Box
                                    sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mb: 2, }}  >

                                    <a href={currentImageUrl} target="_blank" rel="noopener noreferrer">
                                        <Box
                                            component="img"
                                            src={currentImageUrl}
                                            alt={`Image ${imgCurrentIndex + 1}`}
                                            sx={{
                                                height: 200,
                                                borderRadius: 1,
                                                objectFit: 'cover',
                                                boxShadow: 2,
                                            }}
                                        />
                                    </a>
                                </Box>
                                <Box sx={{ display: viewData.images.length > 1 ? 'flex' : 'none', justifyContent: 'space-between', alignItems: 'center' }}  >
                                    <button
                                        className='border border-slate-600 text-xs py-1 px-4 rounded-md shadow-xl hover:bg-gray-200'
                                        onClick={handlePrev}
                                    >
                                        {`${'< '} Previous`}
                                    </button>
                                    <button
                                        className='border border-slate-600 text-xs py-1 px-4 rounded-md shadow-xl hover:bg-gray-200'
                                        onClick={handleNext}
                                    >
                                        {`Next ${' >'}`}
                                    </button>
                                </Box>

                            </Box>
                        )}
                    </>
                ) : (
                    <Typography>Loading...</Typography>
                )}
            </Box>
        </Modal>
    );
}
