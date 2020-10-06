import React, { useState, useEffect } from "react";
import s from "./Crud.module.css";
import CrudHead from "../../components/crud/crud_head/CrudHead.jsx";
import CrudTitle from "../../components/crud/crud_list_title/CrudTitle.jsx";
import CrudListItem from "../../components/crud/crud_item/CrudItem.jsx";
import CrudAddProduct from "./../../components/crud/crud_add_product/CrudAddProduct.jsx";
import CrudDeleteProduct from "./../../components/crud/crud_delete_product/CrudDeleteProduct.jsx";

import { useSelector, useDispatch } from "react-redux";

//Action Creators REDUX
import { getProducts, getProduct } from "../../actions/products";

export default function Crud() {
  //Conexion al Store de REDUX
  const { products, product } = useSelector((state) => state.products);
  //Gestiona si se renderiza el componente CrudAddProduct
  const [renderAdd, setRenderAdd] = useState(false);
  //Gestiona si se renderiza el componente CrudEditProduct
  const [renderEdit, setRenderEdit] = useState(false);
  //Gestiona si se renderiza el componente CrudUpdate
  const [renderDelete, setRenderDelete] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProducts());
  }, []);

  const updateRenderAdd = function (value) {
    setRenderAdd(value);
    dispatch(getProducts());
  };

  const updateRenderEdit = function (value, id) {
    if (renderEdit) {
      setRenderEdit(false);
      return dispatch(getProducts());
    }
    //Seteo El producto a editar en el store
    dispatch(getProduct(id));
    setRenderEdit(value);
    dispatch(getProducts());
  };

  const updateRenderDelete = function (value, id) {
    if (renderDelete) {
      setRenderDelete(false);
      return dispatch(getProducts());
    }
    //Seteo El producto a eliminar en el store
    dispatch(getProduct(id));
    setRenderDelete(value);
    dispatch(getProducts());
  };

  return (
    <div className={s.component}>
      {renderAdd && <CrudAddProduct type="Add" onClose={updateRenderAdd} />}

      {renderEdit && (
        <CrudAddProduct
          product={product}
          type="Edit"
          onClose={updateRenderEdit}
        />
      )}

      {renderDelete && <CrudDeleteProduct onClose={updateRenderDelete} />}
      <CrudHead onAddProduct={updateRenderAdd} />
      <CrudTitle />
      {products.length > 0 &&
        products.map(function (prod) {
          return (
            <CrudListItem
              onEditProduct={updateRenderEdit}
              onDeleteProduct={updateRenderDelete}
              key={prod.id}
              product={prod}
            />
          );
        })}
    </div>
  );
}
