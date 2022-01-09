import React, { useState, useEffect } from "react";
import style from "../styles/ProductPage.module.css";
import ImageCarousel from "./ImageCarousel";
import Overlay from "./Lightbox";

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

interface ProductPageProps {
  productAmount: number;
  setProductAmount: React.Dispatch<React.SetStateAction<number>>;
  product: IProduct;
  itemsInCart: IItemInCart[];
  setItemsInCart: React.Dispatch<React.SetStateAction<IItemInCart[]>>;
  currentImage: image;
  setCurrentImage: React.Dispatch<React.SetStateAction<image>>;
}

const ProductPage = ({
  productAmount,
  setProductAmount,
  product,
  setItemsInCart,
  itemsInCart,
  currentImage,
  setCurrentImage,
}: ProductPageProps) => {
  const [lightboxActive, setLightboxActive] = useState<boolean>(false);

  useEffect(() => {
    setCurrentImage(product.images[0]);
  }, [product]);

  const decreaseAmount = () => {
    if (productAmount <= 0) {
      return;
    }
    setProductAmount(productAmount - 1);
  };

  const increaseAmount = () => {
    setProductAmount(productAmount + 1);
  };

  const addProductToCart = () => {
    const currentProduct = {
      ...product,
      amount: productAmount,
    };
    if (
      !itemsInCart.find((item) => currentProduct.title === item.title) &&
      productAmount !== 0
    ) {
      setItemsInCart([...itemsInCart, currentProduct]);
    }
  };

  return (
    <div className={style["product-page"]}>
      {lightboxActive ? (
        <Overlay
          product={product}
          currentImage={currentImage}
          setCurrentImage={setCurrentImage}
          lightboxActive={lightboxActive}
          setLightboxActive={setLightboxActive}
        />
      ) : null}

      <div className={style["product-page__wrapper"]}>
        <div className={style["product-page__images"]}>
          <ImageCarousel
            type="content"
            product={product}
            setCurrentImage={setCurrentImage}
            currentImage={currentImage}
            lightboxActive={lightboxActive}
            setLightboxActive={setLightboxActive}
          />
        </div>

        <div className={style["product-page__info"]}>
          <h3 className={style["brand-name"]}>{product.brand}</h3>
          <h1 className={style["product-name"]}>{product.title}</h1>
          <p className={style["product-description"]}>{product.description}</p>
          <div className={style["product-price"]}>
            <div className={style["current-price-wrapper"]}>
              <h2 className={style["current-price"]}>{`$${parseFloat(
                product.price.current
              ).toFixed(2)}`}</h2>
              <p
                className={style["discount-percent"]}
              >{`${product.price.discountPercentage}%`}</p>
            </div>
            <p className={style["previous-price"]}>{`$${parseFloat(
              product.price.previous
            ).toFixed(2)}`}</p>
          </div>
          <div className={style["purchase-options"]}>
            <div className={style["amount-input-wrapper"]}>
              <button
                className={`${style["amount-button"]} ${style["minus-button"]}`}
                onClick={decreaseAmount}
              >
                <img src="./icons/icon-minus.svg" alt="minus" />
              </button>
              <input
                className={style["amount-input"]}
                type="number"
                value={productAmount}
                readOnly
              />
              <button
                className={`${style["amount-button"]} ${style["plus-button"]}`}
                onClick={increaseAmount}
              >
                <img src="./icons/icon-plus.svg" alt="plus" />
              </button>
            </div>
            <button
              onClick={addProductToCart}
              className={style["purchase-button"]}
            >
              <img
                className={style["purchase-button__cart-icon"]}
                src="./icons/icon-cart.svg"
                alt="cart icon"
              />
              Add to cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
