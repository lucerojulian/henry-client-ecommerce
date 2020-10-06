import React,{useEffect,useState} from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
//Material
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';

//CSS
import s from './Me.module.css';

import avatar from '../../img/avatar.png';


const useRowStyles = makeStyles({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
  thead:{
    width: "150px",
  },
  showItems: {
    width: "40px",
  },
  total: {
    fontWeight: "bold",
  }
});
function createData(name, calories, fat, carbs, protein, price) {
  return {
    name,
    calories,
    fat,
    carbs,
    protein,
    price,
    history: [
      { date: '2020-01-05', customerId: '11091700', amount: 3 },
      { date: '2020-01-02', customerId: 'Anonymous', amount: 1 },
    ],
  };
}

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  const classes = useRowStyles();
  const [orderProducts, setOrderProducts] = useState();
  useEffect(() =>{
    if(!orderProducts){axios.get(`http://localhost:3000/orders/${row.id}`).then((res) => {
      console.log(res.data)
      setOrderProducts(res.data.products)
  })}
  },[orderProducts])

  const sumTotal = function () {
    let total = 0;
    if (orderProducts) {
      orderProducts.forEach((product) => {
        console.log(product)
        total += product.productsorder.quantity * parseFloat(product.price);
      });
    }
    console.log(total)
    return "$ " + total;
  };
  return (
    <React.Fragment>
      <TableRow className={classes.root}>
        <TableCell className={classes.showItems} align="center">
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            Ver{open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell >
        <TableCell className={classes.thead} align="center">{row.state}</TableCell>
        <TableCell className={classes.thead} align="center">{row.address}</TableCell>
        <TableCell className={classes.thead} align="center">{row.updatedAt}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom component="div">
                {"Compra"}
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Nombre</TableCell>
                    <TableCell>Precio x unidad</TableCell>
                    <TableCell align="right">Cantidad</TableCell>
                    <TableCell align="right">Sub Total ($)</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {orderProducts && orderProducts.map((product) => (
                    <TableRow key={product.id}>
                      <TableCell component="th" scope="row">
                        <Link to={`/product/${product.id}`}>
                          {product.name}
                        </Link>
                      </TableCell>
                      <TableCell>{product.productsorder.price}</TableCell>
                      <TableCell align="right">{product.productsorder.quantity}</TableCell>
                      <TableCell align="right">
                        {Math.round(product.productsorder.price*product.productsorder.quantity)}
                      </TableCell>
                    </TableRow>
                  ))}
                  <TableRow>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell className={classes.total} align="right">
                    {"Total: "+sumTotal()}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

Row.propTypes = {
  row: PropTypes.shape({
    calories: PropTypes.number.isRequired,
    carbs: PropTypes.number.isRequired,
    fat: PropTypes.number.isRequired,
    history: PropTypes.arrayOf(
      PropTypes.shape({
        amount: PropTypes.number.isRequired,
        customerId: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
      }),
    ).isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    protein: PropTypes.number.isRequired,
  }).isRequired,
};

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0, 3.99),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3, 4.99),
  createData('Eclair', 262, 16.0, 24, 6.0, 3.79),
  createData('Cupcake', 305, 3.7, 67, 4.3, 2.5),
  createData('Gingerbread', 356, 16.0, 49, 3.9, 1.5),
];

function CollapsibleTable({id, orders}) {

  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell align="right" />
            <TableCell align="center">Estado</TableCell>
            <TableCell align="center">Dirección</TableCell>
            <TableCell align="center">Ultima actualizacion</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders && orders.map((order) => (
            <Row key={order.id} row={order} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default function Me(){
  const [user,setUser] = useState();
  const [orders,setOrders] = useState();
  useEffect(() => {
    axios.get(`http://localhost:3000/me`, { withCredentials: true })
      .then((res) => {
        setUser(res.data);
      });
  },[]);
  useEffect(() => {
    if(!orders){
      if(user){axios.get(`http://localhost:3000/users/${user.id}/orders`).then((res) => {
        console.log(res.data)
        setOrders(res.data[0].orders)
    })}
  }
  },[user])

  return (<div className={s.me}>
    <div className={s.userInfo}>
    <h2>Mi cuenta</h2>
      <img src={avatar}/>
      <div className={s.data}>
        <h3>{user && user.name+" "+user.lastname}</h3>
        <p>{user && user.email}</p>
        <button>Cambiar contraseña</button>
      </div>
    </div>
    <div className={s.userOrders}>
      <h4>Historial de compras</h4>
      <CollapsibleTable id={user && user.id} orders={orders && orders}/>
    </div>
  </div>)
}
