import { Fragment } from "react";
import ItemsSumarry from "./ItemsSumarry";
import AvailableItems from "./AvailableItems";

function Items() {
  return (
    <Fragment>
      <ItemsSumarry />
      <AvailableItems />
    </Fragment>
  );
}

export default Items;
