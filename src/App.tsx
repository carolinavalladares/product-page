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
  const [productAmount, setProductAmount] = useState<number>(0);
  const [product, setProduct] = useState<IProduct>(initialProduct);

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
      <Header />
      <ProductPage
        productAmount={productAmount}
        setProductAmount={setProductAmount}
        product={product}
      />
    </div>
  );
}

export default App;
