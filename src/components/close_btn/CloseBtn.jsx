import React from "react";
import s from "./CloseBtn.module.css";
export default function CloseBtn({ close }) {
  return (
    <input
      type="button"
      value="X"
      className={s.closeBtn}
      onClick={() => close(false)}
    />
  );
}
