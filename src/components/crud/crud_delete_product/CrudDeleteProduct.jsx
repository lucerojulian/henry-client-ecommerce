import React, { useState } from "react";
import s from "./CrudDeleteProduct.module.css";
import Alert from "@material-ui/lab/Alert";
import CloseBtn from "../../close_btn/CloseBtn.jsx";
import CancelBtn from "../../cancel_btn/CancelBtn.jsx";
import SuccessBtn from "../../success_btn/SuccessBtn.jsx";

import { useSelector, useDispatch } from "react-redux";
import { deleteProduct } from "../../../actions/products";

export default function CrudDeleteProduct({ onClose }) {
  const dispatch = useDispatch();

  //Conexion al Store de REDUX
  const product = useSelector((state) => state.products.product);

  const [success, setSuccess] = useState(false);

  const onSubmitHandle = function (event) {
    event.preventDefault();
    //Dispara Accion que elimina el product
    dispatch(deleteProduct(product.id));
    setSuccess(true);
  };

  return (
    <form className={s.form} onSubmit={onSubmitHandle}>
      <div className={s.content}>
        <CloseBtn close={onClose} />
        <h3>Eliminar producto</h3>
        <div className={s.info}>
          <p>
            <span>Nombre: </span>
            {product.name}
          </p>
          <p>
            <span>Descripcion: </span>
            {product.description}
          </p>
          <p>
            <span>Precio: </span>
            {product.price}
          </p>
          <p>
            <span>Stock: </span>
            {product.stock}
          </p>
        </div>
        {success && (
          <Alert severity="success">Producto eliminado correctamente</Alert>
        )}
        <SuccessBtn text="Eliminar Producto" />
        <CancelBtn text="Cancelar" close={onClose} />
      </div>
    </form>
  );
}
