import React, { useEffect, useState } from "react";
import s from "./AdminPage.module.css";
import Crud from "../crud/Crud.jsx";
import OrdersTable from "../orders_table/OrdersTable.jsx";
import Categories from "../category_crud/CategoryAdmin.jsx";
import UsersPanel from "../users_panel/UsersPanel.jsx";

//material ui
import ReceiptIcon from "@material-ui/icons/Receipt";
import StoreIcon from "@material-ui/icons/Store";
import ListAltIcon from "@material-ui/icons/ListAlt";
import SupervisorAccountIcon from "@material-ui/icons/SupervisorAccount";

export default function AdminPage() {
  const [component, setComponent] = useState();
  useEffect(() => {
    let temp = <h3>Bienvenido al panel de administracion</h3>;
    setComponent(temp);
  }, []);

  const renderComponent = function (e) {
    var element;
    switch (e.target.id) {
      case "manage_orders":
        element = <OrdersTable />;
        break;
      case "manage_products":
        element = <Crud />;
        break;
      case "manage_categories":
        element = <Categories />;
        break;
      case "manage_users":
        element = <UsersPanel />;
        break;
      default:
        element = <h2>Bienvenido a el panel de administracion</h2>;
        break;
    }
    setComponent(element);
  };

  return (
    <div className={s.admin}>
      <div className={s.aside}>
        <h3>Menu</h3>
        <input
          type="radio"
          onChange={(e) => renderComponent(e)}
          id="manage_orders"
          name="menu"
          value="orders"
        />
        <label htmlFor="manage_orders">
          <ReceiptIcon className={s.icon} />
          Administrar ordenes
        </label>
        <input
          type="radio"
          onChange={(e) => renderComponent(e)}
          id="manage_products"
          name="menu"
          value="products"
        />
        <label htmlFor="manage_products">
          <StoreIcon className={s.icon} />
          Administrar productos
        </label>
        <input
          type="radio"
          onChange={(e) => renderComponent(e)}
          id="manage_categories"
          name="menu"
          value="categories"
        />
        <label htmlFor="manage_categories">
          <ListAltIcon className={s.icon} />
          Administrar categorias
        </label>
        <input
          type="radio"
          onChange={(e) => renderComponent(e)}
          id="manage_users"
          name="menu"
          value="users"
        />
        <label htmlFor="manage_users">
          <SupervisorAccountIcon className={s.icon} />
          Administrar usuarios
        </label>
      </div>
      <div className={s.main}>{component && component}</div>
    </div>
  );
}
