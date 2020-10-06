import React from "react";
import s from './CategoryItem.module.css';

export default function CategoryItem({ id, name, onCheck }) {
  return (
    <div className={s.categoryItem}>
      <input
        type="checkbox"
        value={id}
        id={id}
        name={name}
        onChange={onCheck}
      />
      <label htmlFor={id}>{name}</label>
    </div>
  );
}
