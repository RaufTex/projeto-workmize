import React, { useState } from 'react';
import onClickOutside from 'react-onclickoutside';

function Dropdown({ title, items, multiSelect = false }) {
  const [open, setOpen] = useState(false);
  const [selection, setSelection] = useState([]);
  const toggle = () => setOpen(!open);
  Dropdown.handleClickOutside = () => setOpen(false);

  function handleOnClick(item) {
    if (!selection.some(current => current.id === item.id)) {
      if (!multiSelect) {
        setSelection([item]);
      } else if (multiSelect) {
        setSelection([...selection, item]);
      }
    } else {
      let selectionAfterRemoval = selection;
      selectionAfterRemoval = selectionAfterRemoval.filter(
        current => current.id !== item.id
      );
      setSelection([...selectionAfterRemoval]);
    }
  }

  function isItemInSelection(item) {
    if (selection.some(current => current.id === item.id)) {
      return true;
    }
    return false;
  }

  return (
    <div display='flex' min-height='38px' flex-wrap='wrap'>
      <div
        display='flex'
        justifyContent='space-between'
        cursor='pointer'
        width='100%'
        padding='0 20px'
        tabIndex={0}
        role='button'
        onKeyPress={() => toggle(!open)}
        onClick={() => toggle(!open)}
      >
        <div fontWeight='bold'>
          <p fontWeight='bold'>{title}</p>
        </div>
        <div
          border-top='1px solid #ccc'
          border-top-left-radius='4px'
          border-top-right-radius='4px'
        >
          <p>{open ? 'Close' : 'Open'}</p>
        </div>
      </div>
      {open && (
        <ul
          boxShadow='0 0.125rem 0.25rem rgba(0, 0, 0, 0.075) !important'
          padding='0'
          margin='0'
          width='100%'
          margin-top='20px'
        >
          {items.map(item => (
            <li list-style-type='none' key={item.id}>
              <button type='button' onClick={() => handleOnClick(item)}>
                <span>{item.name}</span>
                <span>{isItemInSelection(item) && 'Selected'}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

const clickOutsideConfig = {
  handleClickOutside: () => Dropdown.handleClickOutside,
};

export default onClickOutside(Dropdown, clickOutsideConfig);
