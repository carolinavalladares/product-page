import React from "react";
import ImageCarousel from "./ImageCarousel";

import style from "../styles/Lightbox.module.css";

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

interface IProps {
  currentImage: image;
  setCurrentImage: React.Dispatch<React.SetStateAction<image>>;
  product: IProduct;
  lightboxActive: boolean;
  setLightboxActive: React.Dispatch<React.SetStateAction<boolean>>;
}

const Lightbox = ({
  currentImage,
  setCurrentImage,
  product,
  lightboxActive,
  setLightboxActive,
}: IProps) => {
  const closeLightbox = () => {
    setLightboxActive(false);
  };

  const prevImage = () => {
    const prevImage = product.images[product.images.indexOf(currentImage) - 1];
    const lastImage = product.images[product.images.length - 1];
    const firstImage = product.images[0];
    if (currentImage === firstImage) {
      setCurrentImage(lastImage);
    } else {
      setCurrentImage(prevImage);
    }
  };
  const nextImage = () => {
    const nextImage = product.images[product.images.indexOf(currentImage) + 1];
    const lastImage = product.images[product.images.length - 1];
    const firstImage = product.images[0];
    if (currentImage === lastImage) {
      setCurrentImage(firstImage);
    } else {
      setCurrentImage(nextImage);
    }
  };

  return (
    <div className={style["lightbox"]}>
      <div className={style["lightbox-content-wrapper"]}>
        <button
          onClick={closeLightbox}
          className={style["close-lightbox-button"]}
          title="close lightbox"
        >
          <img src="./icons/icon-close.svg" alt="close icon" />
        </button>

        <button
          onClick={prevImage}
          className={`${style["images-button"]} ${style["prev-button"]}`}
        >
          <img src="./icons/icon-previous.svg" alt="previous" />
        </button>

        <ImageCarousel
          type="lightbox"
          currentImage={currentImage}
          setCurrentImage={setCurrentImage}
          product={product}
          lightboxActive={lightboxActive}
          setLightboxActive={setLightboxActive}
        />

        <button
          onClick={nextImage}
          className={`${style["images-button"]} ${style["next-button"]}`}
        >
          <img src="./icons/icon-next.svg" alt="next" />
        </button>
      </div>
    </div>
  );
};

export default Lightbox;
