import React, { ReactNode, useEffect, useRef, useState } from "react";
import "../../App.css";
import "./carousel-slider.css";
import Avatar from "react-avatar";
import { motion } from "framer-motion";
import PetCard from "../cards/pet-card";

interface Props {
  Element: React.ElementType;
  args: Array<{}>;
}

const CarouselSlider: React.FC<Props> = ({ Element, args }) => {
  const [width, setWidth] = useState<number | any>();
  const carousel = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!carousel.current) return;
    const newWidth =
      carousel.current.scrollWidth - carousel.current.offsetWidth;
    if (newWidth) {
      setWidth(newWidth);
    }
  }, [Element, args]);

  return (
    <>
      <motion.div className="carousel" ref={carousel}>
        <motion.div
          drag="x"
          dragConstraints={{ right: 0, left: -width }}
          whileDrag={{ cursor: "grabbing" }}
          className="inner-carousel"
        >
          {args.map((args, i: number) => {
            return (
              <motion.div className="item" key={i}>
                <Element {...args} />
              </motion.div>
            );
          })}
        </motion.div>
      </motion.div>
    </>
  );
};

export default CarouselSlider;
