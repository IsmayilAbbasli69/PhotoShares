
import React from 'react'
import {Card,Divider,Space,Tag,Button} from 'antd'
const { Meta } = Card;

interface IProps{
    src:any,
    tags:string[],
    color:string[]
}
const CardCom=({src,tags,color}:IProps)=>{
return(
    <Card
   
    hoverable
    style={{width:200+'px',margin:50+'px'}}
    cover={<img alt="example" width='200' height='200' style={{backgroundColor:'black'}} src={src}/>

}
  >
    <Space size={[0, 8]} wrap>
        {
            tags.map((tags,index)=>(
                <Tag color={color[index]}>{tags}</Tag>
            ))
        }

    </Space>

  </Card>
);



}

export default CardCom