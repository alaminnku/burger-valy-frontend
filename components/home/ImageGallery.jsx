import Image from "next/image";
import { useState } from "react";
import { RiArrowRightSLine, RiArrowLeftSLine } from "react-icons/ri";
import styles from "@styles/home/imageGallery.module.css";

const images = [
  { src: "/images/home/interior-1.jpg" },
  { src: "/images/home/mexican-taco.jpg" },
  { src: "/images/home/pepperoni-pizza.jpg" },
  { src: "/images/home/fish-fingers.jpg" },
  { src: "/images/home/chicken-burger.jpg" },
  { src: "/images/home/mushroom-salad.jpg" },
  { src: "/images/home/coffee.jpg" },
];

const ImageGallery = () => {
  const [currentImage, setCurrentImage] = useState(0);

  return (
    <div className={styles.ImageGallery}>
      <div className={styles.Image}>
        <Image
          src={images[currentImage].src}
          width='1024'
          height='576'
          layout='responsive'
        />
      </div>

      <div className={styles.Arrows}>
        <RiArrowLeftSLine
          className={`${styles.LeftArrow} ${
            currentImage === 0 && styles.Disabled
          }`}
          onClick={() =>
            setCurrentImage(currentImage > 0 ? currentImage - 1 : currentImage)
          }
        />
        <RiArrowRightSLine
          className={`${styles.RightArrow} ${
            currentImage === images.length - 1 && styles.Disabled
          }`}
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
