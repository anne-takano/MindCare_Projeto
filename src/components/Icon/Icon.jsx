export default function Icon(props) {
  return (
    <span class="material-symbols-outlined" style={{ color: props.color }}>
      {props.iconName}
    </span>
  );
}
