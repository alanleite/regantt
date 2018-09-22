import React from 'react'
import styled from 'styled-components'

const GanttBodyContainer = styled.div`
    overflow: hidden;
    overflow-x: auto;
    position: absolute;
    left:700px;
    top: 0;
    right: 0;
    bottom: -20px;
    border: 1px solid lightgray;
    > div {
        height: 100%;
    }
`

const GanttBodyBase = styled.div`
    height: 100%;
    .month {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        height: 30px;
      }
      .month .header {
        display: flex;
        justify-content: center;
        align-items: center;
      }

      .grid {
        display: flex;
        height: 100%;
        flex-wrap: nowrap;    
      }

      .grid .col {
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        min-width: 30px;
        height: 100%;
        padding: 0;
      }
      .grid .col .header {
        display: flex;
        height: 30px;
        padding: 8px 4px;
        justify-content: center;
        align-items: center;
      }

      .grid .col .last {
        border: 1px solid red;
      }
      .grid .col .period {
        flex-grow: 1;
        border-right: 1px solid lightgray;
      }
      .col-filler {
        flex-grow: 1;
        background-color: white;
      }
      .content {
        height: 100%;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
      }
`

const GanttBodyContent = styled.div`
    height: 100%;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    .task {
        position: absolute;
        background-color: lightblue;
        padding: 4px;
    }
`

class Gantt extends React.Component {
    render() {
        const columns = this.props.columns || []
        const tasks = this.props.tasks
        console.log(tasks)
        return (
            <GanttBodyContainer>
            <div>

                <GanttBodyBase>
                    <div className='month'>
                        {columns.month.map((month, i) => (
                            <div 
                                key={i} 
                                className='header'
                                style={{ minWidth: month.size * 30 }}>
                                { month.name }
                            </div>
                        ))}
                    </div>
                    <div className='grid'>
                        {columns.days.map((day, i) => (
                            <div key={i} className='col'>
                                <div className='header'>{ day }</div>
                                <div className='period'></div>
                            </div>
                        ))}
                        <div className='col-filler'/>
                    </div>                    
                </GanttBodyBase>

                <GanttBodyContent>
                    {tasks.map(task => (
                        <div 
                            className='task'
                            style={{
                                height: 30,
                                width: (task.fx - task.ix) * 30 + 30,
                                top: task.offsetY,
                                left: (task.ix * 30),
                                position: 'absolute'
                            }}>
                            <span>{ task.title }</span>
                        </div>
                    ))}
                </GanttBodyContent>

            </div>
        </GanttBodyContainer>
        )
    }
}

export default Gantt