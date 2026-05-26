import { Link } from "react-router-dom";
import styles from "./button.module.css";

export default function Button({
  children,
  className = "",
  variant = "primary",
  size = "md",
  fullWidth = false,
  to,
  type = "button",
  disabled = false,
  onClick,
  ...rest
}) {
  const buttonClassName = [
    styles.button,
    styles[variant],
    styles[size],
    fullWidth ? styles.fullWidth : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  if (to) {
    return (
      <Link className={buttonClassName} to={to} {...rest}>
        {children}
      </Link>
    );
  }

  return (
    <button
      className={buttonClassName}
      type={type}
      disabled={disabled}
      onClick={onClick}
      {...rest}
    >
      {children}
    </button>
  );
}
