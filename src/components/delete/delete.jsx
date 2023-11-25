import React from "react";
import styles from "./delete.module.css";
import { RiDeleteBin5Line } from "react-icons/ri";
function Delete({ id }) {
  const deleteProduct = () => {
    fetch(`https://dummyjson.com/products/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then(console.log);
  };
  return (
    <div>
      <button
        className={styles.deleteBtn}
        onClick={deleteProduct}
      >
        <RiDeleteBin5Line />
      </button>
    </div>
  );
}

export default Delete;
