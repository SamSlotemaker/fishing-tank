import React, { useRef, useState } from "react";
import "./fish.scss";
import { iFish } from "../../../core/models/fish";
interface iProps {
  fish: iFish;
  catchFishRod: any;
  setSwimmingFishes: any;
  setIsFishing: (state: boolean) => void;
}

const getRandomNumber = (min, max) => {
  return Math.random() * max + min;
};

const Fish: React.FC<iProps> = ({
  fish,
  catchFishRod,
  setSwimmingFishes,
  setIsFishing,
}) => {
  const fishRef = useRef<HTMLLIElement | null>(null);

  const [yOffset] = useState(getRandomNumber(0, 90));
  const [animationDelay] = useState(getRandomNumber(0, 24));
  const [animationSpeed] = useState(getRandomNumber(30, 15));

  const handleCatchFish = (direction) => {
    setTimeout(() => {
      if (!fishRef.current) return;
      const { x, y, width, height } = fishRef.current.getBoundingClientRect();
      let xOffset = x;
      const yOffset = y + height * 2;

      if (direction === "left") {
        fishRef.current.style.setProperty("--scale", `1`);
      } else {
        fishRef.current.style.setProperty("--scale", `-1`);
        xOffset = x + width;
      }

      fishRef.current.style.setProperty("--xAnimated", `${xOffset}px`);
      fishRef.current.style.setProperty("--yAnimated", `-${yOffset}px`);
      fishRef.current.classList.add("catchFish");
    }, 1000);
  };

  const handleClick = (e) => {
    setIsFishing(true);
    const fish = e.target;
    const fishBox = fish.getBoundingClientRect();
    //check fish direction
    const scale = getComputedStyle(fish).getPropertyValue("--r");

    let xOffset;
    let direction;
    if (parseInt(scale) === 1) {
      direction = "left";
      const swimmingOffset = (window.innerWidth / animationSpeed) * 2;
      xOffset = fishBox.x - swimmingOffset;
    } else {
      direction = "right";
      const swimmingOffset =
        (window.innerWidth / animationSpeed) * 2 + fishBox.width;
      xOffset = fishBox.x + swimmingOffset;
    }

    handleCatchFish(direction);
    catchFishRod(xOffset, fishBox, direction);
  };

  const handleCaughtFish = () => {
    setIsFishing(false);
    setSwimmingFishes((oldArray) => {
      const index = oldArray.findIndex(
        (oldFish) => oldFish.ids.uniqueId === fish.ids.uniqueId
      );
      const newArray = [...oldArray];
      if (index > -1) {
        newArray.splice(index, 1);
      }
      return newArray;
    });
  };

  return (
    <>
      <li
        onClick={handleClick}
        onAnimationEnd={handleCaughtFish}
        className="fish"
        ref={fishRef}
        style={
          {
            "--yOffset": `${yOffset}%`,
            "--animationDelay": `${-animationDelay}s`,
            "--animationSpeed": `${animationSpeed}s`,
          } as React.CSSProperties
        }
      >
        <img src={fish.icon_uri} alt="fish" />
      </li>
    </>
  );
};

export default Fish;
