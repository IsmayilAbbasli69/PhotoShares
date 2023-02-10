import React,{useState,useEffect} from 'react';
import {Button,Space,Input,Layout,ConfigProvider,Row,Col,FloatButton,AutoComplete} from'antd'
import {AiOutlinePlus} from 'react-icons/ai'
import CardCom from './CardCom';
import {AiOutlineSearch} from 'react-icons/ai';
import {Routes,Route,BrowserRouter,useNavigate} from 'react-router-dom'
import { useAppSelector } from '../store';
import Create from './Create';
import '../App.css'
import { icons } from 'react-icons';
import axios from 'axios';

const Home:React.FC=(url:any,tags:string[])=> {
const colors=['magenta','red','volcano','orange','gold','lime','green','cyan'];
const navigate=useNavigate();
const photos=useAppSelector((state)=>state.blog);
const [data,setData]=useState([{url,tags}])
const [value,setValue]=useState()

  
useEffect(() => {

axios.get('https://photoshare-api.onrender.com/data')
.then(res => {
  console.log(res.data.data)
 const model=res.data.data
 setData(model)
})

}, [])




return (




 
   
<div className='main'>



<div className='layout'>
  <div
  style={{fontSize:1.5+'rem',color:'white',background:'none'}}>
    PhotoShares</div>
  <div>

  </div>
</div>


  <FloatButton

      shape="circle"
     type={'primary'}
      style={{ right: 30,bottom:30,display:'flex',justifyContent:'center',alignItems:'center',width:60+'px',height:60+'px',

    }}
      icon={<AiOutlinePlus size={20} alignmentBaseline={'central'} />}
      onClick={()=>navigate('/create')}
    />
    
<div className='cards'>

{
data.map((item)=>(

<CardCom src={`https://photoshare-api.onrender.com/uploads/${item.url}`} tags={item.tags} color={colors} />
))

}


</div>


</div>





  );
}

export default Home;
