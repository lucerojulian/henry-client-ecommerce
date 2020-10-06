import React from "react";
import s from "./CrudTitle.module.css";

export default function Title() {
  return (
    <div className={s.grid}>
      <div className={s.letra}> Id </div>
      <div className={s.letra}> Nombre </div>
      <div className={s.letra}> Precio </div>
      <div className={s.letra}> Categorias </div>
      <div className={s.letra}> Acciones </div>
    </div>
  );
}
