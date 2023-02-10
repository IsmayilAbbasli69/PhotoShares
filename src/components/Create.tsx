import React, { useEffect, useRef, useState } from 'react';
import { PlusOutlined ,UploadOutlined} from '@ant-design/icons';
import type { InputRef } from 'antd';
import { Input,Form, Tag, theme,message,Upload,Button} from 'antd';
import type { UploadProps } from 'antd';
import { TweenOneGroup } from 'rc-tween-one';
import { get } from '../features/blogSlice';
import { useAppDispatch,useAppSelector } from '../store';
import { createTags ,createUrl,createName} from '../features/createPhotoSlice';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

const Create: React.FC = () => {
  const { token } = theme.useToken();
  const [tags, setTags] = useState<string[]>(['cool']);
  const [inputVisible, setInputVisible] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef<InputRef>(null);
  const [file,setFile]=useState<any>()
  const [fileName,setFileName]=useState<string>()
  const dispatch=useAppDispatch()
 const navigate=useNavigate();





  useEffect(() => {

    if (inputVisible) {
      inputRef.current?.focus();
    }
  }, []);

  const handleClose = (removedTag: string) => {
    const newTags = tags.filter((tag) => tag !== removedTag);
    console.log(newTags);
    setTags(newTags);
  };

  const showInput = () => {
    setInputVisible(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleInputConfirm = () => {
    if (inputValue && tags.indexOf(inputValue) === -1) {
      setTags([...tags, inputValue]);
    }
    setInputVisible(false);
    setInputValue('');
  };

  const forMap = (tag: string) => {
    const tagElem = (
      <Tag
        closable
        onClose={(e) => {
          e.preventDefault();
          handleClose(tag);
        }}
      >
        {tag}
      </Tag>
    );
    return (
      <span key={tag} style={{ display: 'inline-block' }}>
        {tagElem}
      </span>
    );
  };

  const tagChild = tags.map(forMap);

  const tagPlusStyle = {
    background: token.colorBgContainer,
    borderStyle: 'dashed',
  };





  const props: UploadProps = {
    name: 'file',
   action:'https://photoshare-api.onrender.com/uploads',
   
    headers: {
      authorization: 'authorization-text',
    },
    onChange(info) {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
       setFile(info)
        setFileName(info.file.name)
      }
   
     
    },
  };


  function onSubmit(e:React.FormEvent<HTMLButtonElement>){
    e.preventDefault()
        if(tags.length>2){
       
          if(file===undefined){
            message.warning('Please upload an image file')
          }else{
               
        dispatch(createTags(tags))
        dispatch(createUrl(file))
        dispatch(createName(fileName))
    
 
       
    
        axios.post('https://photoshare-api.onrender.com/create', {
          tags:tags,
          url:fileName,
       
           })
           .then(function (response) {
             console.log(response.data);
             message.loading('File is uploading',()=>{
              navigate('/')
             })
           })
           .catch(function (error) {
             console.log(error);
             message.error('File failed')
           });
       
    
          }
        }else{
          message.warning('You have to enter 3 tags at the least')
        }
    
      }
    


  return (
    <>
    <img src="https://picsum.photos/200/300" className="create_img" />
    <div className='Create'>
        <Form className='create_form'>
      <div style={{ marginBottom: 16 }}>
        <TweenOneGroup
          enter={{
            scale: 0.8,
            opacity: 0,
            type: 'from',
            duration: 100,
          }}
          onEnd={(e) => {
            if (e.type === 'appear' || e.type === 'enter') {
              (e.target as any).style = 'display: inline-block';
            }
          }}
          leave={{ opacity: 0, width: 0, scale: 0, duration: 200 }}
          appear={false}
        >
          {tagChild}
        </TweenOneGroup>
      </div>
      {inputVisible ? (
        <Input
          ref={inputRef}
          type="text"
          size="small"
          style={{ width: 78 }}
          value={inputValue}
          onChange={handleInputChange}
          onBlur={handleInputConfirm}
          onPressEnter={handleInputConfirm}
        />
      ) : (
        <Tag onClick={showInput} style={tagPlusStyle}>
          <PlusOutlined /> New Tag
        </Tag>
      )}
   
<Upload  {...props}  accept="image/png, image/jpeg,image/jpeg,image/gif">
<Button  style={{margin:10+'px'}} icon={<UploadOutlined />} type='primary'>Click to Upload</Button>
</Upload>
       
  
     
     
   
 <button className='create_btn' onClick={(e:React.FormEvent<HTMLButtonElement>)=>(onSubmit(e))}>Submit</button>
      </Form>
      </div>
    </>
  );
};

export default Create;