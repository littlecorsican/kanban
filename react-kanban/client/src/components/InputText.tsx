import { useRef, useEffect, useState } from "react";

export default function InputText({ id, label, }:{ id:string, label: string }) {

  return (
    <div className="p-4">
        <label htmlFor={id} className="mr-2" >{label}</label>: &nbsp;
        <input type="text" className="rounded" id={id} />
    </div>
  );
};
