import React, { useState, useRef, useEffect } from "react";
import backImg from "../../images/back.png";
import { iFish } from "../../../core/models/fish";
import uuid from "react-uuid";

import "./shop.scss";
import { ShopFish } from "../../components";

interface iProps {
  allFish: iFish[];
  setOpenShop: (state) => void;
  setSwimmingFishes: any;
  swimmingFishes: iFish[] | null;
}

const Shop: React.FC<iProps> = ({
  setOpenShop,
  setSwimmingFishes,
  allFish,
  swimmingFishes,
}) => {
  const shopRef = useRef<HTMLButtonElement | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [shopFish, setShopFish] = useState<any>([...allFish]);

  const checkOccurrence = (array, element) => {
    let counter = 0;
    array.flat().forEach((item) => {
      if (item.id === element) {
        counter++;
      }
    });
    return counter;
  };

  useEffect(() => {
    const newShopFish = shopFish.map((fish) => {
      fish.count = checkOccurrence(swimmingFishes, fish.id);
      return fish;
    });

    setShopFish(newShopFish);
  }, [swimmingFishes]);

  const handleShopClose = () => {
    setOpenShop((prevState) => !prevState);
  };

  useEffect(() => {
    window.addEventListener("mouseup", handleStopDragging);
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mouseup", handleStopDragging);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [isDragging]);

  const updateFish = (id, count: number) => {
    if (count === +1) {
      // add new fish
      const fish = allFish.find((fish) => fish.id === id);
      const newFish = Object.assign({}, fish);
      const uniqueID = uuid();
      if (newFish) {
        newFish.ids = {
          fishId: newFish.id,
          uniqueId: uniqueID,
        };
      }

      setShopFish((oldFish) => {
        const newArray = [...oldFish];
        const updateFish = newArray.find((fish) => fish.id);
        updateFish.count += 1;
        return newArray;
      });

      setSwimmingFishes((oldArray) => {
        return [...oldArray, newFish];
      });
    } else {
      // add remove fish
      setSwimmingFishes((oldArray) => {
        const index = oldArray.findIndex((fish) => fish.id === id);
        const newArray = [...oldArray];
        if (index > -1) {
          newArray.splice(index, 1);
        }
        return newArray;
      });

      setShopFish((oldFish) => {
        const newArray = [...oldFish];
        const updateFish = newArray.find((fish) => fish.id);
        if (updateFish.count > 0) {
          updateFish.count -= 1;
        }
        return newArray;
      });
    }
  };

  const handleMouseDown = () => {
    setIsDragging(true);
  };

  const handleStopDragging = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e) => {
    if (!shopRef.current || !isDragging) return;
    shopRef.current.style.setProperty("--width", `${e.pageX}px`);
  };

  return (
    <section className="shop" ref={shopRef}>
      <button className="shopToggle" onClick={handleShopClose}>
        <img src={backImg} alt="" />
      </button>

      <button className="resizeButton" onMouseDown={handleMouseDown}></button>

      <section className="shopFishListContainer">
        <h2>Shop</h2>
        <ul className="shopFishList">
          {shopFish.map((fish, i) => {
            if (i < 10) {
              return (
                <ShopFish key={fish.id} fish={fish} updateFish={updateFish} />
              );
            }
          })}
        </ul>
      </section>
    </section>
  );
};

export default Shop;
