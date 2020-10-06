import React, { useEffect } from "react";
import s from "./Catalogue.module.css";
import FilterItem from "../../components/filter_item/FilterItem.jsx";
import { useSelector, useDispatch } from "react-redux";
import replaceChars from "../../helpers/replaceChars";

//HELPERS
import getOrCreateLocalStorage from "../../helpers/getLocalStorage";

//Actions para dispatcehar
import {
  getProducts,
  searchProduct,
  getProductsCategory,
} from "../../actions/products";
import { getCategories } from "../../actions/categories";

//CART
import { getCart, fetchCartFromDb } from "../../actions/cart";

//componentes
import ProductCard from "../../components/product_card/ProductCard.jsx";
import Alert from "@material-ui/lab/Alert";

export default function Catalogue() {
  // Redux - Store:
  //State de products
  const products = useSelector((state) => state.products.products);
  const message = useSelector((state) => state.cart.message);

  //State con user
  const user = useSelector((state) => state.authentication.user);

  //State con Categorias
  const categories = useSelector((state) => state.categories.categories);

  const params = new URLSearchParams(window.location.search);
  var query = params.get("buscar");

  //Para Dispatchear las Acciones
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProducts());
    dispatch(getCategories());
  }, []);

  useEffect(() => {
    if (query !== null) {
      dispatch(searchProduct(query));
    }
    if (query === null) {
      dispatch(getProducts);
    }
  }, [query]);

  //Filtra Productos de acuerdo a la Categoria Seleccionada
  const getFilter = function (e) {
    let filterId = e.target.id;
    if (filterId !== "all") {
      dispatch(getProductsCategory(filterId));
    }
    if (filterId === "all") {
      dispatch(getProducts());
    }
  };

  return (
    <div className={s.catalogue}>
      <div
        id="filters"
        className={s.filters}
        onChange={(e) => {
          getFilter(e);
        }}
      >
        <div>
          <input type="radio" name="filter" value="all" id="all" />
          <label htmlFor="all">
            <h2>Todos los productos</h2>
          </label>
        </div>
        {categories.map(function (category) {
          return (
            <FilterItem
              key={category.id}
              name={replaceChars(category.name)}
              id={category.id}
            />
          );
        })}
      </div>
      <div className={s.products}>
        {message && (
          <Alert severity="warning">
            El Producto ya se encuentra en el carrito
          </Alert>
        )}
        <div className={s.listproducts}>
          {products.length > 0 ? (
            products.map(function (product) {
              var array = product.image;
              var newArray = [];
              if (array) {
                newArray = array.split("ImageSeparator");
              }
              if (product.stock <= 0) {
                return "EL PRODUCTO NO ESTA DISPONIBLE";
              } else {
                return (
                  <ProductCard
                    key={product.id}
                    id={product.id}
                    name={product.name}
                    stock={product.stock}
                    price={product.price}
                    description={product.description}
                    image={newArray[0]}
                    product={product}
                  />
                );
              }
            })
          ) : (
            <h2>Sin productos Disponibles</h2>
          )}
        </div>
      </div>
    </div>
  );
}
