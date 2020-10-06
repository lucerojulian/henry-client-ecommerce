import React from "react";
import s from "./CrudItem.module.css";
import Button from "@material-ui/core/Button";
import replaceChars from "../../../helpers/replaceChars";

export default function CrudItem({
  category,
  onEditCategory,
  onDeleteCategory,
}) {
  return (
    <div className={s.component}>
      <div className={s.div}> {replaceChars(category.name)} </div>

      <div className={s.button}>
        <Button
          onClick={() => onEditCategory(true, category.id)}
          variant="contained"
          color="primary"
          className={s.button}
        >
          Editar
        </Button>

        <Button
          onClick={() => onDeleteCategory(true, category.id)}
          variant="contained"
          color="secondary"
          className={s.button}
        >
          Eliminar
        </Button>
      </div>
    </div>
  );
}
