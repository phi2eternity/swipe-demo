import {useState} from "react";
import styles from "./dropdown-bottom-drawer.module.scss";
import SelectBottomDrawer from "@components/drawers/select-bottom-drawer/select-bottom-drawer";
import CtaPrimary from "@components/buttons/cta-primary/cta-primary";
import WeakBtn from "@components/buttons/weak-btn/weak-btn";
import CheckableCard from "@components/cards/checkable-card/checkable-card";
import {Close} from "@mui/icons-material";


export interface DropdownBottomDrawerItem<Entity> {
  id:number,
  title?:string,
  description?:string,
  value : Entity
}

export interface DropdownBottomDrawerProps<Entity> {
  label: string;
  options: DropdownBottomDrawerItem<Entity>[];
  onSelect?: (options: Entity[]) => void;
  initialState?: DropdownBottomDrawerItem<Entity>[];
  clearAll?: boolean;
  selectAll?: boolean;

}

const DropdownBottomDrawer = <T extends {}>({
                                    label, options, initialState, onSelect, clearAll=true, selectAll=true
}: DropdownBottomDrawerProps<T>) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<DropdownBottomDrawerItem<T>[]>(initialState ?? []);

  const handleCheck = (option: DropdownBottomDrawerItem<T>) => {
    setSelected((prev ) => {
      const index = prev.findIndex((item : DropdownBottomDrawerItem<T>) => item.id === option.id);
      if (index > -1) {
        return prev.filter((item) => item.id !== option.id);
      }
      return [...prev, option];
    });
  };

  const handleContinue = () => {
    onSelect && onSelect(selected.map((item ) => item.value));
    setIsOpen(false)
  }

  const handleSelectAll = () => {
    setSelected(options);
    onSelect && onSelect(options.map((item) => item.value));
    setIsOpen(false)
  }

  const handleClearAll = () => {
    setSelected([]);
    onSelect && onSelect([]);
    setIsOpen(false)
  }

  const toggle = () => setIsOpen(!isOpen);

  const cards = options.map((option) => {
    const checked = selected.findIndex((item) => item.id === option.id) > -1;
    return <div onClick={() => handleCheck(option)} data-testid={"dropdown-bottom-drawer-option-item"}><CheckableCard
      key={option.id}
      title={option.title}
      content={option.description}
      checked={checked}
    />
      <div style={{height: "8px"}}/>
    </div>
  });

  let valueText = null;
  if(selected.length == 1){
    valueText = selected[0].title ?? "1 Selected";
  }else if(selected.length > 1){
    valueText = `${selected.length} Selected`;
  }




  return (<div data-testid={"dropdown-bottom-drawer"} className={styles.dropdownBtnTemplate} onClick={toggle}>
    <label className={!valueText ? styles.dropdownBtnTemplate__label : styles.dropdownBtnTemplate__label__floating}>{label}</label>
    {!!valueText ? <div className={styles.dropdownBtnTemplate__value}>{valueText}</div> : null }

    <SelectBottomDrawer open={isOpen}>
      <div className={styles.dropdownBtnTemplate__header}>
        <h1>{label}</h1>
        <Close onClick={toggle}/>
      </div>
      <div style={{height: "16px"}}/>
      <>
        {...cards}
      </>
      <div style={{height: "8px"}}/>
      <div className={styles.dropdownBtnTemplate__buttonGroup}>
        {clearAll && <WeakBtn onClick={handleClearAll} data-testid={"dropdown-bottom-drawer-clear-all"} content={"Clear all selections"}/>}
        {selectAll &&      <WeakBtn onClick={handleSelectAll} data-testid={"dropdown-bottom-drawer-select-all"} content={"Select All"}/>}
      </div>

      <div style={{height: "8px"}}/>
      <CtaPrimary onClick={handleContinue} data-testid={"dropdown-bottom-drawer-continue"} content={"Continue"}/>
    </SelectBottomDrawer>

  </div>);
}

export default DropdownBottomDrawer;
