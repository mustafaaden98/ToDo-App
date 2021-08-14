import React, { useState, useRef } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const TodoList = () => {
  const [value, setValue] = useState('');
  const [todoLists, setTodoLists] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(undefined)
  const taskRef = useRef([]);

  // Function to capture the input change of input field
  const _onChange = (e) => {
    const { value } = e.target;
    setValue(value);
  }
  // Add the todo item to the list on click of enter
  const _onKeyPress = (e) => {
    if (e.charCode == 13) {
      let updatedList = [...todoLists];
      if (selectedTask) {
        let editedTask = {
          taskId: selectedTask.taskId,
          isCompleted: selectedTask.isCompleted,
          taskName: value
        }
        updatedList = updatedList.map((task, index) => {
          if (task.taskId == selectedTask.taskId) {
            return editedTask
          } else {
            return task
          }
        });
        setTodoLists(updatedList);
        setValue('');
        setSelectedTask(undefined)
      } else {

        let id = Math.floor(Math.random() * 1000);
        let newTask = {
          taskId: id,
          isCompleted: false,
          taskName: value
        }
        updatedList.push(newTask);
        setTodoLists(updatedList);
        setValue('');
      }

    }
  }
  //Function to capture the completion of task and update the todo list
  const onChangeTask = (e, data) => {
    e.preventDefault();
    if (!data) return
    data['isCompleted'] = true;
    let todo = [];
    let completedList = [...completedTasks];
    todoLists.forEach((item, index) => {
      if (item.taskId == data.taskId) {
        completedList.push(data);
      } else {
        todo.push(item);
      }
    })
    setTodoLists(todo);
    setCompletedTasks(completedList);
  }
  //Function to edit the task in the list
  const _onEditClick = (e, index) => {
    e.preventDefault();
    taskRef.current.focus();
    const task = todoLists[index];
    setSelectedTask(task);
    setValue(task.taskName)
  }
  //Function to delete the task from the list
  const _onDeleteClick = (e, index) => {
    e.preventDefault();
    const deletedTask = todoLists[index];
    let updatedTask = [];
    updatedTask = todoLists.filter(task => task.taskId != deletedTask.taskId);
    setTodoLists(updatedTask);
  }

  //Function to capture the position of drag item in the list
  const handleOnDragEnd = (result) => {
    if(!result.destination) return
    const items = [...todoLists];
    const [reorderedItem] = items.splice(result.source.index,1);
    items.splice(result.destination.index,0,reorderedItem);
    setTodoLists(items);
  }

  return (
    <div className = "todo-container">
      <input
        name='field'
        value={value}
        onChange={_onChange}
        onKeyPress={_onKeyPress}
        className="task-input"
        ref={taskRef}
        placeholder = "Enter the task"
      />
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId="todo">
          {(provided) => (
            <ul className="lists" {...provided.droppableProps} ref={provided.innerRef}>
              {todoLists.map((task, index) => {
                return (
                  <Draggable key={task.taskId} draggableId={String(task.taskId)} index={index}>
                    {(provided) => (

                      <li className="task" ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}
                      >
                        <div className="task-label">
                          <input
                            type="checkbox"
                            className="checkbox"
                            checked={task.isCompleted}
                            onChange={(e) => { onChangeTask(e, task, index) }}
                            />
                          <span>{task.taskName}</span>
                        </div>
                        <div style={{ display: 'flex' }}>
                          <button className="btn-edit" onClick={(e) => { _onEditClick(e, index) }}>Edit</button>
                          <button className="btn-delete" onClick={(e) => { _onDeleteClick(e, index) }}>Delete</button>
                        </div>
                      </li>
                    )}
                  </Draggable>
                )
              })}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>

      </DragDropContext>
      {todoLists.length == 0 && completedTasks.length ==0  && <div className = "no-task">No task(s) added</div>}
      {completedTasks.length > 0 && todoLists.length == 0 && <div className = "all-task-complete">All task(s) are performed</div>}
      <ul className = "lists">
        {completedTasks.map((task, index) => {
          return (
            <li key={task.taskId} className="completed-task">
              <input
                type="checkbox"
                className="checkbox"
                checked={task.isCompleted}
                disabled={true}
              />
              {task.taskName}
            </li>
          )
        })}
      </ul>
    </div>
  )
};

export default TodoList;