/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable no-restricted-globals */
import { useState, useEffect } from "react";
import FruitsImage from "../../assets/fruits image.jpg";
import SproutsImage from "../../assets/sprouts image.jpg";
import FoxnutsImage from "../../assets/foxnuts.jpg";
import IdliImage from "../../assets/idli.jpg";
import SandwichImage from "../../assets/sandwich image.jpg";
import MaggieImage from "../../assets/maggie image.jpg";
import RiceImage from "../../assets/rice image.jpg";
import RajmaImage from "../../assets/rajma image.jpg";
import RotiImage from "../../assets/roti image.jpg";
import KadhaiPaneerImage from "../../assets/paneer image.jpg";
import GattaImage from "../../assets/gatta image.jpg";
import RaitaImage from "../../assets/raita image.jpg";
import BhindiImage from "../../assets/fried bhindi.jpg";
import SaladImage from "../../assets/cucumber image.jpg";

const MenuSwiperUtils = () => {
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  const lunchItems = [
    { itemImage: RiceImage, itemName: "Rice" },
    { itemImage: RajmaImage, itemName: "Rajma" },
    { itemImage: RotiImage, itemName: "Roti" },
    { itemImage: KadhaiPaneerImage, itemName: "Kadhai Paneer" },
    { itemImage: GattaImage, itemName: "Gatta" },
    { itemImage: RaitaImage, itemName: "Boondi Raita" },
    { itemImage: BhindiImage, itemName: "Masala Bhindi" },
    { itemImage: SaladImage, itemName: "Salad" },
  ];

  const snacksItems = [
    { itemImage: FruitsImage, itemName: "Fruit Chaat" },
    { itemImage: SproutsImage, itemName: "Sprouts" },
    { itemImage: FoxnutsImage, itemName: "Salted Foxnuts" },
    { itemImage: IdliImage, itemName: "Fried Idli" },
    { itemImage: SandwichImage, itemName: "Sandwich" },
    { itemImage: MaggieImage, itemName: "Masala Maggie" },
  ];

  useEffect(() => {
    setTimeout(() => {
      setIsDataLoaded(true);
    }, 1500);
  }, []);

  return {
    isDataLoaded,
    lunchItems,
    snacksItems,
  };
};

export default MenuSwiperUtils;
