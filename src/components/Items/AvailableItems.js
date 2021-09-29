import { useEffect, useState } from "react";

import classes from "./AvailableItems.module.css";
import Card from "../UI/Card";
import Item from "./Item/Item";

function AvailableItems(props) {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        "https://trgovina-82ed8-default-rtdb.europe-west1.firebasedatabase.app/items.json"
      );

      if (!response.ok) {
        throw new Error("Neuspješno dohvaćanje baze podataka.");
      }

      const responseData = await response.json();

      let loadedData = [];

      for (const key in responseData) {
        loadedData.push({
          id: key,
          name: responseData[key].name,
          price: responseData[key].price,
        });
      }

      setItems(loadedData);
      setIsLoading(false);
    };

    fetchData().catch((error) => {
      setIsLoading(false);
      setHttpError(error.message);
    });
  }, []);

  if (isLoading) {
    return (
      <section className={classes.itemsLoading}>
        <p>Loading ...</p>
      </section>
    );
  }

  if (httpError) {
    return (
      <section className={classes.itemsError}>
        <p>{httpError}</p>
      </section>
    );
  }

  const itemsList = items.map((item) => (
    <Item id={item.id} key={item.id} name={item.name} price={item.price} />
  ));

  return (
    <section className={classes.items}>
      <Card>
        <ul>{itemsList}</ul>
      </Card>
    </section>
  );
}

export default AvailableItems;
