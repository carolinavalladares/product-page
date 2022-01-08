import React, { useState, useEffect } from "react";
import style from "../styles/ProductPage.module.css";

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

interface ProductPageProps {
  productAmount: number;
  setProductAmount: React.Dispatch<React.SetStateAction<number>>;
  product: IProduct;
}

const ProductPage = ({
  productAmount,
  setProductAmount,
  product,
}: ProductPageProps) => {
  const [currentImage, setCurrentImage] = useState<image>({
    title: "",
    main: "",
    preview: "",
  });

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

  const setImage = (image: image) => {
    setCurrentImage(image);
  };

  return (
    <div className={style["product-page"]}>
      <div className={style["product-page__wrapper"]}>
        <div className={"product-page__images"}>
          <img
            className={style["product-image"]}
            src={currentImage.main}
            alt=""
          />

          <ul className={style["image-preview-list"]}>
            {product.images.map((image) => (
              <li
                className={`${image === currentImage ? style["active"] : ""} ${
                  style["image-preview-list-item"]
                }`}
              >
                <img
                  onClick={() => {
                    setImage(image);
                  }}
                  className={`${style["image-preview"]} `}
                  src={image.preview}
                  alt="product-thumbnail"
                />
                {image === currentImage ? (
                  <div className={style["image-preview-overlay"]}></div>
                ) : (
                  ""
                )}
              </li>
            ))}
          </ul>
        </div>

        <div className={style["product-page__info"]}>
          <h3 className={style["brand-name"]}>{product.brand}</h3>
          <h1 className={style["product-name"]}>{product.title}</h1>
          <p className={style["product-description"]}>{product.description}</p>
          <div className={style["product-price"]}>
            <div className={style["current-price-wrapper"]}>
              <h2
                className={style["current-price"]}
              >{`$${product.price.current}.00`}</h2>
              <p
                className={style["discount-percent"]}
              >{`${product.price.discountPercentage}%`}</p>
            </div>
            <p
              className={style["previous-price"]}
            >{`$${product.price.previous}.00`}</p>
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
              />
              <button
                className={`${style["amount-button"]} ${style["plus-button"]}`}
                onClick={increaseAmount}
              >
                <img src="./icons/icon-plus.svg" alt="plus" />
              </button>
            </div>
            <button className={style["purchase-button"]}>
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