import React from 'react';
import {Slider, Checkbox} from '@mui/material';
import Button from './Button';

type RenderMenuProps = {
    timeRate: menuItem;
    showOrbits: menuItem;
};

interface menuItem {
    value: any;
    setValue: (value: any) => void;
    resetValue?: () => void;
}

const RenderMenu: React.FC<RenderMenuProps> = ({timeRate, showOrbits}) => {
    const handleSliderChange = (event: Event, newValue: number | number[]) => {
        timeRate.setValue(newValue as number);
    };

    return (
        <div className="font-mono bg-gradient-to-tr rounded-lg shadow-md p-3 from-darker-blue via-light-blue to-light-purple text-white w-[50%] md:w-[10%] min-h-min flex flex-col z-50 absolute right-1 bottom-1 box-border">
            <h3 className="font-bold text-lg">SETTINGS</h3>
            <div className="flex flex-row w-full justify-between items-center">
                <p>Show Orbits</p>
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
            <p>Time Rate: {timeRate.value.toFixed(2)}</p>
            <Slider
                value={timeRate.value}
                onChange={handleSliderChange}
                min={0.01}
                max={1}
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
            <Button
                text="Reset Time Rate"
                onClick={timeRate.resetValue!}
                bgColor="bg-transparent"
            />
        </div>
    );
};

export default RenderMenu;
