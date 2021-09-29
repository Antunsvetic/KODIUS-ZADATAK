import { useState } from "react";
import Header from "./components/Layout/Header";
import Items from "./components/Items/Items";
import Cart from "./components/Cart/Cart";
import CartProvider from "./store/CartProvider";
import Receipt from "./components/Layout/Receipt";

function App(props) {
  const [cartIsShown, setCartIsShown] = useState(false);

  function cartOpenHandler() {
    setCartIsShown(true);
  }

  function cartCloseHandler() {
    setCartIsShown(false);
  }

  return (
    <CartProvider>
      {cartIsShown && <Cart onClose={cartCloseHandler} />}
      <Header onOpenCart={cartOpenHandler} />
      <main>
        <Items />
        <Receipt />
      </main>
    </CartProvider>
  );
}

export default App;
