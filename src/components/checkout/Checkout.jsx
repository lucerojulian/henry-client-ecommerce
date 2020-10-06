import s from "./Checkoutcss.module.css";
import { useHistory } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Paper from "@material-ui/core/Paper";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import AddressForm from "./AddressForm.jsx";
import PaymentForm from "./PaymentForm";
import Review from "./Review";
import axios from "axios";

import { useSelector, useDispatch } from "react-redux";

import { editOrder } from "../../actions/orders";
import { emptyCart } from "../../actions/cart";
import Axios from "axios";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        Vivero Online
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: "relative",
  },
  layout: {
    width: "auto",
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: "auto",
      marginRight: "auto",
    },
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
  stepper: {
    padding: theme.spacing(3, 0, 5),
  },
  buttons: {
    display: "flex",
    justifyContent: "flex-end",
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
}));

const steps = ["Direccion de envio", "Metodo de pago", "Su orden"];

function getStepContent(step, changeInput) {
  switch (step) {
    case 0:
      return <AddressForm onChange={changeInput} />;
    case 1:
      return <PaymentForm onChange={changeInput} />;
    case 2:
      return <Review />;
    default:
      throw new Error("Unknown step");
  }
}

export default function Checkout(props) {
  const [inputs, setInputs] = useState({});

  const cart = useSelector((state) => state.cart);

  const user = useSelector((state) => state.authentication.user);

  const dispatch = useDispatch();

  const classes = useStyles();
  let history = useHistory();
  const onSubmitHistory = function (e) {
    e.preventDefault();
    history.push(`/carrito`);
  };

  const [activeStep, setActiveStep] = React.useState(0);

  const handleInputChange = (e) => {
    e.preventDefault();

    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  };

  const handleNext = () => {
    // Si esta logeado que siga con este:

    // Sino, redigirlo al login y que despues se guarde con la funcion de albert
    const data = {
      address: inputs.address,
      state: "process",
    };

    if (activeStep === steps.length - 1) {
      dispatch(editOrder(data, cart.orderId));
      updateStock(cart.products);
      dispatch(emptyCart());
      console.log(editOrder);
      console.log("Estoy haciendo el put");
    }

    setActiveStep(activeStep + 1);
  };

  //actualizo el stock producto segun la compra
  const updateStock = (products) => {
    products.forEach((product) => {
      let stock = product.stock - product.quantity;
      axios.put(`http://localhost:3000/products/${product.id}/stock`, {
        stock,
      });
    });
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  return (
    <React.Fragment>
      <AppBar
        position="absolute"
        color="default"
        className={classes.appBar}
      ></AppBar>
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Stepper activeStep={activeStep} className={classes.stepper}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>

          <React.Fragment>
            {activeStep === steps.length ? (
              <React.Fragment>
                <Typography variant="h5" gutterBottom>
                  Gracias por su orden.
                </Typography>
                <Typography variant="subtitle1">
                  Tu numero de orden es #2001539. Te hemos enviado un mail con
                  la confirnacion de la orden, otro email sera enviado cuando la
                  orden se envie hacia tu direccion.
                </Typography>
              </React.Fragment>
            ) : (
              <React.Fragment>
                {getStepContent(activeStep, handleInputChange)}
                <div className={classes.buttons}>
                  {activeStep !== 0 && (
                    <Button onClick={handleBack} className={classes.button}>
                      Back
                    </Button>
                  )}
                  <Link to="/carrito">
                    <Button
                      variant="contained"
                      className={classes.button + " " + s.boton}
                      onClick={onSubmitHistory}
                    >
                      SALIR
                    </Button>
                  </Link>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleNext}
                    className={classes.button}
                  >
                    {activeStep === steps.length - 1
                      ? "Realizar pedido"
                      : "Next"}
                  </Button>
                </div>
              </React.Fragment>
            )}
          </React.Fragment>
        </Paper>
      </main>
    </React.Fragment>
  );
}
