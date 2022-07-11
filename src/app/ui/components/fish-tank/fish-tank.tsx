import React from "react";
import "./fish-tank.scss";
import coral1 from "../../images/coral1.png";
import coral2 from "../../images/coral2.png";
import coral3 from "../../images/coral3.png";
import submarine from "../../images/submarine.png";

interface iProps {
  children: JSX.Element | null;
}

const FishTank: React.FC<iProps> = ({ children }) => {
  return (
    <section className="fishTank">
      <div className="fishTankLightBeams"></div>
      <div className="fishTankBackgroundProps">
        <img src={submarine} alt="" className="submarine" />
        <img
          src={coral1}
          alt="coral"
          className="fishTankBackgroundProps_coral1-1"
        ></img>
        <img
          src={coral1}
          alt="coral"
          className="fishTankBackgroundProps_coral1-2"
        ></img>
        <img
          src={coral2}
          alt="coral"
          className="fishTankBackgroundProps_coral2-1"
        ></img>
        <img
          src={coral3}
          alt="coral"
          className="fishTankBackgroundProps_coral3-1"
        ></img>
      </div>
      {children}
    </section>
  );
};

export default FishTank;
