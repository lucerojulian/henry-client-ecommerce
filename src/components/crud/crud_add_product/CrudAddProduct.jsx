import React, { useState, useEffect } from "react";
import Alert from "@material-ui/lab/Alert";
import s from "./CrudAddProduct.module.css";
import defaultImage from "../../../img/default.jpg";
import CloseBtn from "../../close_btn/CloseBtn.jsx";
import CategoryItem from "../../category_item/CategoryItem.jsx";
import CancelBtn from "../../cancel_btn/CancelBtn.jsx";
import SuccessBtn from "../../success_btn/SuccessBtn.jsx";
import ImgSlider from '../../images_slider/ImgSlider.jsx';

import { useSelector, useDispatch } from "react-redux";
//Actions REDUX
import { getCategories } from "../../../actions/categories";
import { addProduct, editProduct } from "../../../actions/products";

// const images=[{image:"https://i.pinimg.com/474x/fd/92/9c/fd929cf759206d1ee6d2266fb3878016.jpg"},
// {image: "https://pbs.twimg.com/profile_images/446356636710363136/OYIaJ1KK.png"},
// {image: "https://i.pinimg.com/564x/03/b0/f3/03b0f3130779989bf6e6b27f3e354cd0.jpg"}]

export default function CrudAddProduct(props) {
  const [success, setSuccess] = useState(false);
  const [images, setImages] = useState([]);

  const [input, setInput] = useState({
    name: "",
    price: 0,
    description: "",
    stock: 0,
    image: "",
    categories: [],
  });

  const dispatch = useDispatch();

  //Subcripciones al store de redux
  const { categories } = useSelector((state) => state.categories);
  const { product } = useSelector((state) => state.products);

  const replaceChars = function (text) {
    var newText = text && text.split("_").join(" ");
    newText = newText && newText.charAt(0).toUpperCase() + newText.slice(1);
    return newText;
  };

  useEffect(() => {
    dispatch(getCategories());
    if (props.type === "Edit") {
      // if (product) {
      //   setInput({ ...product });
      // }
      var array = product.image;
      var newArray = [];
      if(array){
        newArray = array.split("ImageSeparator");
      }
      setInput({
        name: replaceChars(product.name),
        price: product.price,
        description: product.description,
        stock: product.stock,
        image: newArray,
        categories: [],
      });
      setImages(newArray)
    }
  }, [product]);

  const handleInputChange = function (e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    if (e.target.name === "price" || e.target.name === "stock") {
      setInput({ ...input, [e.target.name]: Number(e.target.value) });
    }
  };

  const onSubmitHandle = function (event) {
    event.preventDefault();
    let array = images;
    let newArray = array.join("ImageSeparator");
    const data = {
      name: input.name,
      price: input.price,
      description: input.description,
      stock: input.stock,
      image: newArray,
      idCategoria: input.categories,
    };
    //Para agregar dispatcheo action add
    if (props.type === "Add") {
      dispatch(addProduct(data));
      setSuccess(true);
    }
    //Para edit dispatcheo action edit
    if (props.type === "Edit") {
      dispatch(editProduct(product.id, data));
      setSuccess(true);
    }
  };

  //Funcion para convertir imagen a base64 obtenida de:
  //https://github.com/Rinlama/react-howtoseries
  const uploadImg = async (e) => {
    const files = e.target.files;
    var newImages = [];

    for(let i=0;i < files.length; i++){
      const base64 = await convertBase64(files[i]);
      newImages.push(base64);
    }
    setImages(newImages);
    // setInput({
    //   ...input,
    //   image: base64,
    // });
  };

  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };
  const onCategoryChange = function (e) {
    let newArray = input.categories;
    let newCategory = Number(e.target.id);
    if (newArray.includes(newCategory)) {
      newArray = input.categories.filter(
        (category) => category !== newCategory
      );
      return setInput({ ...input, categories: newArray });
    }
    setInput({
      ...input,
      categories: [...input.categories, newCategory],
    });
  };

  return (
    <form className={s.form} onSubmit={onSubmitHandle}>
      <div className={s.content}>
        <CloseBtn close={props.onClose} />

        <h3>
          {props.type === "Edit"
            ? "Actualizar un producto"
            : "Agregar un producto"}
        </h3>

        <div className={s.image}>
          <div className={s.slider}>

          {images.length > 0 && <ImgSlider images={images}/>}
          </div>
          <input type="file" name="imagen" onChange={(e) => {uploadImg(e);}} accept="image/*" multiple/>
        </div>
        <div className={s.inputs}>
          <fieldset>
            <legend>Nombre del producto</legend>
            <input
              value={product.name && input.name}
              className={s.input}
              onChange={handleInputChange}
              type="text"
              name="name"
              required
            />
          </fieldset>
          <fieldset>
            <legend>Descripcion</legend>
            <textarea
              value={input.description}
              className={s.input}
              onChange={handleInputChange}
              name="description"
              rows="5"
              placeholder="Describe el nuevo producto"
              required
            ></textarea>
          </fieldset>

          <div className={s.numbers}>
            <fieldset>
              <legend>Precio</legend>
              <input
                value={input.price}
                className={s.input}
                onChange={handleInputChange}
                type="number"
                name="price"
                min="0"
                step="any"
                required
              />
            </fieldset>
            <fieldset>
              <legend>Stock</legend>
              <input
                value={input.stock}
                className={s.input}
                onChange={handleInputChange}
                type="number"
                name="stock"
                min="0"
                step="1"
                required
              />
            </fieldset>
          </div>
          <fieldset>
            <legend>Categorias</legend>
            {categories.length > 0 ? (
              categories.map(function (category) {
                return (
                  <CategoryItem
                    key={category.id}
                    id={category.id}
                    name={category.name}
                    onCheck={onCategoryChange}
                  />
                );
              })
            ) : (
              <p>No hay ninguna categoria creada</p>
            )}
          </fieldset>
          {success && (
            <Alert severity="success">
              {props.type === "Edit"
                ? "Producto actualizado correctamente"
                : "Producto agregado correctamente"}
            </Alert>
          )}
          <SuccessBtn
            text={
              props.type === "Edit" ? "Actualizar producto" : "Agregar producto"
            }
          />
          <CancelBtn text="Cancelar" close={props.onClose} />
        </div>
      </div>
    </form>
  );
}
