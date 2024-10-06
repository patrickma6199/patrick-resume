import { Button, Drawer } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import React, { useEffect, useState } from 'react';

const menuItems = [
    'Profile',
    'Projects',
    'Awards',
    'Work'
];    

// For URI fragment based page navigation
const scroll = () => {
    const { hash } = window.location;
    const element = document.getElementById(hash?.replace('#', ''));
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
};

const NavMenu: React.FC = () => {
    const [open, setOpen] = useState(false);

    useEffect(() => {
        scroll();
    }, []);

    return (
        <>
            <Button onClick={() => setOpen(true)}><MenuIcon /></Button>
            <Drawer open={open} anchor={"right"}
                onClose={() => setOpen(false)}
                sx={{
                    width: '10rem',
                    '& .MuiDrawer-paper': {
                        width: '10rem',
                        boxSizing: 'border-box',
                        backgroundColor: '#022859',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'flex-start',
                        alignItems: 'center',
                        gap: '1rem',
                        paddingTop: '4vh',
                    },
                }}
            >
                    {
                        menuItems.map((name, index) => (
                            <div id={name.toLowerCase()}>
                                <Button key={index}
                                    fullWidth={true}
                                    className="p-[100%] text-white hover:bg-light-blue hover:text-black"
                                    onClick={() => {
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

export default NavMenu;