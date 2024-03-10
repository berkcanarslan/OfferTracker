'use client'
// OfferListPage.tsx
import React, { useState, useEffect } from 'react';
import Link from 'next/link';

interface Offer {
  id: number;
  mode: string;
  movementType: string;
  incoterms: string;
  countryCity: string;
  packageType: string;
  unit1: string;
  unit2: string;
  currency: string;
}

const OfferListPage: React.FC = () => {
  const [offers, setOffers] = useState<Offer[]>([]);

  useEffect(() => {
    // Fetch offers from the backend API when the component mounts
    const fetchOffers = async () => {
      try {
        const response = await fetch('http://localhost:5277/api/OfferTracker', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              // Add any additional headers if needed
            },
          });
        if (response.ok) {
          const data = await response.json();
          setOffers(data.data);
        } else {
          console.error('Error fetching offers:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching offers:', error);
      }
    };

    fetchOffers();
  }, []); // Empty dependency array ensures that the effect runs only once on mount

  const handleDeleteOffer = async (id: number) => {
    try {
      const response = await fetch(`http://localhost:5277/api/OfferTracker/?offerId=${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          // Add any additional headers if needed
        },
      });
      if (response.ok) {
        // Remove the deleted offer from the state
        setOffers((prevOffers) => prevOffers.filter((offer) => offer.id !== id));
      } else {
        console.error('Error deleting offer:', response.statusText);
      }
    } catch (error) {
      console.error('Error deleting offer:', error);
    }
  };

  return (
    <div>
      <h1 className="page-heading">Offer List Page</h1>
      <Link href="/createOffer" className="add-offer-button">
        Create Offer
      </Link>
      <table className="offer-table">
        <thead>
          <tr>
            <th>Mode</th>
            <th>Movement Type</th>
            <th>Incoterms</th>
            <th>Country-City</th>
            <th>Package Type</th>
            <th>Unit - 1</th>
            <th>Unit - 2</th>
            <th>Currency</th>
            <th>Action</th> 
          </tr>
        </thead>
        <tbody>
          {offers.map((offer, index) => (
            <tr key={offer.id} className={index % 2 === 0 ? 'even-row' : 'odd-row'}>
              <td>{offer.mode}</td>
              <td>{offer.movementType}</td>
              <td>{offer.incoterms}</td>
              <td>{offer.countryCity}</td>
              <td>{offer.packageType}</td>
              <td>{offer.unit1}</td>
              <td>{offer.unit2}</td>
              <td>{offer.currency}</td>
              <td>
                <button className="delete-button" onClick={() => handleDeleteOffer(offer.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OfferListPage;
