import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Details } from "../home/details/Details";
import Login from "./../home/login/Login";
import Index from "../admin/pages/IndexAdmin";
import HomePage from "./Home";
import CategoryAdmin from "./../admin/pages/CategoryAdmin";
import CategoryDetail from "./CategoryDetails";
import ProductAdmin from "../admin/pages/ProductAdmin";
import BannerAdmin from "../admin/pages/BannerAdmin";
import AccountsAdmin from "../admin/pages/AccountsAdmin";
import ProductDetails from "./ProductDetails";
import Cart from "./Cart";
import Pay from "./Pay";
import Order from "./Order";
import OrderDetails from "../home/OrderDetails/OrderDetails";
import OrderAdmin from "./../admin/pages/OrderAdmin";
import OrderDetailAdmin from "../admin/pages/OrderDetailsAdmin";
import ShipDashboard from "./../shipment/page/ShipDashboard";
import ShipmentDetails from "./../admin/Components/ShipmentDetail";
import Shipping from "./../shipment/page/Shipping";
import Shiped from "../shipment/page/Shiped";
import Statistical from "./../admin/pages/Statistical";
import Search from "./Search";
import DowLoad from "../EXpdf/DowLoad";
// import Search from "./search";
export const Pages = ({ cartItems }) => {
  return (
    <>
      <Router>
        <Switch>
          <Route exact path="/">
            <HomePage cartItems={cartItems} />
          </Route>
          <Route path="/cart/:id">
            <Details />
          </Route>
          <Route path="/productdetails/:id">
            <ProductDetails />
          </Route>
          <Route path="/admin">
            <Index />
          </Route>
          <Route path="/admin-category">
            <CategoryAdmin />
          </Route>
          <Route path="/admin-product">
            <ProductAdmin />
          </Route>
          <Route path="/admin-banner">
            <BannerAdmin />
          </Route>
          <Route path="/admin-order">
            <OrderAdmin />
          </Route>
          <Route path="/admin-accounts">
            <AccountsAdmin />
          </Route>
          <Route path="/admin-statis">
            <Statistical />
          </Route>
          <Route path="/admin-order-detail/:id">
            <OrderDetailAdmin />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/cart">
            <Cart />
          </Route>
          <Route path="/pay">
            <Pay />
          </Route>
          <Route path="/order">
            <Order />
          </Route>
          <Route path="/my-order">
            <Order />
          </Route>
          <Route path="/OrderDetails/:id">
            <OrderDetails />
          </Route>
          <Route path="/shipment">
            <ShipDashboard />
          </Route>
          <Route path="/shipping">
            <Shipping />
          </Route>
          <Route path="/search">
            <Search />
          </Route>
          <Route path="/shiped">
            <Shiped />
          </Route>
          <Route path="/dowload">
            <DowLoad />
          </Route>
          <Route path="/shipment-details/:id">
            <ShipmentDetails />
          </Route>
          <Route path="/:id">
            <CategoryDetail />
          </Route>
        </Switch>
      </Router>
    </>
  );
};
