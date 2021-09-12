import Image from "next/image";
import { useState } from "react";
import { RiArrowRightSLine, RiArrowLeftSLine } from "react-icons/ri";
import styles from "@styles/home/imageGallery.module.css";

const images = [
  { src: "/images/home/burger.jpg" },
  { src: "/images/home/coffee.jpg" },
  { src: "/images/home/food-plate.jpg" },
  { src: "/images/home/food-plate-2.jpg" },
  { src: "/images/home/food-plates.jpg" },
  { src: "/images/home/foods.jpg" },
  { src: "/images/home/interior-1.jpg" },
  { src: "/images/home/interior-2.jpg" },
  { src: "/images/home/noodles.jpg" },
  { src: "/images/home/pizza-2.jpg" },
  { src: "/images/home/pizza.jpg" },
  { src: "/images/home/table-2.jpg" },
  { src: "/images/home/table.jpg" },
];

const ImageGallery = () => {
  const [currentImage, setCurrentImage] = useState(0);

  return (
    <div className={styles.ImageGallery}>
      <div className={styles.Image}>
        <Image src={images[currentImage].src} width='1024' height='576' />
      </div>

      <div className={styles.Arrows}>
        <RiArrowLeftSLine
          className={styles.LeftArrow}
          onClick={() =>
            setCurrentImage(currentImage > 0 ? currentImage - 1 : currentImage)
          }
        />
        <RiArrowRightSLine
          className={styles.RightArrow}
          onClick={() =>
            setCurrentImage(
              currentImage === images.length - 1
                ? currentImage
                : currentImage + 1
            )
          }
        />
      </div>
    </div>
  );
};

export default ImageGallery;
