import React, { useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

//Componentes
import Navbar from "./containers/navbar/Navbar.jsx";
import Product from "./components/view_product/Product.jsx";
import Catalogue from "./containers/catalogue/Catalogue.jsx";
import AdminPage from "./containers/admin_page/AdminPage.jsx";
import Footer from "./components/footer/Footer.jsx";
import TrolleyTable from "./components/trolley_table/TrolleyTable";
import Checkout from "./components/checkout/Checkout.jsx";
import { PrivateRoute } from "./components/privateRouter/PrivateRoute";
// import Profile from "./components/Profile/ProfileCard";
import Me from './components/me/Me.jsx';
import { LoginPage } from "./components/login/LoginPage";
import { RegisterPage } from "./components/login/RegisterPage";
import { HomePage } from "./containers/home/HomePage.jsx";

function App() {
  const [renderAddUser, setRenderAddUser] = useState(false);

  return (
    <Router>
      <Switch>
        <div className="App">
          <Route
            path="/"
            render={() => <Navbar botonNav={setRenderAddUser} />}
          />
          <Route exact path="/home" component={HomePage} />
          <Route exact path="/catalogo" component={Catalogue} />
          <PrivateRoute exact path="/admin" component={AdminPage} />
          <Route exact path="/carrito" component={TrolleyTable} />
          <Route
            exact
            path="/product/:id"
            render={({ match }) => <Product id={match.params.id} />}
          />
          <Route exact path="/me" component={Me} />
          <Route exact path="/register" component={RegisterPage} />
          <Route exact path="/loginpage" component={LoginPage} />
          <Route exact path="/checkout" component={Checkout} />
          <Route path="/" component={Footer} />
          
        </div>
      </Switch>
    </Router>
  );
}

export default App;
