import React, { useState } from 'react';
import PlacesAutocomplete, { geocodeByAddress } from 'react-places-autocomplete';
import InputField from './InputField';
import { Paper, MenuItem } from '@mui/material';

function AddressAutocomplete({ onAddressSelect }) {
  const [address, setAddress] = useState('');

  const handleChange = (address) => {
    setAddress(address);
  };

  const handleSelect = async (address) => {
    const results = await geocodeByAddress(address);
    const addressComponents = results[0].address_components;
    let addressLine1 = '';
    let addressLine2 = '';
    let state = '';
    let postcode = '';
    addressComponents.forEach(component => {
      if (component.types.includes('street_number')) {
        addressLine1 += component.long_name + ' ';
      }
      if (component.types.includes('route')) {
        addressLine1 += component.long_name;
      }
      if (component.types.includes('subpremise')) {
        addressLine2 += component.long_name;
      }
      if (component.types.includes('administrative_area_level_1')) {
        state = component.long_name;
      }
      if (component.types.includes('postal_code')) {
        postcode = component.long_name;
      }
    });
    setAddress(addressLine1);
    onAddressSelect({ addressLine2, state, postcode });
  };

  return (
    <PlacesAutocomplete
      value={address}
      onChange={handleChange}
      onSelect={handleSelect}
      searchOptions={{ componentRestrictions: { country: 'AU' } }}
    >
      {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
        <div >
          <InputField
            {...getInputProps({
              labelText: 'Address Line 1'
            })}
            name='address'
            type='text'
          />
          {suggestions.length > 0 && (
            <Paper elevation={2} style={{ position: 'absolute', zIndex: 1, width: '100%' }}>
              {suggestions.map(suggestion => (
                <MenuItem
                  {...getSuggestionItemProps(suggestion, {
                    style: {cursor: 'pointer'}})}
                  key={suggestion.placeId}
                >
                  {suggestion.description}
                </MenuItem>
              ))}
            </Paper>
          )}
        </div>
      )}
    </PlacesAutocomplete>
  );
};

export default AddressAutocomplete;