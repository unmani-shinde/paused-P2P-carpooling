import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';

const allStops = [
  'Vapi, Gujarat',
  'Vasai, Palghar, Maharashtra',
  'Borivali, Maharashtra',
  'Andheri, Maharashtra'
];

const inputContainerStyle = {
  position: 'relative',
  display: 'inline-block',
  width: '200px'
};

const dropdownMenuStyle = {
  position: 'absolute',
  top: '100%',
  left: 0,
  zIndex: 1,
  width: '100%',
  marginTop: '0.5rem'
};

const inputStyle = {
  padding: '0.5rem',
  width: '100%',
  border: '1px solid #ced4da',
  borderRadius: '0.25rem'
};

function FilterRidesExample() {
  const [inputValue, setInputValue] = useState('');
  const [filteredLocations, setFilteredLocations] = useState([]);

  // Function to handle input change
  const handleInputChange = (event) => {
    const value = event.target.value;
    setInputValue(value);

    // Filter locations based on input value
    const filtered = allStops.filter((location) =>
      location.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredLocations(filtered);
  };

  // Function to handle location selection
  const handleLocationSelect = (location) => {
    setInputValue(location);
  };

  return (
    <div style={inputContainerStyle}>
      <input
        type="text"
        placeholder="Enter a location"
        value={inputValue}
        onChange={handleInputChange}
        style={inputStyle}
      />
      {filteredLocations.length > 0 && (
        <div style={dropdownMenuStyle}>
          {filteredLocations.map((location, index) => (
            <Dropdown.Item
              key={index}
              onClick={() => handleLocationSelect(location)}
            >
              {location}
            </Dropdown.Item>
          ))}
        </div>
      )}
    </div>
  );
}

export default FilterRidesExample;
