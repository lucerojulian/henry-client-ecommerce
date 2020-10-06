import React, { useState } from "react";
import { useHistory } from "react-router-dom";
//Estilos personalizados
import s from "./SearchInput.module.css";
import SearchIcon from "@material-ui/icons/Search";
//debe recibir una funcion por props
export default function SearchInput() {
  let history = useHistory();
  const [search, setSearch] = useState("");
  //Agregar onSubmit a la funcion pasada por props
  ///search?valor=texto
  const handleInputChange = function (e) {
    let input = e.target.value.split(" ").join("_");
    setSearch(input);
  };

  const onSubmitHandle = function (e) {
    e.preventDefault();
    history.push(`/catalogo?buscar=${search}`)
    //window.location.replace(`/catalogo?buscar=${search}`);
  };

  //<input type="submit" value="Buscar" />
  return (
    <form className={s.searchInput} onSubmit={onSubmitHandle}>
      <input type="text" placeholder="Buscar..." onChange={handleInputChange} />
      <button type="submit">
        <SearchIcon />
      </button>
    </form>
  );
}
