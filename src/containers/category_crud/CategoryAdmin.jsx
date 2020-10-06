import React, { useState, useEffect } from "react";
import s from "./category.module.css";
import CrudHead from "../../components/crud_categories/crud_head/CrudHead.jsx";
import CrudTitle from "../../components/crud_categories/crud_list_title/CrudTitle.jsx";
import CrudItem from "../../components/crud_categories/crud_item/CrudItem.jsx";
import AddCategory from "../../components/crud_categories/add_category/AddCategory.jsx";
import DeleteCategory from "../../components/crud_categories/crud_delete_product/CrudDeleteCategory.jsx";

import { useSelector, useDispatch } from "react-redux";
import { getCategoryById, getCategories } from "../../actions/categories";

export default function Categories() {
  const dispatch = useDispatch();
  //obtiene la lista de categorias
  const categories = useSelector((state) => state.categories.categories);

  //Gestiona si se renderiza el componente CrudAddProduct
  const [renderAdd, setRenderAdd] = useState(false);
  //Gestiona si se renderiza el componente CrudEditProduct
  const [renderEdit, setRenderEdit] = useState(false);
  const [renderDelete, setRenderDelete] = useState(false);

  useEffect(() => {
    dispatch(getCategories());
  }, []);

  const updateRenderAdd = function (value) {
    setRenderAdd(value);
    dispatch(getCategories());
  };

  const updateRenderEdit = function (value, id) {
    if (renderEdit) {
      setRenderEdit(false);
      return dispatch(getCategories());
    }
    setRenderEdit(value);
    dispatch(getCategoryById(id));
    dispatch(getCategories());
  };

  const updateRenderDelete = function (value, id) {
    if (renderDelete) {
      setRenderDelete(false);
      return dispatch(getCategories());
    }
    dispatch(getCategoryById(id));
    setRenderDelete(value);
    dispatch(getCategories());
  };

  return (
    <div className={s.component}>
      {renderAdd && <AddCategory type="Add" onClose={updateRenderAdd} />}

      {renderEdit && <AddCategory type="Edit" onClose={updateRenderEdit} />}

      {renderDelete && <DeleteCategory onClose={updateRenderDelete} />}

      <CrudHead onAddCategory={updateRenderAdd} />
      <CrudTitle />
      {categories.length > 0 &&
        categories.map(function (category) {
          return (
            <CrudItem
              onEditCategory={updateRenderEdit}
              onDeleteCategory={updateRenderDelete}
              key={category.id}
              category={category}
            />
          );
        })}
    </div>
  );
}
