import React, { useState, useEffect } from 'react';
import ResponsiveAppBar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import ResourceCard from '../components/ResourceCard';
import apiDefault from '../assets/API.svg';
import uiDefault from '../assets/UILibrary.svg';
import utilitiesDefault from '../assets/Utilities.svg';
import axios from 'axios';
import {
    Container, Grid, Box, Button, Dialog, DialogTitle,
    DialogContent, DialogActions, TextField, Typography,
    Select, MenuItem, FormControl, InputLabel
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

const baseURL = import.meta.env.VITE_API_URL || '';

const CATEGORY_IMAGES = {
    'API': apiDefault,
    'UI Library': uiDefault,
    'Utilities': utilitiesDefault
};

const defaultFormData = {
    title: '',
    description: '',
    url: '',
    category: 'UI Library',
    imageUrl: ''
};

const Dashboard = () => {
    const [resources, setResources] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [open, setOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [sortBy, setSortBy] = useState('Latest');
    const [formData, setFormData] = useState(defaultFormData);
    const [likedIds, setLikedIds] = useState(() =>
        JSON.parse(localStorage.getItem('likedResources') || '[]')
    );

    useEffect(() => {
        const fetchResources = async () => {
            try {
                const response = await axios.get(`${baseURL}/api/resources`);
                setResources(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchResources();
    }, []);

    const handleOpen = () => setOpen(true);

    const handleClose = () => {
        setOpen(false);
        setFormData(defaultFormData);
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.title.trim() || !formData.description.trim() || !formData.url.trim()) {
            alert('Please fill out all required fields properly.');
            return;
        }

        try {
            const parsedUrl = new URL(formData.url.trim());
            if (parsedUrl.protocol !== 'http:' && parsedUrl.protocol !== 'https:') {
                alert('URL must start with http:// or https://');
                return;
            }
        } catch (_) {
            alert('Please enter a valid, complete URL (e.g., https://example.com)');
            return;
        }

        const chosenCategory = formData.category || 'UI Library';
        const categoryFallback = CATEGORY_IMAGES[chosenCategory];
        const finalPayload = {
            ...formData,
            url: formData.url.trim(),
            imageUrl: formData.imageUrl.trim() || categoryFallback
        };

        try {
            const response = await axios.post(`${baseURL}/api/resources`, finalPayload);
            setResources([...resources, response.data]);
            handleClose();
        } catch (error) {
            console.error('Error saving resource:', error);
            alert('Failed to save resource. Check your server connection.');
        }
    };

    const handleLike = async (id) => {
        const hasLiked = likedIds.includes(id);

        try {
            if (hasLiked) {
                const response = await axios.patch(`${baseURL}/api/resources/${id}/unlike`);
                setResources(resources.map(item => item._id === id ? response.data : item));
                const updated = likedIds.filter(likedId => likedId !== id);
                setLikedIds(updated);
                localStorage.setItem('likedResources', JSON.stringify(updated));
            } else {
                const response = await axios.patch(`${baseURL}/api/resources/${id}/like`);
                setResources(resources.map(item => item._id === id ? response.data : item));
                const updated = [...likedIds, id];
                setLikedIds(updated);
                localStorage.setItem('likedResources', JSON.stringify(updated));
            }
        } catch (error) {
            console.error('Error updating likes:', error);
            alert('Could not update like status. Make sure the server is updated!');
        }
    };

    const handleSelectCategory = (category) => setSelectedCategory(category);

    const filteredResources = resources
        .filter((resource) => {
            if (selectedCategory !== 'All' && resource.category?.toLowerCase() !== selectedCategory.toLowerCase()) {
                return false;
            }
            const matchesTitle = resource.title?.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesDesc = resource.description?.toLowerCase().includes(searchQuery.toLowerCase());
            return matchesTitle || matchesDesc;
        })
        .sort((a, b) => {
            if (sortBy === 'Most Likes') return (b.likes || 0) - (a.likes || 0);
            if (sortBy === 'Old') return a._id.localeCompare(b._id);
            return b._id.localeCompare(a._id);
        });

    return (
        <Box sx={{ flexGrow: 1, bgcolor: '#14213d', minHeight: '100vh' }}>
            <ResponsiveAppBar
                selectedCategory={selectedCategory}
                onSelectCategory={handleSelectCategory}
            />
            <HeroSection />

            <Container maxWidth="md" sx={{ mt: 4, mb: 2 }}>
                <TextField
                    fullWidth
                    variant="outlined"
                    placeholder="Search resources by title or description..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    sx={{
                        bgcolor: '#1e2d4a',
                        borderRadius: 2,
                        '& .MuiOutlinedInput-root': {
                            color: '#e5e5e5',
                            '& fieldset': { borderColor: 'rgba(255,255,255,0.1)' },
                            '&:hover fieldset': { borderColor: 'rgba(252, 163, 17, 0.4)' },
                            '&.Mui-focused fieldset': { borderColor: '#fca311' },
                        },
                        '& input::placeholder': { color: 'rgba(255,255,255,0.35)' }
                    }}
                />
            </Container>

            <Container maxWidth="lg" sx={{ pb: 6 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3, flexWrap: 'wrap', gap: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Typography variant="body2" sx={{ color: '#e5e5e5', fontWeight: 'bold' }}>Sort by:</Typography>
                        <Select
                            size="small"
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            sx={{
                                bgcolor: 'background.paper',
                                color: 'text.primary',
                                borderRadius: 1,
                                minWidth: 115,
                                height: 32,
                                border: '1px solid',
                                borderColor: 'divider',
                                '& .MuiSelect-select': { py: 0.5 }
                            }}
                        >
                            <MenuItem value="Latest">Latest</MenuItem>
                            <MenuItem value="Old">Old</MenuItem>
                            <MenuItem value="Most Likes">Most Likes</MenuItem>
                        </Select>
                        <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.4)', ml: 1 }}>
                            {filteredResources.length} {filteredResources.length === 1 ? 'result' : 'results'}
                        </Typography>
                    </Box>

                    <Button
                        variant="contained"
                        startIcon={<AddIcon />}
                        onClick={handleOpen}
                        sx={{
                            bgcolor: '#fca311',
                            color: '#000',
                            textTransform: 'none',
                            height: 36,
                            fontWeight: 700,
                            '&:hover': { bgcolor: '#e5940f' }
                        }}
                    >
                        Add New Resource
                    </Button>
                </Box>

                <Grid container spacing={4}>
                    {filteredResources.length === 0 ? (
                        <Box sx={{ width: '100%', textAlign: 'center', py: 8, color: '#e5e5e5' }}>
                            <Typography variant="h6" gutterBottom>🔍 No Resources Found</Typography>
                            <Typography variant="body2" mb={2} sx={{ opacity: 0.6 }}>
                                Try adjusting your search or switching categories.
                            </Typography>
                            <Button
                                variant="outlined"
                                onClick={() => { setSearchQuery(''); setSelectedCategory('All'); }}
                                sx={{ color: '#fca311', borderColor: '#fca311', '&:hover': { borderColor: '#e5940f' } }}
                            >
                                Clear All Filters
                            </Button>
                        </Box>
                    ) : (
                        filteredResources.map((resource) => (
                            <Grid xs={12} sm={6} md={4} key={resource._id}>
                                <ResourceCard
                                    resource={resource}
                                    onLike={handleLike}
                                    onSelectCategory={handleSelectCategory}
                                    liked={likedIds.includes(resource._id)}
                                />
                            </Grid>
                        ))
                    )}
                </Grid>
            </Container>

            <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
                <DialogTitle sx={{ fontWeight: 'bold' }}>Add a Developer Resource</DialogTitle>
                <form onSubmit={handleSubmit}>
                    <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                        <TextField label="Title" name="title" value={formData.title} onChange={handleChange} required fullWidth />
                        <TextField label="Description" name="description" value={formData.description} onChange={handleChange} required fullWidth multiline rows={3} />
                        <TextField label="Resource URL (e.g., https://...)" name="url" value={formData.url} onChange={handleChange} required fullWidth />
                        <FormControl fullWidth required>
                            <InputLabel id="category-dropdown-label">Category</InputLabel>
                            <Select
                                labelId="category-dropdown-label"
                                name="category"
                                value={formData.category}
                                label="Category"
                                onChange={handleChange}
                            >
                                <MenuItem value="API">API</MenuItem>
                                <MenuItem value="UI Library">UI Library</MenuItem>
                                <MenuItem value="Utilities">Utilities</MenuItem>
                            </Select>
                        </FormControl>
                        <TextField label="Image Link Address (Optional)" name="imageUrl" value={formData.imageUrl} onChange={handleChange} fullWidth />
                    </DialogContent>
                    <DialogActions sx={{ px: 3, pb: 2 }}>
                        <Button onClick={handleClose} color="inherit">Cancel</Button>
                        <Button
                            type="submit"
                            variant="contained"
                            sx={{ bgcolor: '#fca311', color: '#000', fontWeight: 700, '&:hover': { bgcolor: '#e5940f' } }}
                        >
                            Submit Resource
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>
        </Box>
    );
};

export default Dashboard;
