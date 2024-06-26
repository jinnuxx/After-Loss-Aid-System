import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import { Grid } from "@mui/material";
import Label from "./Label";
function isValidEmail(email) {
  if (!email || !email.trim()) {
    return true;
  }
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
function isValidPhone(phone) {
  if (!phone || !phone.trim()) {
    return true;
  }
  return /^04\d{8}$/.test(phone);
}

function InputField({ name, type, labelText, ...otherProps }) {
  const [value, setValue] = useState("");
  const [error, setError] = useState("");
  const isRequired = !labelText.includes("(optional)");
  const today = type === 'date' ? new Date().toISOString().split('T')[0] : null;

  const handleDateChange = (event) => {
    let hasError = false;
    const formattedDate = event.target.value;
    setValue(formattedDate);
    sessionStorage.setItem(name, formattedDate);
    if (otherProps.onChange) {
      otherProps.onChange(event);
    }
  };
  useEffect(() => {
    const storedValue = sessionStorage.getItem(name);
    if (storedValue) {
      setValue(storedValue);
    }
  }, [name]);
  useEffect(() => {
    if ("value" in otherProps && otherProps.value) {
      if (error == "") {
        setValue(otherProps.value);
        sessionStorage.setItem(name, otherProps.value);
        console.log(name, value);
      }
    }
  }, [otherProps.value]);
  const handleChange = (event) => {
    let hasError = false;
    if (isRequired && !event.target.value.trim()) {
      setError("This field is required");
      hasError = true;
    } else {
      switch (type) {
        case "email":
          if (!isValidEmail(event.target.value)) {
            setError("Please enter a valid email address");
            hasError = true;
          }
          break;
        case "tel":
          if (!isValidPhone(event.target.value)) {
            setError("Please enter a valid phone number");
            hasError = true;
          }
          break;
        default:
          break;
      }
    }

    if (!hasError) {
      setError("");
    }
    setValue(event.target.value);
    if (!hasError) {
      sessionStorage.setItem(name, event.target.value);
      console.log(name);
    } else {
      sessionStorage.removeItem(name);
    }
    if (otherProps.onChange) {
      otherProps.onChange(event);
    }
  };
  return (
    <Grid container gap="8px">
      <Grid item xs={12}>
        <Label labelText={labelText} />
      </Grid>
      <Grid item xs={12}>
        <TextField
          {...otherProps}
          type={type === "date" ? "date" : type}
          name={name}
          value={value}
          onChange={type === "date" ? handleDateChange : handleChange}
          required={isRequired}
          size="small"
          helperText={error}
          error={!!error}
          fullWidth
          InputLabelProps={{ shrink: true, }}
          inputProps={{ max: today }} 
        />
      </Grid>
    </Grid>
  );
}

export default InputField;
