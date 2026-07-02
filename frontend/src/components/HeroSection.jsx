import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Chip from '@mui/material/Chip';

export default function HeroSection() {
    return (
        <Box
            sx={{
                background: 'linear-gradient(135deg, #0a0a0a 0%, #14213d 100%)',
                py: 8,
                textAlign: 'center',
                mb: 4,
                borderBottom: '1px solid rgba(252, 163, 17, 0.2)'
            }}
        >
            <Container maxWidth="md">
                <Chip
                    label="✦ Designer-First Resource Hub"
                    size="small"
                    sx={{
                        mb: 2.5,
                        bgcolor: 'rgba(252, 163, 17, 0.1)',
                        color: '#fca311',
                        border: '1px solid rgba(252, 163, 17, 0.3)',
                        fontWeight: 600,
                        letterSpacing: '0.05em'
                    }}
                />
                <Typography
                    variant="h2"
                    component="h1"
                    sx={{
                        fontWeight: 800,
                        mb: 2,
                        color: '#fca311',
                        fontFamily: 'monospace',
                        letterSpacing: '-0.02em'
                    }}
                >
                    DevShelf
                </Typography>
                <Typography
                    variant="h6"
                    component="p"
                    sx={{
                        opacity: 0.75,
                        color: '#ffffff',
                        maxWidth: 480,
                        mx: 'auto',
                        lineHeight: 1.7
                    }}
                >
                    Your personal curated toolkit of premium developer resources, APIs, and design blocks.
                </Typography>
            </Container>
        </Box>
    );
}
