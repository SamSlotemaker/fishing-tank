import React, { useState } from "react";
import "./fishes.scss";
import { iFish } from "../../../core/models/fish";
import { Fish } from "../../components";

interface iProps {
  fishArray: Array<iFish>;
  catchFishRod: any;
  setSwimmingFishes: any;
}

const Fishes: React.FC<iProps> = ({
  fishArray,
  catchFishRod,
  setSwimmingFishes,
}) => {
  const [isFishing, setIsFishing] = useState(false);

  return (
    <>
      <ul className={isFishing ? "isFishing" : ""}>
        {fishArray.map((fish) => (
          <Fish
            fish={fish}
            key={fish.ids.uniqueId}
            catchFishRod={catchFishRod}
            setSwimmingFishes={setSwimmingFishes}
            setIsFishing={setIsFishing}
          />
        ))}
      </ul>
    </>
  );
};

export default Fishes;
