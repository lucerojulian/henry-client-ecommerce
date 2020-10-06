import React, { useState } from "react";
import s from "./Review.module.css";
import CancelBtn from "../cancel_btn/CancelBtn.jsx";
import CloseBtn from "../close_btn/CloseBtn.jsx";
import SuccessBtn from "../success_btn/SuccessBtn.jsx";
import Alert from "@material-ui/lab/Alert";
import axios from "axios";
import { getProduct } from "../../actions/products";
import { useDispatch } from "react-redux";

export default function Review(props) {
  const [renderUpdate, setRenderUpdate] = useState(false);
  // console.log(props.onClose + "OLA");
  const dispatch = useDispatch();
  const [success, setSuccess] = useState();
  const onSubmitHandle = function (event) {
    event.preventDefault();
    const data = {
      title: input.title,
      stars: input.stars,
      description: input.description,
      idUser: props.userId,
    };

    axios
      .post(`http://localhost:3000/products/${props.productId}/review`, data)
      .then((review) => {
        console.log(review);
      })
      .catch((error) => console.log(error));
    dispatch(getProduct(props.productId));
    props.onClose(false);
  };

  const handleInputChange = function (e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    if (e.target.name === "stars") {
      setInput({ ...input, [e.target.name]: Number(e.target.value) });
    }
  };

  const [input, setInput] = useState({
    title: "",
    stars: "",
    description: "",
  });

  return (
    <form className={s.form} onSubmit={onSubmitHandle}>
      <div className={s.content}>
        <CloseBtn close={props.onClose} />
        <div className={s.inputs}>
          <fieldset>
            <legend>Titulo</legend>
            <input
              value={input.title}
              className={s.input}
              onChange={handleInputChange}
              type="text"
              name="title"
              required
            />
          </fieldset>
        </div>
        <fieldset>
          <legend>Descripcion</legend>
          <textarea
            value={input.description}
            className={s.input}
            onChange={handleInputChange}
            type="text"
            name="description"
            placeholder="Haz tu Comentario"
            required
          ></textarea>
        </fieldset>

        <div className={s.estrellas}>
          <fieldset>
            <legend>Stars</legend>
            <input
              value={input.stars}
              className={s.input}
              onChange={handleInputChange}
              type="number"
              name="stars"
              min="0"
              max="5"
              required
            />
          </fieldset>
          {success && (
            <Alert severity="success">Review agregada correctamente</Alert>
          )}

          <SuccessBtn className={s.success} text={"Agregar Review"} />

          <CancelBtn text="Cancelar" close={props.onClose} />
        </div>
      </div>
    </form>
  );
}
