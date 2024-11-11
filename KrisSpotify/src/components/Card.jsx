import React, { useState, useEffect } from 'react';

const Card = () => {
  return (
    <div className="card">
      <h2>Search by lyrics</h2>
      <textarea name="searchbar" id="searchbar"></textarea>
      <h3>Sort results using your liked songs?</h3>
      <button className="btn">Yes</button>
      <button className="btn">No</button>
    </div>
  );
};

export default Card;
