import React, { useEffect, useState, useRef } from "react";
import "./home-view.scss";
import { Fishes, FishTank, Shop } from "../../components";
import { iFish } from "../../../core/models/fish";
import hookImg from "../../images/hook.png";

const HomeView: React.FC = () => {
  const ApiURL = "https://acnhapi.com/v1a/fish/";
  const [allFish, setAllFish] = useState<iFish[] | null>(null);
  const [swimmingFishes, setSwimmingFishes] = useState<iFish[] | null>([]);
  const [error, setError] = useState(false);
  const [openShop, setOpenShop] = useState(true);
  const fishingRod = useRef<HTMLDivElement | null>(null);

  const getData = async (url) => {
    const data = await fetch(url);
    const result = await data.json();
    return result;
  };

  useEffect(() => {
    try {
      getData(ApiURL).then((data) => setAllFish(data));
    } catch {
      console.log("error");
      setError(true);
    }
  }, []);

  const catchFish = (x, y, direction) => {
    if (!fishingRod.current) return;
    fishingRod.current.classList.add("catchFish");
    if (direction === "left") {
      fishingRod.current.style.setProperty("--scale", `-1`);
    } else {
      fishingRod.current.style.setProperty("--scale", `1`);
    }
    fishingRod.current.style.setProperty("--xOffset", `${x}px`);
    fishingRod.current.style.setProperty("--yOffset", `${y}px`);
  };

  useEffect(() => {
    console.log(swimmingFishes);
  }, [swimmingFishes]);

  const handleAnimationEnd = (e) => {
    e.target.classList.remove("catchFish");
  };

  const pageClassName = openShop ? "pageContainer openShop" : "pageContainer";

  return (
    <section className={pageClassName}>
      {allFish && (
        <Shop
          setOpenShop={setOpenShop}
          setSwimmingFishes={setSwimmingFishes}
          swimmingFishes={swimmingFishes}
          allFish={allFish}
        />
      )}

      <section className="sea">
        <div className="boat"></div>
        <div
          className="fishingRod"
          ref={fishingRod}
          onAnimationEnd={handleAnimationEnd}
        >
          <img src={hookImg} alt="fishing hook" />
        </div>

        <FishTank>
          {swimmingFishes && (
            <Fishes
              catchFish={catchFish}
              fishArray={swimmingFishes}
              setSwimmingFishes={setSwimmingFishes}
            />
          )}
        </FishTank>
      </section>
    </section>
  );
};

export default HomeView;
