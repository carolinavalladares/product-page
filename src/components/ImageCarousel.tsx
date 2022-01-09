import React from "react";
import style from "../styles/ImageCarousel.module.css";
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

interface IProps {
  product: IProduct;
  currentImage: image;
  setCurrentImage: React.Dispatch<React.SetStateAction<image>>;
  lightboxActive: boolean;
  setLightboxActive: React.Dispatch<React.SetStateAction<boolean>>;
  type: string;
}

const ImageCarousel = ({
  product,
  currentImage,
  setCurrentImage,
  lightboxActive,
  setLightboxActive,
  type,
}: IProps) => {
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

  const setImage = (image: image) => {
    setCurrentImage(image);
  };

  const openLightbox = () => {
    if (window.innerWidth > 992) {
      setLightboxActive(true);
    }
  };

  return (
    <div>
      <button
        onClick={prevImage}
        className={`${style["images-button"]} ${style["prev-button"]}`}
      >
        <img src="./icons/icon-previous.svg" alt="previous" />
      </button>

      <img
        onClick={openLightbox}
        className={`${style["product-image"]} ${
          type === "lightbox" ? style["lightbox-image"] : null
        }`}
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
  );
};

export default ImageCarousel;
