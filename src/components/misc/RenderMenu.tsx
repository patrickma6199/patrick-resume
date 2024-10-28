import React, {useState} from 'react';
import {Slider, Checkbox} from '@mui/material';
import Button from './Button';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

type RenderMenuProps = {
    timeRate: menuItem;
    showOrbits: menuItem;
    ambientIntensity: menuItem;
};

interface menuItem {
    value: any;
    setValue: (value: any) => void;
    resetValue?: () => void;
}

const RenderMenu: React.FC<RenderMenuProps> = ({
    timeRate,
    showOrbits,
    ambientIntensity,
}) => {
    const [isOpen, setIsOpen] = useState(true);
    const handleTimeSliderChange = (
        event: Event,
        newValue: number | number[],
    ) => {
        timeRate.setValue(newValue as number);
    };
    const handleAmbientIntensitySliderChange = (
        event: Event,
        newValue: number | number[],
    ) => {
        ambientIntensity.setValue(newValue as number);
    };

    return (
        <>
            <div
                className={`font-mono bg-gradient-to-tr rounded-lg shadow-md p-3 from-darker-blue via-light-blue to-light-purple text-white w-[40%] md:w-[10%] min-h-min flex flex-col z-50 absolute right-1 bottom-1 box-border transition-transform duration-500 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
            >
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="p-1 absolute top-1 right-1 text-white rounded-lg"
                    aria-label="Toggle Menu"
                >
                    <ChevronRightIcon />
                </button>
                <h3 className="font-bold text-sm md:text-lg">SETTINGS</h3>
                <div className="flex flex-row w-full justify-between items-center">
                    <p className="text-xs md:text-sm">Show Orbits</p>
                    <Checkbox
                        checked={showOrbits.value}
                        onChange={event =>
                            showOrbits.setValue(event.target.checked)
                        }
                        inputProps={{'aria-label': 'controlled'}}
                        sx={{
                            color: '#be95be', // Change the color of the checkbox when unchecked
                            '&.Mui-checked': {
                                color: '#be95be', // Change the color when checked
                            },
                        }}
                    />
                </div>
                <p className="text-xs md:text-sm">
                    Time Rate: {timeRate.value.toFixed(2)}
                </p>
                <Slider
                    value={timeRate.value}
                    onChange={handleTimeSliderChange}
                    min={0.01}
                    max={2}
                    step={0.01}
                    valueLabelDisplay="auto"
                    marks
                    sx={{
                        color: '#1976d2', // Change the main track and thumb color
                        '& .MuiSlider-thumb': {
                            backgroundColor: '#be95be', // Thumb color
                        },
                        '& .MuiSlider-track': {
                            backgroundColor: '#1976d2', // Track color
                        },
                        '& .MuiSlider-rail': {
                            backgroundColor: '#bfbfbf', // Rail color
                        },
                    }}
                />
                <p className="text-xs md:text-sm">
                    Ambient Intensity: {ambientIntensity.value.toFixed(2)}
                </p>
                <Slider
                    value={ambientIntensity.value}
                    onChange={handleAmbientIntensitySliderChange}
                    min={0.01}
                    max={2}
                    step={0.01}
                    valueLabelDisplay="auto"
                    marks
                    sx={{
                        color: '#1976d2', // Change the main track and thumb color
                        '& .MuiSlider-thumb': {
                            backgroundColor: '#be95be', // Thumb color
                        },
                        '& .MuiSlider-track': {
                            backgroundColor: '#1976d2', // Track color
                        },
                        '& .MuiSlider-rail': {
                            backgroundColor: '#bfbfbf', // Rail color
                        },
                    }}
                />
            </div>
            {!isOpen && (
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="p-1 absolute bg-gradient-to-tr from-dark-blue via-light-blue to-light-purple bottom-1 right-1 text-white rounded-lg"
                    aria-label="Toggle Menu"
                >
                    <ChevronLeftIcon />
                </button>
            )}
        </>
    );
};

export default RenderMenu;
