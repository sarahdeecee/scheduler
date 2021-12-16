/* This file contains code for displaying
   Submit, Cancel, and Confirm buttons */

import React from "react";
import classNames from "classnames";
import "components/Button.scss";

export default function Button(props) {
   const btnClass = classNames('button', {
      'button--confirm': props.confirm,
      'button--danger': props.danger
   });
   return (
      <button
         className={btnClass}
         onClick={props.onClick}
         disabled={props.disabled}
      >
         {props.children}
      </button>
   );
}
