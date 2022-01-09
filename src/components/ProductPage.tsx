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
}

const ProductPage = ({
  productAmount,
  setProductAmount,
  product,
  setItemsInCart,
  itemsInCart,
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

  const prevImage = () => {
    let prevImage: image;
    const currentImageIndex = product.images.indexOf(currentImage);
    const lastImage = product.images[product.images.length - 1];
    if (currentImageIndex === 0) {
      prevImage = lastImage;
    } else {
      prevImage = product.images[currentImageIndex - 1];
    }

    setCurrentImage(prevImage);
  };

  const nextImage = () => {
    let nextImage: image;
    const currentImageIndex = product.images.indexOf(currentImage);
    const firstImage = product.images[0];
    if (currentImageIndex === product.images.length - 1) {
      nextImage = firstImage;
    } else {
      nextImage = product.images[currentImageIndex + 1];
    }

    setCurrentImage(nextImage);
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
      <div className={style["product-page__wrapper"]}>
        <div className={style["product-page__images"]}>
          <button
            onClick={prevImage}
            className={`${style["images-button"]} ${style["prev-button"]}`}
          >
            <img src="./icons/icon-previous.svg" alt="previous" />
          </button>

          <img
            className={style["product-image"]}
            src={currentImage.main}
            alt=""
          />

          <button
            onClick={nextImage}
            className={`${style["images-button"]} ${style["next-button"]}`}
          >
            <img src="./icons/icon-next.svg" alt="next" />
          </button>

          <ul className={style["image-preview-list"]}>
            {product.images.map((image) => (
              <li
                className={`${image === currentImage ? style["active"] : ""} ${
                  style["image-preview-list-item"]
                }`}
                key={product.images.indexOf(image)}
                onClick={() => {
                  setImage(image);
                }}
              >
                <img
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
