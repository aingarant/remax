import Image from "next/image";
import React from "react";

const CardItem = ({ card }) => {
  return (
    <div className="max-w-fit mx-auto">
      <Image alt={card.name}   
      src={card.img_url.startsWith("http") || card.img_url.startsWith("https") 
         ? card.img_url 
         : `/assets/img/card/${card.img_url}`} 
         width={200} height={200} />
    </div>
  );
};

export default CardItem;
