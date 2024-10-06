import { Button, Drawer } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import React, { useState } from 'react';

const menuItems = [
    'Profile',
    'Projects',
    'Awards',
    'Work'
];    

// For URI fragment based page navigation
const getActiveIndexAndScroll = () => {
    const { hash } = window.location;
    const element = document.getElementById(hash?.replace('#', ''));
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
    switch (location.hash) {
        case '#profile':
            return 1;
        case '#projects':
            return 2;
        case '#awards':
            return 3;
        case '#work':
            return 4;
        default:
            return 1;
    }
};

const NavBar: React.FC = () => {
    const [open, setOpen] = useState(false);
    return (
        <>
            <Button onClick={() => setOpen(true)}><MenuIcon /></Button>
        <Drawer open={open} onClose={() => setOpen(false)}>
                {
                    menuItems.map((name, index) => (
                        <div id={name.toLowerCase()}>
                            <Button key={index} onClick={() => {
                                window.location.hash = name.toLowerCase();
                                setOpen(false);
                            }}>
                                {name}
                            </Button>
                        </div>

                    ))
                }
        </Drawer>
        </>
    );
}

export default NavBar;