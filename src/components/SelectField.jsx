import React, { useState,useEffect} from 'react';
import { Grid, Select, MenuItem,FormHelperText } from '@mui/material';
import Label from './Label';

function SelectField({ name, labelText, placeholder, options,...otherProps }) {

    const [value, setValue] = useState('');
    const [error, setError] = useState('');
    const isRequired = !labelText.includes('(optional)');
    const handleChange = (event) => {
        setValue(event.target.value);
        sessionStorage.setItem(name, event.target.value);
        setError('');
    };
    useEffect(() => {
        const storedValue = sessionStorage.getItem(name);
        if (storedValue) {
            setValue(storedValue);
        }
    }, [name]);
    useEffect(() => {
        if ('value' in otherProps && otherProps.value) {
            setValue(otherProps.value);
            sessionStorage.setItem(name, otherProps.value);
        }
    }, [otherProps.value]);
    const handleBlur = () => {
        if (isRequired && !value.trim()) {
            setError('This field is required');
            return;
        }
    };
    return (
        <Grid container gap='8px'>
            <Grid item xs={12}>
            <Label labelText={labelText} />
            </Grid>
            <Grid item xs={12}>
                <Select
                    name={name}
                    value={value}
                    onBlur={handleBlur}
                    fullWidth 
                    displayEmpty
                    size='small'
                    error={!!error}
                    onChange={handleChange}
                >
                    {placeholder && <MenuItem value='' disabled>{placeholder}</MenuItem>}
                    {options&&options.map(option => (
                        <MenuItem key={option} value={option}>{option}</MenuItem>
                    ))}
                </Select>
                {error && <FormHelperText error>{error}</FormHelperText>}
            </Grid>
        </Grid>
    );
}



export default SelectField;