import { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { LinearProgress } from "@mui/material";

import LayOut from "./components/layout/LayOut";
import HomePage from "./pages/HomePage";
import ProductsPage from "./pages/ProductsPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import NotFoundPage from "./pages/NotFoundPage";
import ErrorBoundary from "./components/ErrorBoundary";
import WishListPage from "./pages/WishListPage";
import UserRegister from "./components/user/UserRegister";
import UserLogin from "./components/user/UserLogin";
import UserProfile from "./components/user/UserProfile";
import ProtectedRoute from "./components/user/ProtectedRoute";
import DashBoard from "./components/dashboard/DashBoard";
import ProductDashBoard from "./components/dashboard/ProductDashBoard";
import CategoryDashBoard from "./components/dashboard/CategoryDashBoard";
import UserDashBoard from "./components/dashboard/UserDashBoard";
import CartPage from "./pages/CartPage";
import UserOrderHistory from "./components/order/UserOrderHistory";
import CouponsDashBoard from "./components/dashboard/CouponsDashBoard";
import OrderDashBoard from "./components/dashboard/OrderDashBoard";

function App() {
  const [userInput, setUserInput] = useState("");
  const [wishList, setWishList] = useState(() => {
    const savedWishList = localStorage.getItem("wishlist");
    return savedWishList ? JSON.parse(savedWishList) : [];
  });

  const [cartList, setCartList] = useState(() => {
    const savedCartList = localStorage.getItem("cartlist");
    return savedCartList ? JSON.parse(savedCartList) : [];
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000);

  console.log(minPrice, maxPrice, "price");
  const handleChange = (event, value) => {
    setPage(value);
  };

  const [productResponse, setProductResponse] = useState({
    products: [],
    totalCount: 0,
  });

  let limit = 3;
  let offset = (page - 1) * limit;

  let productUrl = `http://localhost:5125/api/v1/products?limit=${limit}&offset=${offset}&search=${userInput}&minprice=${minPrice}&maxprice=${maxPrice}`;

  function getProduct() {
    axios
      .get(productUrl)
      .then((response) => {
        console.log(response);
        setProductResponse(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }

  useEffect(() => {
    getProduct();
  }, [limit, offset, userInput, minPrice, maxPrice]);

  const [userData, setUserData] = useState(null);
  const [isUserDataLoading, setIsUserDataLoading] = useState(true);

  function getUserData() {
    setIsUserDataLoading(true);
    const token = localStorage.getItem("token");

    axios
      .get("http://localhost:5125/api/v1/user/auth", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setUserData(res.data);
        setIsUserDataLoading(false);
      })
      .catch((err) => {
        setIsUserDataLoading(false);
        console.log(err);
      });
  }

  useEffect(() => {
    getUserData();
  }, []);

  console.log(userData, "from App");

  let isAuthenticated = userData ? true : false;

  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishList));
  }, [wishList]);

  useEffect(() => {
    localStorage.setItem("cartlist", JSON.stringify(cartList));
  }, [cartList]);

  if (loading) {
    return (
      <div>
        <LinearProgress />
      </div>
    );
  }

  if (error) {
    return <NotFoundPage message={error} />;
  }

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <LayOut
          wishList={wishList}
          isAuthenticated={isAuthenticated}
          userData={userData}
          cartList={cartList}
        />
      ),
      children: [
        { path: "/", element: <HomePage /> },
        {
          path: "products",
          element: (
            <ProductsPage
              productList={productResponse.products}
              setUserInput={setUserInput}
              userInput={userInput}
              wishList={wishList}
              setWishList={setWishList}
              totalCount={productResponse.totalCount}
              page={page}
              handleChange={handleChange}
              setMinPrice={setMinPrice}
              setMaxPrice={setMaxPrice}
              cartList={cartList}
              setCartList={setCartList}
            />
          ),
        },
        {
          path: "products/:productId",
          element: <ProductDetailPage />,
        },
        {
          path: "/wishList",
          element: (
            <WishListPage wishList={wishList} setWishList={setWishList} />
          ),
        },

        { path: "*", element: <NotFoundPage message="Page not found" /> },
        { path: "/signup", element: <UserRegister /> },
        { path: "/signin", element: <UserLogin getUserData={getUserData} /> },
        {
          path: "/cart",
          element: (
            <CartPage
              cartList={cartList}
              setCartList={setCartList}
              userData={userData}
            />
          ),
        },
        {
          path: "/profile",
          element: (
            <ProtectedRoute
              isUserDataLoading={isUserDataLoading}
              isAuthenticated={isAuthenticated}
              element={
                <UserProfile userData={userData} setUserData={setUserData} />
              }
            />
          ),
        },
        { path: "/orders", element: <UserOrderHistory userData={userData} /> },
        {
          path: "/dashboard",
          element: (
            <ProtectedRoute
              isUserDataLoading={isUserDataLoading}
              isAuthenticated={isAuthenticated}
              shouldCheckAdmin={true}
              userData={userData}
              element={<DashBoard />}
            />
          ),
        },
        {
          path: "/product-dashboard",
          element: (
            <ProtectedRoute
              isUserDataLoading={isUserDataLoading}
              isAuthenticated={isAuthenticated}
              shouldCheckAdmin={true}
              userData={userData}
              element={<ProductDashBoard />}
            />
          ),
        },
        {
          path: "/category-dashboard",
          element: (
            <ProtectedRoute
              isUserDataLoading={isUserDataLoading}
              isAuthenticated={isAuthenticated}
              shouldCheckAdmin={true}
              userData={userData}
              element={<CategoryDashBoard />}
            />
          ),
        },
        {
          path: "/user-dashboard",
          element: (
            <ProtectedRoute
              isUserDataLoading={isUserDataLoading}
              isAuthenticated={isAuthenticated}
              shouldCheckAdmin={true}
              userData={userData}
              element={<UserDashBoard />}
            />
          ),
        },
        {
          path: "/Coupon-dashboard",
          element: (
            <ProtectedRoute
              isUserDataLoading={isUserDataLoading}
              isAuthenticated={isAuthenticated}
              shouldCheckAdmin={true}
              userData={userData}
              element={<CouponsDashBoard />}
            />
          ),
        },
        {
          path: "/order-dashboard",
          element: (
            <ProtectedRoute
              isUserDataLoading={isUserDataLoading}
              isAuthenticated={isAuthenticated}
              shouldCheckAdmin={true}
              userData={userData}
              element={<OrderDashBoard userData={userData} />}
            />
          ),
        },
      ],
    },
  ]);

  return (
    <div className="App">
      <ErrorBoundary>
        <RouterProvider router={router} />
      </ErrorBoundary>
    </div>
  );
}

export default App;
