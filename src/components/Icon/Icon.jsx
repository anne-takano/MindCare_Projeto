export default function Icon(props) {
  const variantClass = props.variant
    ? `material-symbols-${props.variant}`
    : "material-symbols-outlined";

  const style = {
    color: props.color,
    fontSize: props.fontSize,
  };

  if (props.weight) {
    style.fontVariationSettings = `'wght' ${props.weight}`;
  }

  return (
    <span className={variantClass} style={style}>
      {props.iconName}
    </span>
  );
}
