import React, { Suspense } from "react";
import MainLayout from "./layouts/MainLayout";
import { Routes, Route } from "react-router-dom";
import "./scss/app.scss";

const Home = React.lazy(() => import(/* webpackChunkName: "Home" */ './pages/Home'))
const Cart = React.lazy(() => import(/* webpackChunkName: "Cart" */ './pages/Cart'))
const FullPizza = React.lazy(() => import(/* webpackChunkName: "FullPizza" */'./pages/FullPizza'))
const NotFound = React.lazy(() => import(/* webpackChunkName: "NotFound" */'./pages/NotFound'))

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="" element={<Suspense>   <Home /> </Suspense>} />
        <Route path="cart" element={<Suspense fallback={<div>Идёт загрузка...</div>}>   <Cart /> </Suspense>} />
        <Route path="pizza/:id" element={<Suspense fallback={<div>Идёт загрузка...</div>}> <FullPizza /> </Suspense>} />
        <Route path="*" element={<Suspense fallback={<div>Идёт загрузка...</div>}> <NotFound /> </Suspense>} />
      </Route>
    </Routes>
  );
}

export default App;
