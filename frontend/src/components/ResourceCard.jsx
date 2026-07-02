import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import Tooltip from '@mui/material/Tooltip';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LaunchIcon from '@mui/icons-material/Launch';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import apiDefault from '../assets/API.svg';
import uiDefault from '../assets/UILibrary.svg';
import utilitiesDefault from '../assets/Utilities.svg';

const CATEGORY_STYLES = {
    'API': { bg: '#e3f2fd', color: '#1565c0' },
    'UI Library': { bg: '#f3e5f5', color: '#6a1b9a' },
    'Utilities': { bg: '#e8f5e9', color: '#2e7d32' }
};

const CATEGORY_IMAGES = {
    'API': apiDefault,
    'UI Library': uiDefault,
    'Utilities': utilitiesDefault
};

export default function ResourceCard({ resource, onLike, onSelectCategory, liked }) {
    const fallback = CATEGORY_IMAGES[resource.category];
    const chipStyle = CATEGORY_STYLES[resource.category] || { bg: '#f5f5f5', color: '#555' };

    const [copied, setCopied] = React.useState(false);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(resource.url);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy:', err);
        }
    };

    return (
        <Card
            sx={{
                width: '100%',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: '0 12px 28px rgba(0,0,0,0.15)'
                }
            }}
        >
            <CardHeader
                avatar={
                    <Avatar sx={{ bgcolor: chipStyle.color, fontWeight: 700, fontSize: '0.9rem' }} aria-label="category">
                        {resource.category ? resource.category[0].toUpperCase() : 'D'}
                    </Avatar>
                }
                title={
                    <Typography variant="subtitle1" sx={{ fontWeight: 700, lineHeight: 1.3 }}>
                        {resource.title}
                    </Typography>
                }
            />

            <CardMedia
                component="img"
                image={resource.imageUrl || resource.image || fallback}
                alt={resource.title}
                onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = fallback;
                }}
                sx={{
                    maxWidth: '100%',
                    width: 'auto',
                    height: 140,
                    objectFit: 'contain',
                    mx: 'auto',
                    display: 'block', p: 1.5,
                }}
            />

            <CardContent sx={{ flexGrow: 1 }}>
                <Chip
                    label={resource.category}
                    size="small"
                    clickable
                    onClick={() => onSelectCategory(resource.category)}
                    sx={{
                        mb: 1.5,
                        bgcolor: chipStyle.bg,
                        color: chipStyle.color,
                        fontWeight: 700,
                        border: `1px solid ${chipStyle.color}33`
                    }}
                />
                <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.6 }}>
                    {resource.description}
                </Typography>
            </CardContent>

            <CardActions
                disableSpacing
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    px: 2,
                    pb: 1.5
                }}
            >
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <IconButton aria-label="add to favorites" onClick={() => onLike(resource._id)} sx={{ p: 1 }}>
                        <FavoriteIcon sx={{ color: liked ? '#e53935' : 'action.disabled', fontSize: '1.1rem' }} />
                    </IconButton>
                    <Typography variant="body2" sx={{ ml: 0.5, fontWeight: 600, color: 'text.secondary' }}>
                        {resource.likes || 0}
                    </Typography>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <Tooltip title={copied ? 'Copied!' : 'Copy Link'} arrow placement="top">
                        <IconButton aria-label="copy link" onClick={handleCopy} size="small" sx={{ p: 1 }}>
                            <ContentCopyIcon fontSize="small" sx={{ color: copied ? '#fca311' : 'inherit' }} />
                        </IconButton>
                    </Tooltip>

                    <Tooltip title="Open Link" arrow placement="top">
                        <span>
                            <IconButton
                                aria-label="open link"
                                href={resource.url?.startsWith('http') ? resource.url : '#'}
                                target={resource.url?.startsWith('http') ? '_blank' : '_self'}
                                rel="noopener noreferrer"
                                size="small"
                                sx={{ p: 1 }}
                                disabled={!resource.url}
                            >
                                <LaunchIcon fontSize="small" />
                            </IconButton>
                        </span>
                    </Tooltip>
                </Box>
            </CardActions>
        </Card>
    );
}
