import React from "react";

export default function FilterItem({ name, id }) {
  return (
    <div>
      <input type="radio" name="filter" id={id} value={id} />
      <label htmlFor={id}>
        <h2>{name}</h2>
      </label>
    </div>
  );
}
