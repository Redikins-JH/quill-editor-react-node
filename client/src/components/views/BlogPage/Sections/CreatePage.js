import React, { useState, useEffect } from 'react'
import { Typography, Button, Form, message } from 'antd';
import axios from 'axios';
import { useSelector } from "react-redux";
import QuillEditor from '../../../Editor/QuillEditor';

const { Title } = Typography;

export default function CreatePage() {

  const user = useSelector(state => state.user);
  const [files, setFiles] = useState([]);
  const [content, setContent] = useState("")

  const onEditorChange = (value) => {
    setContent(value);
    console.log(content);
  }

  const onFilesChange = (files) => {
    setFiles(files);
    console.log(content);
  }


  const onSubmit = (event) => {
    event.preventDefault();

    setContent("")
    
    if(user.userData && user.userData.isAuth) {
      return alert('Please log in first')
    }

    const variables = {
      content: content,
      userID: user.userData._id
    }


    axios.post('/api/blog/createPost', variables)
    .then(response => {
      console.log(response)
    })
  }

  return (
    <div>
      <div style={{maxWidth: '700px', margin: '2rem auto'}}>
        <div style={{textAlign: 'center'}}>
          <Title level={2}> Editor</Title>
        </div>
        <QuillEditor
          placeholder={"Start Posting Something"}  
         onEditorChange={onEditorChange}
         onFilesChange={onFilesChange}
        />

       <Form onSubmit={onSubmit}>
         <div style={{textAlign: 'center', margin: '2rem'}}>
            <Button
              size="large"
              htmlType="submit"
              className=""
              onSubmit={onSubmit}
            >
              Submit
            </Button>
         </div>
       </Form>

      </div>
    </div>
  )
}
