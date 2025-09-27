import { v4 as uuidv4 } from "uuid";
import { useState, useEffect } from "react";
import { json } from "stream/consumers";

interface ItodoData {
  text: string;
  id: string;
}

export default function App() {
  const [input, setInput] = useState<string>("");
  const [list, setList] = useState<ItodoData[]>(()=>{
    try {
      const savedLocalData = localStorage.getItem('todos');
      return savedLocalData? JSON.parse(savedLocalData): []
    } catch (error) {
      console.log(error)
      return []
    }
  });

  const [editId, setEditId] = useState<string >(' ');

  const handleAddUpdate = () => {
    if (!input.trim()) return;

    setList((prev)=>editId? prev.map((items)=> items.id=== editId ? {...items, text:input} : items): [...prev, {id:uuidv4(), text:input}] )

    setInput("");
    setEditId('');
  };

  useEffect(() => {
    localStorage.setItem('todos' , JSON.stringify(list))
  }, [list]);

  const handleDelete = (ids: string) => {
    setList((prev) => prev.filter((r) => r.id !== ids));
  };

  const handleEdit = (idx: string) => {
   const existingId = list.find((items)=> items.id === idx);
   if(existingId) {
    setEditId(idx);
    setInput(existingId.text)
   }
  };

  return (
    <div className="App">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="add todos list"
      />
      <button onClick={handleAddUpdate}>add todo</button>

      <ul>
        {list?.map((todo) => {
          return (
            <div
              id={todo.id}
              key={todo.id}
              style={{ display: "flex", gap: "10px" }}
            >
              <li>{todo.text}</li>
              <button onClick={() => handleEdit(todo.id)}>Edit</button>
              <button onClick={() => handleDelete(todo.id)}>Delete</button>
            </div>
          );
        })}
      </ul>
    </div>
  );
}
