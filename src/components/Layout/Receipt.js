import React, { useEffect, useState } from "react";
import Card from "../UI/Card";
import classes from "./Receipt.module.css";

const Receipt = (props) => {
  const [receiptItems, setReceiptItems] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        "https://trgovina-82ed8-default-rtdb.europe-west1.firebasedatabase.app/orders.json"
      );
      const respData = await response.json();

      let orderList = [];

      for (const key in respData) {
        orderList.push({
          id: key,
          orderedItems: respData[key].orderedItems,
          user: respData[key].user,
          totalAmount: respData[key].totalAmount,
        });
      }
      setReceiptItems(orderList);
    };
    fetchData();
  }, []);

  let glavniRacun;
  let proizvodi;
  let totalAmount;
  let cijenaSaPromoCode;

  let glavniRacunArray = [];

  receiptItems.map((receipt) => {
    //probavanje pushanja pomocu objekta
    glavniRacun = {
      imeUsera: receipt.user.name,
      adresaUsera: receipt.user.adress,
      creditCardUsera: receipt.user.creditcard,
      promoCodeUsera: receipt.user.promocode,
    };

    glavniRacunArray.push(glavniRacun);

    for (let i = 0; i < receipt.orderedItems.length; i++) {
      proizvodi = {
        itemName: receipt.orderedItems[i].name,
        itemAmount: receipt.orderedItems[i].amount,
        itemPrice: receipt.orderedItems[i].price,
      };

      glavniRacunArray.push(proizvodi);
    }
    totalAmount = {
      totalAmount: receipt.totalAmount.totalAmount,
    };
    glavniRacunArray.push(totalAmount);
    console.log(totalAmount.totalAmount);

    if (glavniRacun.promoCodeUsera === "20%OFF") {
      cijenaSaPromoCode = {
        promoCodeTotalPrice: (0.8 * totalAmount.totalAmount).toFixed(2),
      };
      glavniRacunArray.push(cijenaSaPromoCode);
    } else if (glavniRacun.promoCodeUsera === "5%OFF") {
      cijenaSaPromoCode = {
        promoCodeTotalPrice: (0.95 * totalAmount.totalAmount).toFixed(2),
      };
      glavniRacunArray.push(cijenaSaPromoCode);
    } else if (glavniRacun.promoCodeUsera === "20EUROFF") {
      cijenaSaPromoCode = {
        promoCodeTotalPrice: (totalAmount.totalAmount - 20).toFixed(2),
      };
      glavniRacunArray.push(cijenaSaPromoCode);
    }
  });

  return (
    <section className={classes.meals}>
      <Card>
        <h1>RAČUNI: </h1>
        {glavniRacunArray.map((item, index) => {
          return (
            <div key={item.id}>
              <ul>
                <li className={classes.meal}>
                  <div>
                    <h4>{item.imeUsera}</h4>
                    <h5 className={classes.description}>{item.adresaUsera}</h5>
                    <h5 className={classes.description}>
                      {item.creditCardUsera}
                    </h5>
                    <h5 className={classes.description}>
                      {item.promoCodeUsera}
                    </h5>
                  </div>

                  <div className={classes.price}>{item.itemName}</div>
                  <div className={classes.price}>{item.itemAmount}</div>
                  <div className={classes.price}>{item.itemPrice}</div>
                  <div className={classes.price}>{item.totalAmount}</div>
                  <div className={classes.price}>
                    {item.promoCodeTotalPrice}
                  </div>
                </li>
              </ul>
            </div>
          );
        })}
      </Card>
    </section>
  );
};

export default Receipt;

{
  /* <div key={item.id}>
              <ul>
                <li>
                <div>
                  <h4>{item.imeUsera}</h4>
                </div>
                </li>
                <li>{item.adresaUsera}</li>
                <li>{item.creditCardUsera}</li>
                <li>{item.promoCodeUsera}</li>
                <li>{item.itemName}</li>
                <li>{item.itemAmount}</li>
                <li>{item.itemPrice}</li>
                <li>{item.totalAmount}</li>
              </ul>
            </div> */
}
