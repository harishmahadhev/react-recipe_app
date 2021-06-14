import "bootstrap/dist/css/bootstrap.min.css";
import "./styles.css";
import { useState, useContext } from "react";
import { MdDelete } from "react-icons/md";
import { useHistory } from "react-router";
import { strCtx } from "./usecontext";

export default function PriceCart() {
  const context = useContext(strCtx);

  return (
    <div>
      <p className="m-5">hi{context.count}</p>
    </div>
  );
}
