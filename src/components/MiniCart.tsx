import React from "react";
import style from "../styles/MiniCart.module.css";
import CartProduct from "./CartProduct";

interface IProduct {
  title: string;
  brand: string;
  description: string;
  price: {
    current: string;
    previous: string;
    discountPercentage: string;
  };
  images: image[];
}

type image = {
  title: string;
  main: string;
  preview: string;
};

interface IItemInCart {
  title: string;
  brand: string;
  description: string;
  price: {
    current: string;
    previous: string;
    discountPercentage: string;
  };
  images: image[];
  amount: number;
}

interface MinicartProps {
  itemsInCart: IItemInCart[];
  setItemsInCart: React.Dispatch<React.SetStateAction<IItemInCart[]>>;
  cartIsOpen: boolean;
}

const MiniCart = ({
  itemsInCart,
  setItemsInCart,
  cartIsOpen,
}: MinicartProps) => {
  return (
    <div
      className={`${style["minicart"]} ${cartIsOpen ? style["open"] : null}`}
    >
      <div className={style["cart-header"]}>Cart</div>

      {itemsInCart.length === 0 ? (
        <p className={style["empty-cart-message"]}>Your Cart is Empty</p>
      ) : (
        <div className={style["minicart-container"]}>
          <div className={style["cart-products-wrapper"]}>
            {itemsInCart.map((product) => (
              <CartProduct
                product={product}
                setItemsInCart={setItemsInCart}
                itemsInCart={itemsInCart}
                key={itemsInCart.indexOf(product)}
              />
            ))}
          </div>

          {itemsInCart.length > 0 ? (
            <button className={style["checkout-button"]}>Checkout</button>
          ) : null}
        </div>
      )}
    </div>
  );
};

export default MiniCart;
