import classes from "./ItemsSumarry.module.css";

const ItemsSummary = () => {
  return (
    <section className={classes.summary}>
      <h2>Trgovina</h2>
      <p>Odaberi proizvode koje želiš spremiti u košaricu!</p>
      <p>Svaki proizvod ima svoje ime i cijenu.</p>
    </section>
  );
};

export default ItemsSummary;
