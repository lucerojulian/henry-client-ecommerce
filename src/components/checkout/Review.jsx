import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

import { useSelector } from "react-redux";
import replaceChars from "../../helpers/replaceChars";

const products = [
  { name: "Product 1", desc: "A nice thing", price: "$9.99" },
  { name: "Product 2", desc: "Another thing", price: "$3.45" },
  { name: "Product 3", desc: "Something else", price: "$6.51" },
  { name: "Product 4", desc: "Best thing of all", price: "$14.11" },
  { name: "Shipping", desc: "", price: "Free" },
];
const addresses = [
  "1 Material-UI Drive",
  "Reactville",
  "Anytown",
  "99999",
  "USA",
];
const payments = [
  { name: "Card type", detail: "Visa" },
  { name: "Card holder", detail: "Mr John Smith" },
  { name: "Card number", detail: "xxxx-xxxx-xxxx-1234" },
  { name: "Expiry date", detail: "04/2024" },
];

const useStyles = makeStyles((theme) => ({
  listItem: {
    padding: theme.spacing(1, 0),
  },
  total: {
    fontWeight: 700,
  },
  title: {
    marginTop: theme.spacing(2),
  },
}));

export default function Review() {
  const [total, setTotal] = useState(0);

  const cart = useSelector((state) => state.cart);
  const user = useSelector((state) => state.authentication.user);

  const sumTotal = function () {
    let suma = 0;
    cart.products.forEach((prod) => {
      var stotal = prod.quantity * prod.price;
      suma += stotal;
    });
    setTotal(suma);
  };

  useEffect(() => {
    sumTotal();
  });

  console.log("Aca van a estar los nombres = " + cart.products.name);

  const classes = useStyles();

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Resumen de la orden:
      </Typography>
      <List disablePadding>
        {cart.products.map((product) => (
          <ListItem className={classes.listItem}>
            <ListItemText
              primary={replaceChars(product.name)}
              secondary={product.description}
            />
            <Typography variant="body2">{product.price}</Typography>
          </ListItem>
        ))}

        <ListItem className={classes.listItem}>
          <ListItemText primary="Total" />
          <Typography variant="subtitle1" className={classes.total}>
            {total.toFixed(2)}
          </Typography>
        </ListItem>
      </List>
    </React.Fragment>
  );
}
