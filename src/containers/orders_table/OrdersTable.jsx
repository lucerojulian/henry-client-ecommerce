import React, { useState, useEffect } from "react";
import s from "./OrdersTable.module.css";
import ViewOrder from "../../components/view_order/ViewOrder.jsx";
import { useSelector, useDispatch } from "react-redux";
import { fetchOrders, getOrder } from "../../actions/orders";

import formatDate from "../../helpers/formatDate";

export default function OrdersTable() {
  const { orders } = useSelector((state) => state.order);

  const [renderViewOrder, setRenderViewOrder] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchOrders());
  }, []);

  const detailOrder = (id) => {
    dispatch(getOrder(id));
    setRenderViewOrder(true);
  };

  const handleChange = (e) => {
    if (e.target.value !== "all") {
      dispatch(fetchOrders(e.target.value));
    } else {
      dispatch(fetchOrders());
    }
  };

  return (
    <div className={s.container}>
      {renderViewOrder && <ViewOrder onClose={setRenderViewOrder} />}
      <table className={s.orders}>
        <caption>Gestion de ordenes</caption>
        <thead>
          <tr>
            <th>Id</th>
            <th>Id del usuario</th>
            <th>
              <label htmlFor="state">Filtro por Estado </label>
                  <select
                    required
                    onChange={handleChange}
                    name="state"
                    id="state"
                  >
                    <option value="all">Todas</option>
                    <option value="cart">Carrito</option>
                    <option value="create">Creada</option>
                    <option value="process">Procesando</option>
                    <option value="canceled">Cancelada</option>
                    <option value="completed">Completada</option>
                  </select>
            </th>
            <th>Fecha de creacion</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {orders && orders.message ? (
            <tr>
              <td></td>
              <td></td>
              <td>{orders.message}</td>
              <td></td>
              <td></td>
            </tr>
          ) : (
            orders.map((order) => {
              return (
                <tr key={order.id}>
                  <td>{order.id}</td>
                  <td>{order.user.id}</td>
                  <td>
                    <p className={order.state === "cart" ? s.cart : s.normal}>
                      {order.state}
                    </p>
                  </td>
                  <td>{formatDate(order.createdAt)}</td>
                  <td>
                    <input
                      id={order.id}
                      onClick={() => detailOrder(order.id)}
                      type="button"
                      value="Ver orden"
                    />
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
}
