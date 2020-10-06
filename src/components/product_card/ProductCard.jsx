//IMPORTANDO REACT
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
//IMPORTS PROPIOS
import defaultImg from "../../img/default.jpg";
import s from "./ProductCard.module.css";
import replaceChars from "../../helpers/replaceChars";

import { useDispatch, useSelector } from "react-redux";
import { addToCart, cleanMessage } from "../../actions/cart";

const shortText = function (text) {
  var newText = text.substring(0, 50);
  newText = newText.charAt(0).toUpperCase() + newText.slice(1);

  if (text.length > 50) {
    return newText + "...";
  }
  return newText;
};

export default function ProductCard(props) {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.products);
  const user = useSelector((state) => state.authentication.user);

  useEffect(() => {
    localStorage.setItem("Cart", JSON.stringify(cart));
  }, [cart]);

  const addToCarrito = function () {
    if (user) {
      dispatch(addToCart(props.product, user.id));
      setTimeout(() => {
        dispatch(cleanMessage());
      }, 2000);
      return;
    }
    dispatch(addToCart(props.product));
    setTimeout(() => {
      dispatch(cleanMessage());
    }, 2000);
  };

  return (
    <div className={s.card}>
      <div className={s.image}>
        <img
          src={props.image !== "" ? props.image : defaultImg}
          alt={props.name}
        />
      </div>
      <div className={s.content}>
        <div className={s.title}>
          <p>{replaceChars(props.name)}</p>
        </div>
        <p className={s.price}>{"$ " + props.price}</p>
        <p className={s.description}>{shortText(props.description)}</p>
      </div>
      <div className={s.actions}>
        <Link className={s.title} to={`/product/${props.id}`}>
          <button>Ver Producto</button>
        </Link>
        <button onClick={addToCarrito}>Añadir al carrito</button>
      </div>
    </div>
  );
}
