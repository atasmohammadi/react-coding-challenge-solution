export default function Button({
  variant = "solid",
  size = "md",
  disabled = false,
  leadingIcon,
  children,
  ...rest
}) {
  const classes = ["btn", `btn-${variant}`, `btn-${size}`].join(" ");
  return (
    <button className={classes} disabled={disabled} {...rest}>
      {leadingIcon ? (
        <span className="btn-icon" aria-hidden>
          {leadingIcon}
        </span>
      ) : null}
      <span className="btn-label">{children}</span>
    </button>
  );
}
