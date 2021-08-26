import { useRouter } from "next/router";
import { items } from "../data/items";
import Image from "next/image";
import styles from "@styles/menu/itemPage.module.css";
import { useEffect, useState } from "react";

const ItemPage = () => {
  const router = useRouter();
  const [slug, setSlug] = useState("");

  // Update get the slug when ready on client side
  useEffect(() => {
    if (router.isReady) {
      setSlug(router.query.slug);
    }
  }, [router.isReady]);

  // Frist word
  const firstWord = slug.split("-").slice(0, 1);

  // Rest of the words
  const restWords = slug
    .split("-")
    .slice(1)
    .map((word) => word.slice(0, 1).toUpperCase() + word.slice(1));

  // New array with udated words
  const newStringArray = [...firstWord, ...restWords];

  // New name
  const name = newStringArray.join("");

  return (
    <div className={styles.ItemPage}>
      <Image src={`/images/menu/${slug}.jpg`} alt="" width="768" height="432" />
    </div>
  );
};

export default ItemPage;
