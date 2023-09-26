import React, { useState } from "react";

export interface InfoButtonProps {
  infoText: string;
  className?: string;
}

const InfoButton: React.FC<InfoButtonProps> = ({ infoText, className }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleClick = () => {
    setIsClicked(!isClicked);
  };

  return (
    <div
      className={`info-button ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    >
      <div className={`circle ${isClicked ? "active" : ""}`}>
        <span>i</span>
      </div>
      {(isHovered || isClicked) && <div className="info-text">{infoText}</div>}
    </div>
  );
};

export default InfoButton;
