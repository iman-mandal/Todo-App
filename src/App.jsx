import { useState , useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [userInput, setUserInput] = useState("")
  const [todos, setTodos] = useState([])
  const [editTodo, setEditTodo] = useState(null);

  
    
  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem("saveTodos"));
    if (storedTodos && storedTodos.length > 0) {
      setTodos(storedTodos);
    }
  }, []);

  
  useEffect(() => {
    localStorage.setItem("saveTodos", JSON.stringify(todos));
  }, [todos]);



  const handaleInput = () => {
    if (userInput.trim() != "") {
      if (editTodo !== null) {
        const updatedTodos = [...todos];
        updatedTodos[editTodo] = userInput;
        setTodos(updatedTodos);
        setEditTodo(null);
      } else {
        setTodos([...todos, userInput]);
      }
    }
    setUserInput("")
  }
  const handleRemove = (index) => {
    const updatedTodos = [...todos];
    updatedTodos.splice(index, 1);
    setTodos(updatedTodos);
  }
  const handleEdit = (index) => {
    setUserInput(todos[index]);
    setEditTodo(index);
  }
  const label= editTodo!=null? "✓" : "+";
  return (
    <>
      <div className="main_container">
        <h1 className="titel">TODO APP</h1>
        <div className="textInputWithAddBtn">
          <input type="text" placeholder='Add your new todo'
            className="userInputHolder" value={userInput}
            onChange={(e) => setUserInput(e.target.value)} />
          <button className="addBtn"
            onClick={handaleInput}
          >{label}</button>
        </div>
        <div className="todoLists">
          {todos.map((item, index) => (
            <div key={index} className="todoItem">
              <div className="checkBoxAndTodoItem">
                <input type="checkbox"
                  className="checkBoxBtn"
                  onChange={(e) => {
                    if (e.target.checked) {
                      e.target.nextSibling.style.textDecoration = "line-through";
                    } else {
                      e.target.nextSibling.style.textDecoration = "none";
                    }
                  }} />
                <span >{item} </span>
              </div>
              <div className="chancelAndEditBtn">
                <button onClick={() => handleEdit(index)} className="editBtn">E</button>
                <button onClick={() => handleRemove(index)} className="cancelBtn">X</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default App
