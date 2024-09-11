

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { DialogContent } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Dialog, DialogTrigger } from '@radix-ui/react-dialog'
import clsx from 'clsx'
import React, { useState } from 'react'

type taskType = {
  "id": number,
  "category": string,
  "title": string,
  "status": string,
  "description": string
}

const data = [
  {
    "id": 1,
    "category": "Shopping",
    "title": "Shopping",
    "status": "pending",
    "description": "Get essentials from Trader Joe's"
  },
  {
    "id": 2,
    "category": "Shopping",
    "title": "Shoes",
    "status": "pending",
    "description": "Purchase running shoes"
  },
  {
    "id": 3,
    "category": "Work",
    "title": "Presentation",
    "status": "pending",
    "description": "Create slides for team meeting"
  },
  {
    "id": 4,
    "category": "Work",
    "title": "Review",
    "status": "pending",
    "description": "Review frontend team's pull request"
  },
  {
    "id": 5,
    "category": "Home",
    "title": "Garage",
    "status": "pending",
    "description": "Organize tools and discard unnecessary items"
  },
  {
    "id": 6,
    "category": "Home",
    "title": "Plants",
    "status": "pending",
    "description": "Water indoor and outdoor plants"
  },
  {
    "id": 7,
    "category": "Health",
    "title": "Exercise",
    "status": "pending",
    "description": "Complete 30-minute yoga session"
  },
  {
    "id": 8,
    "category": "Health",
    "title": "Appointment",
    "status": "pending",
    "description": "Visit dentist for routine check-up"
  }
]

function TaskDashboard() {

  const [tasks, setTasks] = useState<taskType[]>(data);
  const [newTask, setNewTask] = useState<Partial<taskType>>({ title: '', category: '', description: '', });


  const addTask = () => {

    const taskToAdd: taskType = {
      id: tasks.length + 1,
      title: newTask.title || '',
      category: newTask.category || '',
      description: newTask.description || '',
      status: 'pending', 
    };

    setTasks([...tasks, taskToAdd]);
    setNewTask({ title: '', category: '', description: '' });
  };



  const taskDone = (task: taskType, i: number) => {


    const newTasks: taskType[] = [...tasks]
    newTasks[i] = { ...task, status: 'completed' }
    setTasks(newTasks)

    console.log(JSON.stringify(newTasks))
    console.log(JSON.stringify(tasks))
  }

  const taskDelete = (i: number) => {


    const newTasks = tasks.filter((_, index) => i !== index);
    newTasks.splice(i, 1)
    setTasks(newTasks)

    console.log(JSON.stringify(newTasks))
    console.log(JSON.stringify(tasks))
  }

  return (
    <div className='flex-col mx-56 space-y-2 justify-center items-center'>
      <h1 className='flex justify-center'>Zania Task Management</h1>
      <div className='space-y-2'>
        <div className='flex mx-12'>
          {/* header comp */}
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">Add Task</Button>
            </DialogTrigger>
            <DialogContent>
              <Input
                placeholder="Title"
                value={newTask.title}
                onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
              />
              <Input
                placeholder="Category"
                value={newTask.category}
                onChange={(e) => setNewTask({ ...newTask, category: e.target.value })}
              />
              <Input
                placeholder="Description"
                value={newTask.description}
                onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
              />
              <Button variant="outline" onClick={addTask}>
                Add Task
              </Button>
              <Button variant="outline">Cancel</Button>
            </DialogContent>
          </Dialog>
          <Input placeholder='search by catergoty'></Input>
          <Button>Search</Button>
          <Button>Cancel</Button>

        </div>
        <div className='mx-12 space-y-2 '>
          {/* list */}
          {tasks.map((task: taskType, index: number) => {
            return <Card key={task.id} className={clsx('bg-white', { 'bg-green-300': task.status === "completed" })}>
              <CardHeader>
                <CardTitle>{task.title}</CardTitle>
                <CardDescription>{task.description}</CardDescription>
              </CardHeader>
              <CardContent>
              
                <div className='space-x-2'>
                <Button onClick={() => taskDone(task, index)}>Done</Button>
                <Button onClick={() => taskDelete(index)}>Delete</Button>
                </div>
              </CardContent>
            </Card>

          })}
        </div>
      </div>
    </div>
  )
}

export default TaskDashboard


