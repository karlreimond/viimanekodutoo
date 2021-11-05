import { useContext, useState, useRef, useEffect } from "react";
import { Context } from "../store";
import { addPost, removePost, updatePosts,resetPost } from "../store/actions";
import { Table, Space } from 'antd';

function Posts() {
  const [refresh, setRefresh] = useState("");
  const [title, setTitle] = useState("");
  const [state, dispatch] = useContext(Context);
  const [row, setRows] = useState("");
  const inputRef = useRef(null);
  console.log(state);
  // Ilma dependency massivita ehk ilma [] kutsub välja igal renderdusel
  // tühja massiivi dependencyna esimest korda
  // saab ka kutsuda teatud state muutustel välja
  useEffect(() => {

    fetch('http://localhost:8081/api/post/')
    .then(response => {
      return response.json()
    }).then( data => {
      console.log(data)
      console.log(...data)
      dispatch(resetPost())
      dispatch(addPost(data))
      setRows(data)
    })
  }, [refresh])

  // Või võite panna eraldi nupu, et "Get latest from database" (Sync)

  const handleSubmit = (e) => {
    e.preventDefault();

    addNewPost();

    if (inputRef.current) inputRef.current.focus();
  };

  function addNewPost(data) {
    const newPost = {
      id: Date.now(),
      firstname: state.auth.firstName,
      lastname: state.auth.lastName,
      title: title,
      email: state.auth.email
    };
    console.log("siin on data upse", newPost)
    // Salvestame andmebaasi ja kui on edukas, 
    // siis teeme dispatchi ja uuendame state lokaalselt

    return( 
      fetch('http://localhost:8081/api/post/create/', {
      method: "POST",
      body: JSON.stringify(newPost),
      headers: {'Content-Type':'application/json'}
    }).then(response => {
      if(response.ok){
        return dispatch(addPost(newPost));
      } else {
        throw new Error("Probleem lisamisel")
      }
    }).catch ( errorInfo => {
      OnFinishFailed(errorInfo);
    }));
  };

  const OnFinishFailed = (errorInfo) => {
    console.log('dosent work: ', errorInfo);
  };

    function deleteRow (id){
      console.log(id)
      return fetch('http://localhost:8081/api/post/delete/' + id, {
        method: "DELETE",
        //body: JSON.stringify(bodyvariable),
        //headers: {'Content-Type':'application/json'}
      }).then(response => {
        console.log(response)
        if(response.ok){
          return dispatch(removePost(id))
        } else {
          throw new Error("Probleem kustutamisel")
        }
      }).then(setRefresh(Date.now()))
        .catch ( error => {
        console.log("joudsin siia")
      })}

    
    // KUI TAHAD BODY SAATA  mu muutuja,
  const columns = [
    {
        title: 'Firstname',
        dataIndex: 'firstname',
        key: 'firstname',
        render: text => <a>{text}</a>,
    },
    {
      title: 'Lastname',
      dataIndex: 'lastname',
      key: 'lastname',
      render: text => <a>{text}</a>,
    },
    {
        title: 'Email',
        dataIndex: 'email',
        key: 'age',
    },
    {
        title: 'Post',
        dataIndex: 'post',
        key: 'post',
    },

    {
        title: 'Action',
        key: 'action',
        render: (text, record) => (
        <Space size="middle">
            <a onClick = {()=> deleteRow(record._id)} >Delete</a>
        </Space>
        ),
    },
    ];

    const data = [
      ...row
    ]; 





  return (
    <div style={{ textAlign: "center" }}>
      <h1>Posts</h1>
      <form onSubmit={handleSubmit}>
        <input
          ref={inputRef}
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          autoFocus
        />
        <button type="submit">Submit</button>
      </form>

      {state.posts.data.map((e) => (
        <li key={e.id}>
          {e.createdAt} 
          {e.title} 
          {e.firstname} 
          {e.lastname}
          {e.post}
          <span
            style={{ cursor: "pointer" }}
            onClick={() => dispatch(removePost(e.id))}
          >
            &#128540;
          </span>
        </li>
      ))}<Table dataSource={data} columns={columns}/> 
    </div>
    
  );
}

export default Posts;