import React, {useState, useEffect} from 'react';
import axios from 'axios';
import CloseBtn from '../close_btn/CloseBtn.jsx';
import s from './ViewReset.module.css';

export default function ViewReset({id, onClose }){
  const [user,setUser] = useState();
  const [input, setInput] = useState({
    email: "",
    id:"",
    name: ""

  });



  useEffect(() => {
    if(!user){
      axios.get(`http://localhost:3000/users/${id}`).then((res) => {
    setInput({
        email: res.data.email,
        id: res.data.id,
        name: res.data.name
      })
      console.log(input)
      console.log(setInput)
      setUser(res.data);

      })
    }
  },[user])



  const onSubmit = function(event){
    event.preventDefault();
    const data = {
      email: input.email
    };

  axios.post(`http://localhost:3000/reset`, data).then((res) => {
  alert("Reseteado correctamente");

    })


  }






  return (<div className={s.ViewUser}>
          <div className={s.content}>
              <CloseBtn close={onClose}/>
              <h3> Reset Password </h3>
              <div> Id: <span>{input.id}</span></div>
              <div> Email: <span>{input.email}</span> </div>
              <div> Nombre: <span>{input.name}</span> </div>
            <div>
              <button onClick={() => onClose(false)} className={[s.btn].join(' ')}>Salir</button>
            </div>
            <div>
              <button  onClick={onSubmit} className={[s.btn].join(' ')}>Reset Password</button>
            </div>
          </div>
          </div>
        )
}
