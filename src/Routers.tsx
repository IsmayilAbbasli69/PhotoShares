import axios from "axios"
import React,{useEffect} from "react"
import { useAppSelector } from "./store"

const Routers=()=>{
const setData=useAppSelector((state)=>state.photo)

useEffect(() => {
axios.post('http://localhost:5000/create', {
 setData
  })
  .then(function (response) {
    console.log(response.data);
  })
  .catch(function (error) {
    console.log(error);
  });
}, [])


    


}

export default Routers