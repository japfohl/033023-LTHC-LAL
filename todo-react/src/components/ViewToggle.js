export default function ViewToggle({ view, setView }) {
  const calculateClass = (target) =>
    view === target ? "primary" : "secondary outline";

  return (
    <section className="grid">
      <button className={calculateClass("all")} onClick={() => setView("all")}>
        All
      </button>
      <button
        className={calculateClass("active")}
        onClick={() => setView("active")}
      >
        Active
      </button>
      <button
        className={calculateClass("completed")}
        onClick={() => setView("completed")}
      >
        Completed
      </button>
    </section>
  );
}
