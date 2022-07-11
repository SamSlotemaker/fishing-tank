import React from "react";
import "./shop-fish.scss";
interface iProps {
  fish: any;
  updateFish: (id: number, count: number) => void;
}

const ShopFish: React.FC<iProps> = ({ fish, updateFish }) => {
  return (
    <>
      <li className="shopFish">
        <h3 className="shopFishHeading">{fish.name["name-USen"]}</h3>
        <img
          className="shopFishImage"
          src={fish.icon_uri}
          alt="fish"
          loading="lazy"
        />
        <form className="shopFishForm">
          <button
            onClick={(e) => {
              e.preventDefault();
              updateFish(fish.id, -1);
            }}
          >
            -
          </button>
          <p>{fish.count}</p>
          <button
            onClick={(e) => {
              e.preventDefault();
              updateFish(fish.id, +1);
            }}
          >
            +
          </button>
        </form>
      </li>
    </>
  );
};

export default ShopFish;
