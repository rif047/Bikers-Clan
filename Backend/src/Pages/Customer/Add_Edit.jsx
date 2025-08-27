import React, { useState, useEffect } from 'react';
import { Box, Button, Typography, Modal, TextField, IconButton } from '@mui/material';
import { RemoveRedEye, VisibilityOff, Close as CloseIcon } from '@mui/icons-material';
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

export default function AddEditCustomer({ open, onClose, data, refreshData }) {
    const EndPoint = 'customers';

    const [formData, setFormData] = useState({});
    const [errors, setErrors] = useState({});
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [loading, setLoading] = useState(false);


    useEffect(() => {
        setFormData(data || {});
        setErrors({});
    }, [data]);

    const validate = () => {
        const newErrors = {};
        const { name, phone, alt_phone, address, email, password } = formData;

        if (!name) newErrors.name = 'Name is required.';
        if (!/^\d+$/.test(phone || '')) newErrors.phone = 'Phone number must contain numbers.';
        if (alt_phone && !/^\d+$/.test(alt_phone)) newErrors.alt_phone = 'Alternate phone must contain numbers.';
        if (!address) newErrors.address = 'Address is required.';
        if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email || '')) newErrors.email = 'Invalid email address.';
        if (!password || password.length < 8) newErrors.password = 'Password must be at least 8 characters.';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        setErrors((prev) => ({ ...prev, [name]: '' }));
    };

    const handleSubmit = async () => {
        if (!validate() || loading) return;
        setLoading(true);

        try {
            const url = `${import.meta.env.VITE_API_URL}/${EndPoint}${data?._id ? `/${data._id}` : ''}`;
            const method = data?._id ? 'patch' : 'post';
            await axios[method](url, formData);
            toast.success(data?._id ? 'Updated successfully.' : 'Created successfully.');
            refreshData();
            onClose();
        } catch (error) {
            const backendErrors = error.response?.data || {};
            toast.error('Failed to update data.');
            setErrors({
                ...backendErrors.includes('Phone number already exists') && { phone: 'Phone number already exists.' },
                ...backendErrors.includes('Email already exists') && { email: 'Email already exists.' },
            });
        } finally {
            setLoading(false); // Reset loading state after request completes
        }
    };

    return (
        <Modal open={open} onClose={onClose}>
            <Box sx={modalStyle}>
                <Box display="flex" justifyContent="space-between" mb={1}>
                    <Typography className='!font-bold' variant="h6">{data ? 'Update Data' : 'Create New'} </Typography>
                    <IconButton onClick={onClose}>
                        <CloseIcon />
                    </IconButton>
                </Box>
                {[
                    { name: 'name', label: 'Customer Name' },
                    { name: 'phone', label: 'Phone Number' },
                    { name: 'alt_phone', label: 'Alternate Phone' },
                    { name: 'address', label: 'Address' },
                    { name: 'shipping_address', label: 'Shipping Address' },
                    { name: 'email', label: 'Email' },
                    { name: 'password', label: 'Password' },
                    { name: 'answer', label: 'Answer' }
                ].map(({ name, label }) => (
                    <TextField
                        key={name}
                        name={name}
                        label={label}
                        type={name === 'password' && !passwordVisible ? 'password' : 'text'}
                        fullWidth
                        margin="normal"
                        size="small"
                        value={formData[name] || ''}
                        onChange={handleChange}
                        error={!!errors[name]}
                        helperText={errors[name]}
                        InputProps={{
                            endAdornment:
                                name === 'password' ? (
                                    <IconButton onClick={() => setPasswordVisible(!passwordVisible)}>
                                        {passwordVisible ? <VisibilityOff /> : <RemoveRedEye />}
                                    </IconButton>
                                ) : null,
                        }}
                    />
                ))}
                <Button fullWidth variant="contained" sx={{ mt: 2 }} onClick={handleSubmit} disabled={loading} className='!bg-slate-600 !font-bold'>
                    {data ? 'Update' : 'Create'}
                </Button>
            </Box>
        </Modal>
    );
}
