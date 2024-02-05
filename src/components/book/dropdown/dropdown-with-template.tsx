import React, { useState } from 'react';
import { IoMdArrowDropdown } from 'react-icons/io';
import styles from './SelectButton.module.css';

interface SelectButtonProps<T> {
  items: T[];
  renderItem: (item: T) => string;
  onSelect: (item: T) => void;
}

const SelectButton = <T,>({
                            items,
                            renderItem,
                            onSelect,
                          }: SelectButtonProps<T>) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleItemClick = (item: T) => {
    setIsOpen(false);
    onSelect(item);
  };

  return (
    <div className={styles.selectButton}>
      <button onClick={() => setIsOpen(!isOpen)}>
        Select an item
        <IoMdArrowDropdown
          size="24px"
          className={`${styles.icon} ${isOpen && styles.rotate}`}
        />
      </button>
      {isOpen && (
        <ul className={styles.selectButton__list}>
          {items.map((item, index) => (
            <li
              key={index}
              className={styles.selectButton__listItem}
              onClick={() => handleItemClick(item)}
            >
              {renderItem(item)}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SelectButton;
