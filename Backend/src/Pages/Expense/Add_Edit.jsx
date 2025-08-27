import React, { useState, useEffect } from 'react';
import { Box, Button, Typography, Modal, IconButton, MenuItem, Select, InputLabel, FormControl, TextField } from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';
import { toast } from 'react-toastify';
import axios from 'axios';

const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '90%',
    maxWidth: 500,
    bgcolor: '#fdfdfd',
    boxShadow: 24,
    p: 3,
    borderRadius: 2,
    overflowY: 'auto',
};

export default function AddEdit({ open, onClose, data, refreshData }) {
    const EndPoint = 'expenses';
    const [formData, setFormData] = useState({});
    const [errors, setErrors] = useState({});
    const [categories, setCategories] = useState([]);
    const [selectedImages, setSelectedImages] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setFormData(data || {});
        setErrors({});
        axios.get(`${import.meta.env.VITE_API_URL}/expense_categories`)
            .then(response => setCategories(response.data))
            .catch(error => toast.error('Failed to fetch categories.'));

        if (data?.images) setSelectedImages(data.images);
        if (data?.category?._id) setFormData(prev => ({ ...prev, category: data.category._id }));
    }, [data]);

    const validate = () => {
        const newErrors = {};
        const { name, amount, category } = formData;

        if (!data && !formData.date) newErrors.date = 'Expense Date is required.';
        if (!name) newErrors.name = 'Name is required.';
        if (!amount || !/^\d+$/.test(amount)) newErrors.amount = 'Amount must be a number.';
        if (!category) newErrors.category = 'Category is required.';
        if (selectedImages.length > 5) newErrors.images = 'You can upload up to 5 images only.';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        setErrors(prev => ({ ...prev, [name]: '' }));
    };

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        if (files.length + selectedImages.length > 5) {
            toast.error('You can upload up to 5 images only.');
        } else {
            setSelectedImages(prev => [...prev, ...files]);
        }
    };

    const handleSubmit = async () => {
        if (!validate() || loading) return;
        setLoading(true);

        const formDataToSubmit = new FormData();
        Object.entries(formData).forEach(([key, value]) => formDataToSubmit.append(key, value));
        selectedImages.forEach(image => formDataToSubmit.append('images', image));

        try {
            const url = `${import.meta.env.VITE_API_URL}/${EndPoint}${data?._id ? `/${data._id}` : ''}`;
            const method = data?._id ? 'patch' : 'post';
            await axios[method](url, formDataToSubmit, { headers: { 'Content-Type': 'multipart/form-data' } });
            toast.success(data?._id ? 'Updated successfully.' : 'Created successfully.');
            refreshData();
            onClose();
        } catch (error) {
            toast.error('Failed to submit data.');
        } finally {
            setLoading(false);
        }
    };

    const formFields = [
        { label: 'Expense Name', name: 'name', type: 'text' },
        { label: 'Amount', name: 'amount', type: 'number' },
        { label: 'Description', name: 'description', type: 'text' }
    ];

    return (
        <Modal open={open} onClose={onClose}>
            <Box sx={modalStyle}>
                <Box display="flex" justifyContent="space-between" mb={1}>
                    <Typography className='!font-bold' variant="h6">{data ? 'Update Data' : 'Create New'}</Typography>
                    <IconButton onClick={onClose}><CloseIcon /></IconButton>
                </Box>

                {!data && (
                    <TextField
                        label=""
                        name="date"
                        type="date"
                        fullWidth
                        margin="normal"
                        size="small"
                        value={formData.date || ''}
                        onChange={handleChange}
                        error={!!errors.date}
                        helperText={errors.date}
                    />
                )}

                {formFields.map(({ label, name, type }) => (
                    <TextField
                        key={name}
                        label={label}
                        name={name}
                        type={type}
                        fullWidth
                        margin="normal"
                        size="small"
                        value={formData[name] || ''}
                        onChange={handleChange}
                        error={!!errors[name]}
                        helperText={errors[name]}
                    />
                ))}

                <FormControl fullWidth margin="normal" size="small">
                    <InputLabel>Category</InputLabel>
                    <Select name="category" value={formData.category || ''} onChange={handleChange} error={!!errors.category}>
                        {categories.map(category => (
                            <MenuItem key={category._id} value={category._id}>{category.name}</MenuItem>
                        ))}
                    </Select>
                    {errors.category && <Typography color="error">{errors.category}</Typography>}
                </FormControl>

                <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImageChange}
                    style={{ marginBottom: '10px' }}
                />
                <div style={{ marginBottom: '10px' }}>
                    {selectedImages.map((image, index) => (
                        <img
                            key={index}
                            src={image instanceof File ? URL.createObjectURL(image) : `http://localhost:9000/Images/expenses/${image}`}
                            alt={`preview-${index}`}
                            style={{ width: '50px', marginRight: '10px' }}
                        />
                    ))}
                </div>
                {errors.images && <Typography color="error">{errors.images}</Typography>}

                <Button
                    fullWidth
                    variant="contained"
                    sx={{ mt: 2 }}
                    onClick={handleSubmit}
                    className='!bg-slate-600 !font-bold'
                    disabled={loading}
                >
                    {data ? 'Update' : 'Create'}
                </Button>
            </Box>
        </Modal>
    );
}
