import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import TerminalIcon from '@mui/icons-material/Terminal';

const pages = [
    { value: 'All', label: 'All' },
    { value: 'UI Library', label: 'UI Libraries' },
    { value: 'API', label: 'APIs' },
    { value: 'Utilities', label: 'Utilities' }
];

function ResponsiveAppBar({ selectedCategory, onSelectCategory }) {
    const [anchorElNav, setAnchorElNav] = React.useState(null);

    const handleOpenNavMenu = (event) => setAnchorElNav(event.currentTarget);
    const handleCloseNavMenu = () => setAnchorElNav(null);

    return (
        <AppBar position="sticky" sx={{ bgcolor: '#1A202C', boxShadow: '0 1px 0 rgba(255,255,255,0.06)' }}>
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <TerminalIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1, color: '#fca311' }} />
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="/"
                        sx={{
                            mr: 4,
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.1rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        DevShelf
                    </Typography>

                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="menu"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                            keepMounted
                            transformOrigin={{ vertical: 'top', horizontal: 'left' }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{ display: { xs: 'block', md: 'none' } }}
                        >
                            {pages.map((page) => (
                                <MenuItem
                                    key={page.value}
                                    onClick={() => {
                                        handleCloseNavMenu();
                                        onSelectCategory(page.value);
                                    }}
                                    sx={{
                                        bgcolor: selectedCategory === page.value ? 'rgba(252, 163, 17, 0.08)' : 'transparent',
                                        color: selectedCategory === page.value ? '#fca311' : 'inherit',
                                        fontWeight: selectedCategory === page.value ? 700 : 400
                                    }}
                                >
                                    <Typography sx={{ textAlign: 'center' }}>{page.label}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>

                    <TerminalIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1, color: '#fca311' }} />
                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        href="/"
                        sx={{
                            mr: 2,
                            display: { xs: 'flex', md: 'none' },
                            flexGrow: 1,
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.1rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        DevShelf
                    </Typography>

                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        {pages.map((page) => (
                            <Button
                                key={page.value}
                                onClick={() => onSelectCategory(page.value)}
                                sx={{
                                    my: 2,
                                    mx: 1,
                                    display: 'block',
                                    textTransform: 'none',
                                    borderRadius: 0,
                                    color: selectedCategory === page.value ? '#fca311' : 'white',
                                    fontWeight: selectedCategory === page.value ? 700 : 400,
                                    borderBottom: selectedCategory === page.value ? '2px solid #fca311' : '2px solid transparent',
                                }}
                            >
                                {page.label}
                            </Button>
                        ))}
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}

export default ResponsiveAppBar;
