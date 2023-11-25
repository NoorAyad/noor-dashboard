"use client";
import { PiPencilSimpleLineLight } from "react-icons/pi";
import { useEffect, useState } from "react";
import { Container } from "../container/container";
import styles from "./productsTable.module.css";
import { useAppStore } from "@/store";
import Delete from "../delete/delete";


export const ProductsTable = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [value, setValue] = useState("");
  const { setIsOpen, setId, setTitle, setDescription, setPrice } =
    useAppStore();

  const getProducts = () => {
    fetch(`https://dummyjson.com/products/search?q=${search}`)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.products);
      });
  };

  useEffect(() => {
    getProducts();
  }, [search]);

  return (

    <div className={styles.table}>
      <Container>
        <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet" />


        <dev className={styles.tid}>
          <input type="text" className={styles.srhbtn} value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="&#xF002; Find Produt"
            onKeyDown={(e) => {
              if (e.key === "Enter") { setSearch(value); }
            }
            } />


          <button className={styles.btnmodal}
            onClick={() => {
              setId(null);
              setTitle("");
              setDescription("");
              setIsOpen(true);
            }}
          >

            + New Product
          </button>      </dev>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((el, i) => (
              <tr key={i}>
                <td>{el.id}</td>
                <td>
                  <b>{el.title}</b></td>
                <td>
                  <b>{el.price} $</b>
                </td>
                <td className={styles.actions}>
                  <button
                    className={styles.editBtn}
                    onClick={() => {
                      setId(el.id);
                      setTitle(el.title);
                      setDescription(el.description);
                      setPrice(el.price);
                      setIsOpen(true);
                    }}
                  >
                    <PiPencilSimpleLineLight />
                  </button>
                  <Delete id={el.id} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Container>
    </div>
  );
};
