import { useSelector } from 'react-redux'
import { useEffect, useMemo, useRef } from 'react'
import { RootState } from '@/app/providers/store/types'
import { tasksSelectors } from '@/app/providers/store/slices/tasksSlice'
import { Task } from '@/shared/types/entities'
import { ViewContent } from '@/pages/TasksPage'
import { useApiRequest } from '@/shared/hooks/useApiRequest'
import { fetchTasksApi } from '@/app/services/taskServices/fetchTasksApi'
import { isToday } from '@/shared/lib/dataFunctions'
import { Typography } from '@mui/material'
import { ScrollableView } from '@/shared/ui/ScrollableView'

import styleD from '@/app/styles/MainContentStyles/DashboardPage.module.scss'
import styleMC from '@/app/styles/MainContentStyles/MainContent.module.scss'

export const TasksWidget = () => {
    const allTasks: Task[] = useSelector(tasksSelectors.selectAll)
    const tasksContainerRef = useRef<HTMLDivElement>(null);
    const tasksLoadingStatus = useSelector((state: RootState) => state.tasks.loading)

    const [setFetchTasks, isSettingFetchTasks] = useApiRequest(fetchTasksApi, {})

    useEffect(() => {
        if (tasksLoadingStatus === 'idle') {
            setFetchTasks({})
        }
    }, [tasksLoadingStatus, setFetchTasks])

    const formattedTasks = useMemo((): ViewContent => {
        const tasks = allTasks.filter(task => isToday(task.startDate, task.endDate)).slice().sort((a, b) => a.order - b.order);
        return { type: 'list', content: tasks, isDndEnabled: false };
    }, [allTasks]);

    return (
        <>
            <Typography variant="h6">Tasks for today</Typography>
            <div ref={tasksContainerRef} className={styleD.todayTasksWidget_inner + ' ' + styleMC.scrollableView}>
                <ScrollableView
                    viewType={formattedTasks.type}
                    tasksContainerRef={tasksContainerRef}

                    tasksArray={formattedTasks.type === "list" ? formattedTasks.content : undefined}
                    groupedTasks={formattedTasks.type === "grouped" ? formattedTasks.content : undefined}

                    isDndEnabled={formattedTasks.isDndEnabled}

                    isPanePersistent={false}

                    isWidget={true}
                />
            </div>
        </>
    )
}