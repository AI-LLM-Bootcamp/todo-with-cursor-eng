"use client"

import { useState } from "react"
import { Plus, Pencil, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

type Todo = {
  id: number
  text: string
}

export function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [newTodo, setNewTodo] = useState("")
  const [editingId, setEditingId] = useState<number | null>(null)

  const addTodo = () => {
    if (newTodo.trim() !== "") {
      setTodos([...todos, { id: Date.now(), text: newTodo }])
      setNewTodo("")
    }
  }

  const updateTodo = (id: number, newText: string) => {
    setTodos(todos.map(todo => todo.id === id ? { ...todo, text: newText } : todo))
    setEditingId(null)
  }

  const deleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id))
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">Todo List</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex space-x-2 mb-4">
          <Input
            type="text"
            placeholder="Add a new task"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && addTodo()}
          />
          <Button onClick={addTodo}>
            <Plus className="w-4 h-4 mr-2" />
            Add
          </Button>
        </div>
        <ul className="space-y-2">
          {todos.map(todo => (
            <li key={todo.id} className="flex items-center space-x-2">
              {editingId === todo.id ? (
                <Input
                  type="text"
                  value={todo.text}
                  onChange={(e) => updateTodo(todo.id, e.target.value)}
                  onBlur={() => setEditingId(null)}
                  onKeyPress={(e) => e.key === "Enter" && updateTodo(todo.id, e.target.value)}
                  autoFocus
                />
              ) : (
                <>
                  <span className="flex-grow">{todo.text}</span>
                  <Button size="icon" variant="outline" onClick={() => setEditingId(todo.id)}>
                    <Pencil className="w-4 h-4" />
                    <span className="sr-only">Edit</span>
                  </Button>
                  <Button size="icon" variant="outline" onClick={() => deleteTodo(todo.id)}>
                    <Trash2 className="w-4 h-4" />
                    <span className="sr-only">Delete</span>
                  </Button>
                </>
              )}
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter className="text-center text-sm text-muted-foreground">
        © 2023 Todo List App. All rights reserved.
      </CardFooter>
    </Card>
  )
}