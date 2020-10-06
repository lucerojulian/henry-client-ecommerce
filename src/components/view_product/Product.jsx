import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Box, Button } from "@material-ui/core";
import Rating from "@material-ui/lab/Rating";
import s from "./Product.module.css";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import defaultImg from "../../img/default.jpg";
import ReviewCard from "../reviews/ReviewCard";
import Review from "../view_review/Review.jsx";
import RateReviewOutlinedIcon from "@material-ui/icons/RateReviewOutlined";
import ImgSlider from "../images_slider/ImgSlider.jsx";
import Alert from "@material-ui/lab/Alert";
//Helper
import replaceChars from "../../helpers/replaceChars";
import formatDate from "../../helpers/formatDate";

//Importamos de redux para poder conectar al estado y poder dispatchear actions
import { useSelector, useDispatch } from "react-redux";
//importamos la funcion a dispatchear
import { getProduct } from "../../actions/products.js";
import { addToCart } from "../../actions/cart";

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
}));

export default function Product({ id }) {
  const [renderUpdate, setRenderUpdate] = useState(false);
  const [images, setImages] = useState([]);
  const user = useSelector((state) => state.authentication.user);

  const classes = useStyles();
  const dispatch = useDispatch();
  const message = useSelector((state) => state.cart.message);
  const { product } = useSelector((state) => state.products);
  const cart = useSelector((state) => state.cart.products);
  const [promedio, setPromedio] = useState();

  useEffect(() => {
    dispatch(getProduct(id));
  }, [getProduct]);

  useEffect(() => {
    var array = product.image;
    var newArray = [];
    if (array) {
      newArray = array.split("ImageSeparator");
    }
    setImages(newArray);
  }, [product]);

  useEffect(() => {
    localStorage.setItem("Cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/products/${id}/reviews`, {
        withCredentials: true,
      })
      .then((res) => {
        if (res.data) {
          setPromedio(res.data);
        }
      });
  }, []);

  const addToCarrito = function () {
    if (user) {
      dispatch(addToCart(product, user.id));
      return;
    }
    dispatch(addToCart(product));
  };

  return (
    <Container
      display="flex"
      flexDirection="column"
      justifyContent="center"
      m={5}
    >
      {renderUpdate && (
        <Review
          onClose={setRenderUpdate}
          userId={user.id}
          productId={product.id}
        />
      )}
      <Box display="flex" justifyContent="center">
        <Box className={s.img}>
          {images.length > 0 && <ImgSlider images={images} />}
        </Box>
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="space-around"
        >
          <h2 className={s.title}>
            {" "}
            {product.name && replaceChars(product.name)}{" "}
          </h2>
          <p className={s.e}> Descripción: {product.description} </p>
          <h5> Stock: {product.stock}</h5>
          <h3 className={s.num}> ${product.price} </h3>
          <Rating
            className={s.rating}
            name="half-rating-read"
            defaultValue={4.3}
            precision={0.1}
            readOnly
            size="large"
            value={promedio && promedio >= 1 ? promedio : 4.3}
          />
          <Box className={s.daropinion}>
            {user && (
              <Button
                onClick={setRenderUpdate}
                variant="contained"
                color="default"
                className={classes.button}
                endIcon={<RateReviewOutlinedIcon />}
              >
                Dar opinion:
              </Button>
            )}
          </Box>
          <Box>
            {/* <Button variant="contained" color="secondary">
              Comprar ya
            </Button>
            <span> </span> */}
            {message && (
              <Alert className={s.alert} severity="warning">
                El Producto ya se encuentra en el carrito
              </Alert>
            )}
            <Button variant="contained" color="primary" onClick={addToCarrito}>
              Añadir al Carrito
            </Button>
          </Box>
        </Box>
      </Box>

      <Box m={5} display="flex" flexDirection="column" alignItems="strech">
        <Typography className={s.Palabrareview} variant="h4">
          {" "}
          Opiniones{" "}
        </Typography>
        {product.reviews && product.reviews.length > 0 ? (
          product.reviews.map((review) => {
            return (
              <ReviewCard
                key={review.id}
                title={review.title}
                stars={review.stars}
                description={review.description}
                user={user && user.name}
                date={formatDate(review.updatedAt)}
              />
            );
          })
        ) : (
          <Typography variant="h6" color="error">
            {" "}
            Este producto no posee reviews aun{" "}
          </Typography>
        )}
      </Box>
    </Container>
  );
}
