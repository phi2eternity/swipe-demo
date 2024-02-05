import styles from "@components/inputs/text-input.module.scss";
interface TextInputControlledProps {
  value: string;
  label?: string;
}

const TextInputControlled = ({
  label,
  value
                             }:TextInputControlledProps) => {

  return <div data-testid={"text-inputs-controlled"} className={styles.textInputControlled} >
    <label className={!value ? styles.textInputControlled__label : styles.textInputControlled__label__floating}>{label}</label>
    {!!value ? <div className={styles.textInputControlled__value}>{value}</div> : null }
  </div>
}

export default TextInputControlled;
