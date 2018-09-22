import React from 'react'
import styled from 'styled-components'
import GanttTree from './GanttTree'
import GanttBody from './GanttBody'
import { calculate } from '../core/helpers';

const GanttContent = styled.div`
    position: relative;
    width: 100%;
    display: flex;
    flex-direction: row !important;
`


class Gantt extends React.Component {
    
    tasks(data) {
        const tamanhoHeaderGrupo = 50
        const tamanhoLinha = 48
        let totalRows = 0

        const result = data.data.reduce((acc, group, i) => {
            
            const rows = group.tasks
            
            const tasks = rows.reduce((tasksAcc, rowData, rowIndex) => {
                const tasksExtraction = rowData.map(singleTask => (Object.assign(
                    {},
                    singleTask,
                    {
                        offsetY:
                            (i + 1) * tamanhoHeaderGrupo +
                            (totalRows * tamanhoLinha) + 60 + 7
                    }
                )))
                totalRows++
                return [].concat(tasksAcc, tasksExtraction)
            }, [])
            return [].concat(acc, tasks)
        }, [])
        return result
    }

    render() {
        const data = calculate(this.props.data)
        const tasks = this.tasks(data)
        if (!data) return null
        return (
            <GanttContent>
                <GanttTree {...data} />
                <GanttBody {...data} tasks={tasks} />
            </GanttContent>
        )
    }
}

export default Gantt