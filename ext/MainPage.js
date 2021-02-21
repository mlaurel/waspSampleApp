import React from 'react'
import getTasks from '@wasp/queries/getTasks'
import { useQuery } from '@wasp/queries'

const MainPage = () => {
    const { data: tasks, isFetching, error } = useQuery(getTasks)

    return (
        <>
            {tasks && <TaskList tasks={tasks} />}
            {isFetching && 'Fetching...'}
            {error && `Error: ${error}`}
        </>
    )
}

export default MainPage
