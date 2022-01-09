import React, { useState } from "react";
import MiniCart from "./MiniCart";

import style from "../styles/Header.module.css";

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
interface HeaderProps {
  itemsInCart: IItemInCart[];

  setItemsInCart: React.Dispatch<React.SetStateAction<IItemInCart[]>>;
}

const Header = ({ itemsInCart, setItemsInCart }: HeaderProps) => {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [cartIsOpen, setCartIsOpen] = useState<boolean>(false);

  const openMenu = () => {
    setMenuOpen(true);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const toggleCart = () => {
    setCartIsOpen(!cartIsOpen);
  };

  return (
    <header className={style["page-header"]}>
      <div className={style["page-header__wrapper"]}>
        <div className={style["menu-button-wrapper"]}>
          <button onClick={openMenu} className={style["menu-button"]}>
            <div className={style["menu-hamburger"]}>
              <div className={style["menu-hamburger-line"]}></div>
              <div className={style["menu-hamburger-line"]}></div>
              <div className={style["menu-hamburger-line"]}></div>
            </div>
          </button>
        </div>

        <div className={style["page-header__logo"]}>
          <a href="/">
            <img src="./icons/logo.svg" alt="" />
          </a>
        </div>

        <nav
          className={`${style["page-header__menu"]} ${
            menuOpen ? style["open"] : null
          }`}
        >
          <button onClick={closeMenu} className={style["close-menu-button"]}>
            <img src="./icons/icon-close.svg" alt="close menu" />
          </button>
          <ul className={style["page-header__menu-list"]}>
            <li className={style["page-header__menu-item"]}>
              <a className={style["page-header__menu-item-link"]} href="#">
                Collections
              </a>
            </li>
            <li className={style["page-header__menu-item"]}>
              <a className={style["page-header__menu-item-link"]} href="#">
                Men
              </a>
            </li>
            <li className={style["page-header__menu-item"]}>
              <a className={style["page-header__menu-item-link"]} href="#">
                Women
              </a>
            </li>
            <li className={style["page-header__menu-item"]}>
              <a className={style["page-header__menu-item-link"]} href="#">
                Contact
              </a>
            </li>
          </ul>
        </nav>

        <div className={style["page-header__user-items"]}>
          <button
            onClick={toggleCart}
            className={style["user-items__cart-button"]}
            title="cart"
          >
            <img
              className={style["cart-icon"]}
              src="./icons/icon-cart.svg"
              alt=""
            />
            {itemsInCart.length > 0 ? (
              <span className={style["cart-button__amount-items"]}>
                {itemsInCart.length}
              </span>
            ) : null}
          </button>
          <a href="#">
            <img
              src="./images/image-avatar.png"
              alt="user image"
              className={style["user-items__user-image"]}
            />
          </a>
        </div>
        <MiniCart
          itemsInCart={itemsInCart}
          setItemsInCart={setItemsInCart}
          cartIsOpen={cartIsOpen}
        />
      </div>
    </header>
  );
};

export default Header;
