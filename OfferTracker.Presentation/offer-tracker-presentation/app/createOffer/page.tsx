'use client'
// Import necessary dependencies
import React, { useState } from 'react';
import { Tooltip } from 'react-tooltip'
import InformationBox from './informationbox';


// Define the OfferPage component
const OfferPage: React.FC = () => {
  // State to store user inputs
  const [mode, setMode] = useState<string>('');
  const [movementType, setMovementType] = useState<string>('');
  const [incoterms, setIncoterms] = useState<string>('');
  const [countryCity, setCountryCity] = useState<string>('');
  const [packageType, setPackageType] = useState<string>('');
  const [unit1Value, setUnit1Value] = useState<number | ''>('');
  const [unit1, setUnit1] = useState<string>('');
  const [unit2Value, setUnit2Value] = useState<number | ''>('');
  const [unit2, setUnit2] = useState<string>('');
  const [currency, setCurrency] = useState<string>('');

  // Options for dropdowns
  const modeOptions = ['LCL', 'FCL', 'Air'];
  const movementTypeOptions = ['Door to Door', 'Port to Door', 'Door to Port', 'Port to Port'];
  const incotermsOptions = ['Delivered Duty Paid (DDP)', 'Delivered At Place (DAT)'];
  const countryCityOptions = {
    USA: ['New York', 'Los Angeles', 'Miami', 'Minnesota'],
    China: ['Beijing', 'Shanghai'],
    Turkey: ['Istanbul', 'Izmir'],
  };
  const packageTypeOptions = ['Pallets', 'Boxes', 'Cartons'];
  const unit1Options = ['CM', 'IN'];
  const unit2Options = ['KG', 'LB'];
  const currencyOptions = ['USD - US Dollar', 'CNY - Chinese Yuan', 'TRY - Turkish Lira'];
// Function to handle form submission
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  // Prepare the data to be sent to the backend
  const formData = {
    mode,
    movementType,
    incoterms,
    countryCity,
    packageType,
    unit1: `${unit1Value} ${unit1}`, // Combine value and unit for unit-1
    unit2: `${unit2Value} ${unit2}`, // Combine value and unit for unit-2
    currency,
  };

  try {
    // Send a POST request to the backend API
    const response = await fetch('http://localhost:5277/api/OfferTracker', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Add any additional headers if needed
      },
      body: JSON.stringify(formData),
    });

    // Parse the JSON response
    const responseData = await response.json();

    // Handle the response from the backend (you can customize this part based on your needs)
    window.location.href = '/';
  } catch (error) {
    // Handle errors (e.g., display an error message to the user)
    console.error('Error:', error);
  }
};



return (
  <div className='offer-page-container'>
    <h1 className='offer-page-heading'>Offer Page</h1>
    <form className='form-container' onSubmit={handleSubmit}>
      {/* Mode */}
      <div className='form-field'>
      <InformationBox content="Explanation for Mode"></InformationBox>
        <label htmlFor="mode" className='form-label'>
          Mode:
        </label>
        <select
          required
          value={mode}
          onChange={(e) => setMode(e.target.value)}
          className='form-input'
        >
          <option value="">Select Mode</option>
          {modeOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <Tooltip id="mode-tooltip" />
      </div>

      {/* Movement Type */}
      <div className='form-field'>
      <InformationBox content="Explanation for Movement"></InformationBox>
        <label htmlFor="movementType" className='form-label'>Movement Type:</label>
        <select required value={movementType} onChange={(e) => setMovementType(e.target.value)} className='form-input'>
          <option value="">Select Movement Type</option>
          {movementTypeOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      {/* Incoterms */}
      <div className='form-field'>
      <InformationBox content="Explanation for Incoterms"></InformationBox>
        <label htmlFor="incoterms" className='form-label'>Incoterms:</label>
        <select required value={incoterms} onChange={(e) => setIncoterms(e.target.value)} className='form-input'>
          <option value="">Select Incoterms</option>
          {incotermsOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      {/* Countries-Cities */}
      <div className='form-field'>
      <InformationBox content="Explanation for Country/cities"></InformationBox>
        <label htmlFor="countryCity" className='form-label'>Countries-Cities:</label>
        <select required value={countryCity} onChange={(e) => setCountryCity(e.target.value)} className='form-input'>
          <option value="">Select Country-City</option>
          {Object.entries(countryCityOptions).map(([country, cities]) => (
            <optgroup key={country} label={country}>
              {cities.map((city) => (
                <option key={city} value={`${country}-${city}`}>
                  {city}
                </option>
              ))}
            </optgroup>
          ))}
        </select>
      </div>

      {/* Package Type */}
      <div className='form-field'>
      <InformationBox content="Explanation for Package Type"></InformationBox>
        <label htmlFor="packageType" className='form-label'>Package Type:</label>
        <select required value={packageType} onChange={(e) => setPackageType(e.target.value)} className='form-input'>
          <option value="">Select Package Type</option>
          {packageTypeOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      {/* Unit -1 */}
      <div className="form-field">
      <InformationBox content="Explanation for Unit1"></InformationBox>
          {/* Unit - 1 */}
          <label htmlFor="unit1" className="form-label">Unit - 1:</label>
          <input
          className='form-input'
          required
            type="number"
            id="unit1"
            value={unit1Value}
            onChange={(e) => setUnit1Value(e.target.value !== '' ? Number(e.target.value) : '')}
          />
          <select
          className='form-input'
          required
            value={unit1}
            onChange={(e) => setUnit1(e.target.value)}
          >
          <option value="">Select Unit</option>
          {unit1Options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
          </select>
        </div>

      {/* Unit -2 */}
      <div className="form-field">
      <InformationBox content="Explanation for Unit2"></InformationBox>
          {/* Unit - 2 */}
          <label htmlFor="unit2">Unit - 2:</label>
          <input
          required
          className='form-input'
            type="number"
            id="unit2"
            value={unit2Value}
            onChange={(e) => setUnit2Value(e.target.value !== '' ? Number(e.target.value) : '')}
          />
          <select
          className='form-input'
          required
            value={unit2}
            onChange={(e) => setUnit2(e.target.value)}
          >
          <option value="">Select Unit</option>
          {unit2Options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
          </select>
        </div>

      {/* Currency */}
      <div className='form-field'>
      <InformationBox content="Explanation for Currency"></InformationBox>
        <label htmlFor="currency" className='form-label'>Currency:</label>
        <select required value={currency} onChange={(e) => setCurrency(e.target.value)} className='form-input'>
          <option value="">Select Currency</option>
          {currencyOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      {/* Submit Button */}
      <div className='form-field'>
        <button type="submit" className='submit-button'>Submit</button>
      </div>
    </form>
  </div>
);
};

export default OfferPage;
