import React from "react";
import ItemsOrder from "../items_order/ItemsOrder.jsx";
import s from "./OrderUser.module.css";


export default function OrderUser(){
    var sum = 0;
    var users = [
        {
            price: 40,
            id: 1,
            name: "Orquideas"
        },
        {
            price: 50,
            id: 2,
            name: "Jasmines"
        },
        {
            price: 30,
            id: 3,
            name: "Rosas"
        }
        
    ]
    return (
      <div className = {s.OrderUser}>
      {users.forEach(elemento => {sum += elemento.price })}
      <table>
           <thead>
            <tr>
               <th>Nombre</th><th>Precio</th>
            </tr>
           </thead> 
      {users.map(u => {return <ItemsOrder name = {u.name} id = {u.id} price = {u.price} sum = {sum} /> })}
      <tr className = {s.Total}>
        <td>Total</td><td>{sum}</td>
      </tr>
     </table>
      </div>
      );
 }