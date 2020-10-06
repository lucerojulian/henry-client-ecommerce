import React from 'react';
import s from './SuccessBtn.module.css';
import DoneIcon from '@material-ui/icons/Done';

export default function SuccessBtn({text}){
  return(
    <button className={s.succesBtn} type="submit"><DoneIcon className={s.icon}/>{text}</button>
  )
}
