import React, { useState } from 'react'
import { useQuery } from '@wasp/queries'
import getTasks from '@wasp/queries/getTasks'
import createTask from '@wasp/actions/createTask'
import updateTask from '@wasp/actions/updateTask'

const MainPage = () => {
    const { data: tasks, isFetching, error } = useQuery(getTasks)

    return (
        <>
            <AddTaskForm />
            {tasks && <TaskList tasks={tasks} />}
            {isFetching && 'Fetching...'}
            {error && `Error: ${error}`}
        </>
    )
}

const Task = (props) => {
    const handleChange = async (event) => {
        try {
            await updateTask({
                taskId: props.task.id,
                data: { isDone: event.target.checked },
            })
        } catch (error) {
            window.alert(`Error while updating task: ${error.message}`)
        }
    }
    return (
        <div>
            <input
                type="checkbox"
                id={props.task.id}
                checked={props.task.isDone}
                onChange={handleChange}
            />
            {props.task.description}
        </div>
    )
}

const TaskList = (props) => {
    if (!props.tasks?.length) return 'No tasks'
    return props.tasks.map((task, idx) => <Task task={task} key={idx} />)
}

const AddTaskForm = (props) => {
    const defaultDescription = ''
    const [description, setDescription] = useState(defaultDescription)

    const handleSubmit = async (event) => {
        event.preventDefault()
        try {
            await createTask({ description })
            setDescription(defaultDescription)
        } catch (err) {
            window.alert('Error: ' + err.message)
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />
            <input type="submit" value="Create task" />
        </form>
    )
}

export default MainPage
