import React, { useState, useEffect } from 'react';
import {
    Box,
    Button,
    Typography,
    Modal,
    IconButton,
    TextField,
    Popover,
    List,
    ListItem,
    Input,
} from '@mui/material';
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
    const [formData, setFormData] = useState({});
    const [categories, setCategories] = useState([]);
    const [filteredCategories, setFilteredCategories] = useState([]);
    const [categorySearch, setCategorySearch] = useState('');
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedImages, setSelectedImages] = useState([]);
    const [errors, setErrors] = useState({});

    // Dynamic form fields
    const formFields = [
        { label: 'Expense Name', name: 'name', type: 'text' },
        { label: 'Amount', name: 'amount', type: 'number' },
        { label: 'Description', name: 'description', type: 'text' },
    ];

    // Fetch categories when the component loads
    useEffect(() => {
        axios
            .get(`${import.meta.env.VITE_API_URL}/expense_categories`)
            .then((response) => {
                const categories = Array.isArray(response.data) ? response.data : [];
                setCategories(categories);
                setFilteredCategories(categories);

                // If editing, set the formData and selected images
                if (data) {
                    setFormData({
                        name: data.name || '',
                        amount: data.amount || '',
                        description: data.description || '',
                        category: data.category || '',  // Set category correctly
                    });
                    setSelectedImages(data.images || []);
                }
            })
            .catch(() => {
                toast.error('Failed to fetch categories.');
                setCategories([]);
                setFilteredCategories([]);
            });
    }, [data]); // Re-run when `data` changes

    // Handle category search
    const handleCategorySearchChange = (e) => {
        const searchTerm = e.target.value;
        setCategorySearch(searchTerm);
        setFilteredCategories(
            categories.filter((category) =>
                category.name.toLowerCase().includes(searchTerm.toLowerCase())
            )
        );
    };

    // Handle category selection
    const handleCategoryClick = (categoryId) => {
        setFormData((prev) => ({ ...prev, category: categoryId }));
        setAnchorEl(null); // Close the dropdown
    };

    const handleOpenDropdown = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleCloseDropdown = () => {
        setAnchorEl(null);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    // Handle image change
    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        const imageArray = files.filter((file) => file.type.startsWith('image/'));
        if (imageArray.length > 0) {
            setSelectedImages(imageArray);
        } else {
            setErrors((prev) => ({
                ...prev,
                images: 'Please upload valid image files.',
            }));
        }
    };

    const handleSubmit = async () => {
        if (!formData.name || !formData.category) {
            toast.error('Please fill out all required fields.');
            return;
        }

        // Check for image errors
        if (selectedImages.length === 0 && !data) {
            setErrors((prev) => ({
                ...prev,
                images: 'Please upload at least one image.',
            }));
            return;
        }

        try {
            const url = `${import.meta.env.VITE_API_URL}/expenses${data?._id ? `/${data._id}` : ''}`;
            const method = data?._id ? 'patch' : 'post';
            const formDataToSubmit = new FormData();

            // Append text fields
            for (const key in formData) {
                formDataToSubmit.append(key, formData[key]);
            }

            // Append images
            selectedImages.forEach((image) => {
                formDataToSubmit.append('images', image);
            });

            await axios[method](url, formDataToSubmit);
            toast.success(data?._id ? 'Updated successfully.' : 'Created successfully.');
            refreshData();
            onClose();
        } catch (error) {
            toast.error('Failed to submit data.');
        }
    };

    return (
        <Modal open={open} onClose={onClose}>
            <Box sx={modalStyle}>
                <Box display="flex" justifyContent="space-between" mb={1}>
                    <Typography variant="h6">
                        {data ? 'Update Data' : 'Create New'}
                    </Typography>
                    <IconButton onClick={onClose}>
                        <CloseIcon />
                    </IconButton>
                </Box>

                {/* Dynamically render text fields */}
                {formFields.map((field) => (
                    <TextField
                        key={field.name}
                        label={field.label}
                        name={field.name}
                        type={field.type}
                        fullWidth
                        margin="normal"
                        value={formData[field.name] || ''}
                        onChange={handleInputChange}
                    />
                ))}

                <Button
                    variant="outlined"
                    onClick={handleOpenDropdown}
                    sx={{ textAlign: 'left', width: '100%', marginBottom: 2 }}
                >
                    {formData.category
                        ? categories.find((cat) => cat._id === formData.category)?.name || 'Select Category'
                        : 'Select Category'}
                </Button>

                <Popover
                    open={Boolean(anchorEl)}
                    anchorEl={anchorEl}
                    onClose={handleCloseDropdown}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                >
                    <Box sx={{ p: 2, width: 300 }}>
                        <TextField
                            placeholder="Search..."
                            fullWidth
                            size="small"
                            value={categorySearch}
                            onChange={handleCategorySearchChange}
                            autoFocus
                        />
                        <List sx={{ maxHeight: 200, overflowY: 'auto' }}>
                            {filteredCategories.length > 0 ? (
                                filteredCategories.map((category) => (
                                    <ListItem
                                        component="button"
                                        key={category._id}
                                        onClick={() => handleCategoryClick(category._id)}
                                    >
                                        {category.name}
                                    </ListItem>
                                ))
                            ) : (
                                <Typography>No categories found</Typography>
                            )}
                        </List>
                    </Box>
                </Popover>

                {/* Image upload */}
                <Input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImageChange}
                    style={{ marginBottom: '10px' }}
                />
                <div style={{ marginBottom: '10px' }}>
                    {selectedImages.length > 0 && selectedImages.map((image, index) => (
                        <img
                            key={index}
                            src={image instanceof File ? URL.createObjectURL(image) : `http://localhost:9000/Images/expenses/${image}`}
                            alt={`preview-${index}`}
                            style={{ width: '50px', marginRight: '10px' }}
                        />
                    ))}

                    {data && data.images && data.images.length > 0 && (
                        <div>
                            {data.images.map((img, idx) => (
                                <img
                                    key={idx}
                                    src={`http://localhost:9000/Images/expenses/${img}`}
                                    alt={`existing-${idx}`}
                                    style={{ width: '50px', marginRight: '10px' }}
                                />
                            ))}
                        </div>
                    )}
                </div>
                {errors.images && <Typography color="error">{errors.images}</Typography>}

                <Button
                    fullWidth
                    variant="contained"
                    sx={{ mt: 2 }}
                    onClick={handleSubmit}
                >
                    {data ? 'Update' : 'Create'}
                </Button>
            </Box>
        </Modal>
    );
}
