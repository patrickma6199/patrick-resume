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
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'center',
            inline: 'center',
        });
    }
};

type NavMenuProps = {
    atHomePage: boolean;
};

const NavMenu: React.FC<NavMenuProps> = ({atHomePage}) => {
    const [open, setOpen] = useState(false);

    useEffect(() => {
        scroll();
    }, []);

    return (
        <>
            <Button
                onClick={() => setOpen(true)}
                sx={{
                    zIndex: 1000,
                }}
            >
                <MenuIcon className="text-light-purple" />
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
                <Button
                    key={0}
                    sx={{
                        color: 'white',
                        fontSize: '1rem',
                        fontWeight: 'bold',
                        minWidth: '100%',
                        display: 'block',
                        padding: '1rem',
                    }}
                    onClick={() => {
                        if (atHomePage) {
                            const element = document.getElementById('landing');
                            if (element) {
                                element.scrollIntoView({
                                    behavior: 'smooth',
                                });
                            }
                            window.history.pushState(null, '', `#landing`);
                        } else {
                            window.location.href = `/#landing`;
                        }
                        setOpen(false);
                    }}
                >
                    Home
                </Button>
                {menuItems.map((name, index) => (
                    <Button
                        key={index + 1}
                        sx={{
                            color: 'white',
                            fontSize: '1rem',
                            fontWeight: 'bold',
                            minWidth: '100%',
                            display: 'block',
                            padding: '1rem',
                        }}
                        onClick={() => {
                            if (atHomePage) {
                                const element = document.getElementById(
                                    name.toLowerCase(),
                                );
                                if (element) {
                                    element.scrollIntoView({
                                        behavior: 'smooth',
                                    });
                                }
                                window.history.pushState(
                                    null,
                                    '',
                                    `#${name.toLowerCase()}`,
                                );
                            } else {
                                window.location.href = `/#${name.toLowerCase()}`;
                            }
                            setOpen(false);
                        }}
                    >
                        {name}
                    </Button>
                ))}
                <Button
                    key={3}
                    sx={{
                        color: 'white',
                        fontSize: '1rem',
                        fontWeight: 'bold',
                        minWidth: '100%',
                        display: 'block',
                        padding: '1rem',
                    }}
                    onClick={() => {
                        if (atHomePage) {
                            window.location.href = '/space';
                        }
                        setOpen(false);
                    }}
                >
                    Space Demo
                </Button>
            </Drawer>
        </>
    );
};

export default NavMenu;
