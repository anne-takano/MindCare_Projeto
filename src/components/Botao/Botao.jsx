import "./botao.estilos.css";

export default function Botao({ children, ...rest }) {
  return (
    <button className="botao" {...rest}>
      {children}
    </button>
  );
}
