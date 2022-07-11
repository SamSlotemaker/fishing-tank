import React, { useRef, useState } from "react";
import "./fish.scss";
import { iFish } from "../../../core/models/fish";
interface iProps {
  fish: iFish;
  catchFish: any;
  setSwimmingFishes: any;
  setIsFishing: (state: boolean) => void;
}

const getRandomNumber = (min, max) => {
  return Math.random() * max + min;
};

const Fish: React.FC<iProps> = ({
  fish,
  catchFish,
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
      const { x, width, y, height } = fishRef.current.getBoundingClientRect();
      let xOffset;

      if (direction === "left") {
        xOffset = x;
        fishRef.current.style.setProperty("--scale", `1`);
      } else {
        xOffset = x + width;
        fishRef.current.style.setProperty("--scale", `-1`);
      }

      const yOffset = y + height * 2;
      fishRef.current.style.setProperty("--xAnimated", `${xOffset}px`);
      fishRef.current.style.setProperty("--yAnimated", `-${yOffset}px`);
      fishRef.current.classList.add("catchFish");
    }, 1000);
  };

  const handleClick = (e) => {
    setIsFishing(true);
    let { x: firstXMeasure } = e.target.getBoundingClientRect();
    //check fish direction after 100ms
    setTimeout(() => {
      const { x, width, y, height } = e.target.getBoundingClientRect();
      let secondXMeasure = x;
      let xOffset;
      let direction;
      if (firstXMeasure > secondXMeasure) {
        direction = "left";
        //left
        const swimmingOffset = (window.innerWidth / animationSpeed) * 2;
        xOffset = x - swimmingOffset;
      } else {
        direction = "right";
        //right
        const swimmingOffset = (window.innerWidth / animationSpeed) * 2 + width;
        xOffset = x + swimmingOffset;
      }
      const yOffset = y + height / 2;
      catchFish(xOffset, yOffset, direction);
      handleCatchFish(direction);
    }, 100);
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
