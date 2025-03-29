import React from 'react';
import './HousePricePredictor.css';
import { useState } from 'react';
function HousePricePredictor() {
    const [formData, setFormData] = useState({
        city: '',
        province: '',
        latitude: '',
        longitude: '',
        lease_term: '',
        type: '',
        beds: '',
        baths: '',
        sq_feet: '',
        furnishing: 'Unfurnished',
        smoking: 'No',
        pets: false,
    });

    const [prediction, setPrediction] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value
        });
    };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
        const response = await fetch('http://127.0.0.1:5000/predict_house_price', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });

        const data = await response.json();
        if (data.predicted_price) {
            setPrediction(data.predicted_price);
          } else {
            setError('Failed to get a prediction. Please try again.');
          }
        } 
        catch (error) {
          setError('Network error. Please try again.');
        } 
        finally {
          setIsLoading(false);
        }
    };



    return (
        <div className="house-price-predictor">
            <h1>House Price Predictor</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="city">City:</label>
                    <input
                        type="text"
                        id="city"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="province">Province:</label>
                    <input
                        type="text"
                        id="province"
                        name="province"
                        value={formData.province}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="latitude">Latitude:</label>
                    <input
                        type="number"
                        id="latitude"
                        name="latitude"
                        value={formData.latitude}
                        onChange={handleChange}
                        step="any"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="longitude">Longitude:</label>
                    <input
                        type="number"
                        id="longitude"
                        name="longitude"
                        value={formData.longitude}
                        onChange={handleChange}
                        step="any"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="leaseTerm">Lease Term:</label>
                    <input
                        type="text"
                        id="leaseTerm"
                        name="lease_term"
                        value={formData.lease_term}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="houseType">Type:</label>
                    <input
                        type="text"
                        id="houseType"
                        name="type"
                        value={formData.type}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="beds">Beds:</label>
                    <input
                        type="number"
                        id="beds"
                        name="beds"
                        value={formData.beds}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="baths">Baths:</label>
                    <input
                        type="number"
                        id="baths"
                        name="baths"
                        value={formData.baths}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="squareFeet">Square Feet:</label>
                    <input
                        type="number"
                        id="squareFeet"
                        name="sq_feet"
                        value={formData.sq_feet}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="furnishing">Furnishing:</label>
                    <select
                        id="furnishing"
                        name="furnishing"
                        value={formData.furnishing}
                        onChange={handleChange}
                        required
                    >
                        <option value="Unfurnished">Unfurnished</option>
                        <option value="Partially Furnished">Partially Furnished</option>
                        <option value="Fully Furnished">Fully Furnished</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="smoking">Smoking:</label>
                    <select
                        id="smoking"
                        name="smoking"
                        value={formData.smoking}
                        onChange={handleChange}
                        required
                    >
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="pets">I have a Pet:</label>
                    <input
                        type="checkbox"
                        id="pets"
                        name="pets"
                        checked={formData.pets}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit" disabled={isLoading}>
                    {isLoading ? 'Predicting...' : 'Predict'}
                </button>
            </form>
            {error && <p className="error-message">{error}</p>}
            {prediction && (
            <div className="prediction-result">
            <p>Predicted Rent Price: <strong>${prediction.toFixed(2)}</strong></p>
            </div>
        )}
        </div>
    );
}    
export default HousePricePredictor