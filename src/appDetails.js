import React from 'react';

export default function AppDetails(props) {
  return (
    <div className = "app">
      <h2>{props.App}</h2>
      <div className = "app_category">Category: {props.Category}</div>
      <div className = "app_rating">Rating: {props.Rating}</div>
      <div className = "app_genre">Genre(s): {props.Genres}</div>
    </div>
  );
}