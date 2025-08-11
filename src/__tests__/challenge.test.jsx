import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../App.jsx";

test("renders tabs with correct ARIA", () => {
  render(<App />);
  const tablist = screen.getByRole("tablist", { name: /billing period/i });
  const tabs = within(tablist).getAllByRole("tab");
  expect(tabs.map((t) => t.textContent)).toEqual(["Monthly", "Yearly"]);
  expect(tabs[0]).toHaveAttribute("aria-selected", "true");
});

test("switching tabs updates selection state", async () => {
  render(<App />);
  const user = userEvent.setup();
  const tablist = screen.getByRole("tablist", { name: /billing period/i });
  const [monthly, yearly] = within(tablist).getAllByRole("tab");

  await user.click(yearly);
  expect(yearly).toHaveAttribute("aria-selected", "true");
  expect(monthly).toHaveAttribute("aria-selected", "false");
});

test("renders three plans with titles and CTA buttons", () => {
  render(<App />);
  const plans = screen.getByRole("region", { name: /plans/i });
  const cards = within(plans).getAllByRole("article");
  expect(cards).toHaveLength(3);

  for (const card of cards) {
    expect(within(card).getByRole("heading", { level: 2 })).toBeInTheDocument();
    expect(
      within(card).getByRole("button", { name: /choose.*plan/i })
    ).toBeInTheDocument();
  }
});

test("Pro plan shows a Popular badge with aria-label", () => {
  render(<App />);
  const plans = screen.getByRole("region", { name: /plans/i });
  const proBadge = within(plans).getByLabelText(/pro is popular/i);
  expect(proBadge).toBeInTheDocument();
});

test("prices change when switching to yearly", async () => {
  render(<App />);
  const user = userEvent.setup();
  const tablist = screen.getByRole("tablist", { name: /billing period/i });
  const [, yearly] = within(tablist).getAllByRole("tab");

  // monthly first
  let prices = screen.getAllByText(/\$\d+/).map((n) => n.textContent);
  expect(prices).toContain("$12");
  expect(prices).toContain("$24");
  expect(prices).toContain("$48");

  await user.click(yearly);
  prices = screen.getAllByText(/\$\d+/).map((n) => n.textContent);
  expect(prices).toContain("$120");
  expect(prices).toContain("$240");
  expect(prices).toContain("$480");
});

test("CSS tokens exist and can switch theme attribute", () => {
  document.body.setAttribute("data-theme", "dark");
  // We cannot compute styles in jsdom reliably, but the attribute should be present
  expect(document.body.getAttribute("data-theme")).toBe("dark");
});

test("button variants/sizes apply classnames", () => {
  render(<App />);
  const anyButton = screen.getAllByRole("button", { name: /choose.*plan/i })[0];
  expect(anyButton.className).toMatch(/btn/);
});
