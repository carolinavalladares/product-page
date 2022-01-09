import React from "react";
import style from "../styles/CartProduct.module.css";

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

interface CartProductProps {
  product: IItemInCart;
  setItemsInCart: React.Dispatch<React.SetStateAction<IItemInCart[]>>;
  itemsInCart: IItemInCart[];
}

const CartProduct = ({
  product,
  setItemsInCart,
  itemsInCart,
}: CartProductProps) => {
  const productPrice = parseFloat(product.price.current).toFixed(2);
  const productPriceTotal = (
    parseFloat(product.price.current) * product.amount
  ).toFixed(2);

  const deleteProduct = () => {
    setItemsInCart(itemsInCart.filter((item) => product.title !== item.title));
  };

  return (
    <div className={style["cart-product"]}>
      <img
        className={style["cart-product-image"]}
        src={product.images[0].preview}
        alt="product image"
      />

      <div className={style["cart-product-info-wrapper"]}>
        <div className={style["cart-product-info"]}>
          <p className={style["cart-product-name"]}>{product.title}</p>

          <div className={style["cart-product-price-info"]}>
            <span
              className={style["cart-product-price"]}
            >{`$${productPrice} X ${product.amount}`}</span>
            <span
              className={style["product-total"]}
            >{`$${productPriceTotal}`}</span>
          </div>
        </div>

        <button
          onClick={deleteProduct}
          className={style["cart-product-delete-button"]}
          title="delete product from cart"
        >
          <img src="./icons/icon-delete.svg" alt="bin icon" />
        </button>
      </div>
    </div>
  );
};

export default CartProduct;
