import {Button, Drawer} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import React, {useEffect, useState} from 'react';

// , 'Awards', 'Work'
const menuItems = ['Profile', 'Projects'];

// For URI fragment based page navigation
const scroll = () => {
    const {hash} = window.location;
    const element = document.getElementById(hash?.replace('#', ''));
    if (element) {
        element.scrollIntoView({behavior: 'smooth'});
    }
};

const NavMenu: React.FC = () => {
    const [open, setOpen] = useState(false);

    useEffect(() => {
        scroll();
    }, []);

    return (
        <>
            <Button onClick={() => setOpen(true)}>
                <MenuIcon className="text-white" />
            </Button>
            <Drawer
                open={open}
                anchor={'right'}
                onClose={() => setOpen(false)}
                classes={{paper: 'bg-dark-blue'}}
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
                        paddingTop: '4vh',
                        color: 'white',
                    },
                }}
            >
                {menuItems.map((name, index) => (
                    <Button
                        key={index}
                        sx={{
                            color: 'white',
                            fontSize: '1rem',
                            fontWeight: 'bold',
                            minWidth: '100%',
                            display: 'block',
                            padding: '1rem',
                        }}
                        onClick={() => {
                            const element = document.getElementById(
                                name.toLowerCase(),
                            );
                            if (element) {
                                element.scrollIntoView({behavior: 'smooth'});
                            }
                            setOpen(false);

                            window.history.pushState(
                                null,
                                '',
                                `#${name.toLowerCase()}`,
                            );
                        }}
                    >
                        {name}
                    </Button>
                ))}
            </Drawer>
        </>
    );
};

export default NavMenu;
