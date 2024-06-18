import React, { useState, useEffect, useCallback } from 'react';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

function CustomCheckbox({ defaultChecked = false, updateCheckbox = () => { }, label, name }) {
    const [checked, setChecked] = useState(defaultChecked);

    useEffect(() => {
        setChecked(defaultChecked);
    }, [defaultChecked]);

    const handleChange = useCallback((event) => {
        const { checked } = event.target;
        setChecked(checked);
        updateCheckbox(checked);
    }, [updateCheckbox]);

    return (
        <FormControlLabel
            control={
                <Checkbox
                    checked={checked}
                    name={name}
                    onChange={handleChange}
                    color="primary"
                />
            }
            label={label}
        />
    );
}

export default React.memo(CustomCheckbox);