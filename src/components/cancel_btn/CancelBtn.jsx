import React from 'react';
import s from './CancelBtn.module.css';
import CloseIcon from '@material-ui/icons/Close';
//onClick={() => props.onClose(false)}
export default function CancelBtn({close, text}){
  return(
    <button className={s.cancelBtn} onClick={() => close(false)} type="button" ><CloseIcon className={s.icon}/>{text}</button>
  )
}
