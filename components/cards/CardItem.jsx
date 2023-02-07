import Image from "next/image";
import React from "react";

const CardItem = ({ card }) => {
  return (
    <div className="p-2">
      <Image alt={card.name} src={`/assets/img/card/${card.img_url}`} width={300}  height={300} />
    </div>
  );
};

export default CardItem;
