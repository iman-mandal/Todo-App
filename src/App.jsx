import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [userInput, setUserInput] = useState("")
  const [todos, setTodos] = useState([])
  const [editTodo, setEditTodo] = useState(null)
  
  // Load todos from localStorage on initial render
  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem("saveTodos") || "[]")
    if (storedTodos && storedTodos.length > 0) {
      setTodos(storedTodos)
    }
  }, [])

  // Save todos to localStorage whenever todos change
  useEffect(() => {
    localStorage.setItem("saveTodos", JSON.stringify(todos))
  }, [todos])

  // Handle adding/updating todos
  const handleInput = () => {
    if (userInput.trim() !== "") {
      if (editTodo !== null) {
        // Update existing todo
        const updatedTodos = [...todos]
        updatedTodos[editTodo] = { ...updatedTodos[editTodo], text: userInput }
        setTodos(updatedTodos)
        setEditTodo(null)
      } else {
        // Add new todo
        setTodos([...todos, { text: userInput, completed: false }])
      }
      setUserInput("")
    }
  }

  // Handle removing a todo
  const handleRemove = (index) => {
    const updatedTodos = [...todos]
    updatedTodos.splice(index, 1)
    setTodos(updatedTodos)
  }

  // Handle editing a todo
  const handleEdit = (index) => {
    setUserInput(todos[index].text)
    setEditTodo(index)
  }

  // Toggle todo completion status
  const handleToggleComplete = (index) => {
    const updatedTodos = [...todos]
    updatedTodos[index] = { 
      ...updatedTodos[index], 
      completed: !updatedTodos[index].completed 
    }
    setTodos(updatedTodos)
  }

  // Handle key press (Enter to add/update)
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleInput()
    }
  }

  // Clear all todos
  const handleClearAll = () => {
    if (window.confirm("Are you sure you want to clear all todos?")) {
      setTodos([])
    }
  }

  // Clear completed todos
  const handleClearCompleted = () => {
    const incompleteTodos = todos.filter(todo => !todo.completed)
    setTodos(incompleteTodos)
  }

  // Count completed and remaining todos
  const completedCount = todos.filter(todo => todo.completed).length
  const remainingCount = todos.length - completedCount

  // Button label based on mode
  const buttonLabel = editTodo !== null ? "✓" : "+"

  return (
    <div className="app-container">
      <div className="main_container">
        <header className="app-header">
          <h1 className="title">📝 Todo App</h1>
          <p className="subtitle">Manage your daily tasks efficiently</p>
        </header>

        <div className="input-section">
          <div className="textInputWithAddBtn">
            <input 
              type="text" 
              placeholder='What needs to be done?'
              className="userInputHolder" 
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              onKeyDown={handleKeyPress}
              autoFocus
            />
            <button 
              className={`addBtn ${editTodo !== null ? 'edit-mode' : ''}`}
              onClick={handleInput}
              disabled={!userInput.trim()}
            >
              {buttonLabel}
            </button>
          </div>
          
          {editTodo !== null && (
            <div className="edit-notice">
              <span>Editing todo #{editTodo + 1}</span>
              <button className="cancel-edit-btn" onClick={() => {setEditTodo(null); setUserInput("")}}>
                Cancel Edit
              </button>
            </div>
          )}
        </div>

        <div className="stats-section">
          <div className="stat">
            <span className="stat-value">{todos.length}</span>
            <span className="stat-label">Total</span>
          </div>
          <div className="stat">
            <span className="stat-value">{remainingCount}</span>
            <span className="stat-label">Remaining</span>
          </div>
          <div className="stat">
            <span className="stat-value">{completedCount}</span>
            <span className="stat-label">Completed</span>
          </div>
        </div>

        {todos.length > 0 ? (
          <div className="todoLists">
            {todos.map((item, index) => (
              <div 
                key={index} 
                className={`todoItem ${item.completed ? 'completed' : ''}`}
              >
                <div className="checkBoxAndTodoItem">
                  <div 
                    className={`checkBoxBtn ${item.completed ? 'checked' : ''}`}
                    onClick={() => handleToggleComplete(index)}
                  >
                    {item.completed && "✓"}
                  </div>
                  <span className={`todo-text ${item.completed ? 'completed-text' : ''}`}>
                    {item.text}
                  </span>
                </div>
                <div className="chancelAndEditBtn">
                  <button 
                    onClick={() => handleEdit(index)} 
                    className="editBtn"
                    title="Edit todo"
                  >
                    E
                  </button>
                  <button 
                    onClick={() => handleRemove(index)} 
                    className="cancelBtn"
                    title="Delete todo"
                  >
                    X
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <div className="empty-icon">📋</div>
            <h3>No todos yet</h3>
            <p>Add a new task above to get started!</p>
          </div>
        )}

        {todos.length > 0 && (
          <div className="action-buttons">
            <button 
              className="clear-completed-btn" 
              onClick={handleClearCompleted}
              disabled={completedCount === 0}
            >
              Clear Completed ({completedCount})
            </button>
            <button 
              className="clear-all-btn" 
              onClick={handleClearAll}
            >
              Clear All
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default App