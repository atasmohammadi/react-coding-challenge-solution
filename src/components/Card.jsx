export default function Card({ title, badge, children }) {
  return (
    <article className="card">
      <header className="card-header">
        <h2 className="card-title">{title}</h2>
        {badge ? (
          <span className="card-badge" aria-label={`${title} is ${badge}`}>
            {badge}
          </span>
        ) : null}
      </header>
      <div className="card-body">{children}</div>
    </article>
  );
}
