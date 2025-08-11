import { useEffect, useState } from "react";
import { Plans } from "./data/plans";
import Tabs from "./components/Tabs";
import Card from "./components/Card";
import Button from "./components/Button";

function Features({ items = [] }) {
  return (
    <ul className="features">
      {items.map((f, i) => (
        <li key={i}>{f}</li>
      ))}
    </ul>
  );
}

export default function App() {
  const [billing, setBilling] = useState("monthly");
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    document.body.setAttribute("data-theme", theme);
  }, [theme]);

  const plans = Plans[billing];

  return (
    <>
      <header className="site-header">
        <h1>Choose your plan</h1>
        <div className="header-actions">
          <button
            className="theme-toggle"
            aria-label="Toggle theme"
            onClick={() => setTheme((t) => (t === "light" ? "dark" : "light"))}
          >
            {theme === "light" ? "🌞" : "🌙"}
          </button>
        </div>
      </header>

      <main className="container">
        <Tabs
          tabs={[
            { id: "monthly", label: "Monthly" },
            { id: "yearly", label: "Yearly" },
          ]}
          value={billing}
          onChange={setBilling}
        />

        <section className="plans-grid" aria-label="Plans">
          {plans.map((plan) => (
            <Card
              key={plan.id}
              title={plan.name}
              badge={plan.name === "Pro" ? "Popular" : undefined}
            >
              <div className="price">${plan.price}</div>
              <Features items={plan.features} />
              <Button
                variant="solid"
                size="md"
                aria-label={`Choose ${plan.name} plan`}
              >
                Choose Plan
              </Button>
            </Card>
          ))}
        </section>
      </main>
    </>
  );
}
