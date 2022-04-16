import { useState } from 'react';
import { useEffect } from "react";
import './App.css';
import Todo from './Todo';
import axios from 'axios';
function App() {
  const [list, setList] = useState([])
  useEffect(() => {
    fetchData()
  }, [])
  const updatingList=(data: any)=>{
    setList(data)
  }
  async function fetchData() {
    await axios.get(`http://localhost:3500/tasks`).then((res) => {
      updatingList(res.data);
    });
  }
  useEffect(() => {
    axios.get(`http://localhost:3500/tasks`).then((res) => {
      setList(res.data);
    });
  }, []);
  const [todo, setTodo] = useState()
  const handleTodo = (event: any) => {
    setTodo(event.target.value);
  }
  const handleSubmit = async (event:any) => {
    event.preventDefault();
    await axios.post(`http://localhost:3500/tasks`, { todoItem: todo, id: Math.floor(Date.now() / (Math.random() * 10)) })
    fetchData();
    // setList([...list, {
    //   todoItem: todo, id: Math.floor(Date.now() / (Math.random() * 10))
    // }])
  }
  const handleDelete = async (incomid:number) => {
    await axios.delete(`http://localhost:3500/tasks/${incomid}`)
    fetchData();
    console.log(list);
    // const newList = list.filter((item) => item.id !== id);
    // setList(newList)
  }

  return (
    <>
      <div>
        <form action="">
          <label> Enter To Do</label>
          <input type="text" placeholder='Type Here' onChange={handleTodo} value={todo} />
          <button type="submit" onClick={handleSubmit}>Add Todo</button>
        </form>
      </div>
      <Todo list={list} handleDelete={handleDelete}></Todo>
    </>
  );
}

export default App;
