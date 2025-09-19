import styles from "./select-genero.module.css";

export default function SelectGenero({ value, onChange }) {
  return (
    <select
      value={value}
      onChange={onChange}
      required
      className={styles.selectGenero}
    >
      <option value="" disabled hidden>
        Selecione o gênero
      </option>
      <option value="masculino">Masculino</option>
      <option value="feminino">Feminino</option>
      <option value="outro">Outro</option>
    </select>
  );
}
