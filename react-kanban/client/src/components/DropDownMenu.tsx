import { useRef, useEffect, useState } from "react";

export default function DropDownMenu(
    { id, label, list }:
    { id:string, label: string, list:{ title:string, id:number }[] }
    ) {

    return (
        <div className="p-4">
            <label htmlFor={id} className="mr-2" >{label}</label>: &nbsp;
            <select id={id}>
                {
                    list && list.map((value)=>{
                        return <option value={value.id}>{value.title}</option>
                    })
                }
            </select>
        </div>
    );
};
