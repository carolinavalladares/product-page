import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import ProductPage from "./components/ProductPage";

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

const initialProduct: IProduct = {
  title: "",
  brand: "",
  description: "",
  price: {
    current: "",
    previous: "",
    discountPercentage: "",
  },
  images: [
    {
      title: "",
      main: "",
      preview: "",
    },
  ],
};

function App() {
  const [productAmount, setProductAmount] = useState<number>(1);
  const [currentImage, setCurrentImage] = useState<image>({
    title: "",
    main: "",
    preview: "",
  });
  const [product, setProduct] = useState<IProduct>(initialProduct);
  const [itemsInCart, setItemsInCart] = useState<IItemInCart[]>([]);

  const fetchProduct = async () => {
    const response = await fetch("./product.json");
    const responseJson = await response.json();
    setProduct(responseJson.product);
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  return (
    <div className="App">
      <Header itemsInCart={itemsInCart} setItemsInCart={setItemsInCart} />

      <ProductPage
        productAmount={productAmount}
        setProductAmount={setProductAmount}
        product={product}
        itemsInCart={itemsInCart}
        setItemsInCart={setItemsInCart}
        currentImage={currentImage}
        setCurrentImage={setCurrentImage}
      />
    </div>
  );
}

export default App;
