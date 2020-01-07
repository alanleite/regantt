import React from 'react'
import GanttBodyBase from '../elements/GanttBodyBase'
import GanttBodyContainer from '../elements/GanttBodyContainer'
import GanttBodyContent from '../elements/GanttBodyContent'
import GanttTask from '../elements/GanttTask'

const isWorkday = (d) => {
  return !(d.wd === 0 || d.wd === 6)
}

const GanttBody = ({
  columns = [],
  tasks,
  onTaskClick
}) => {
  return (
    <GanttBodyContainer>
      <div>
        <GanttBodyBase>
          <div className='month'>
            {columns.month.map((month, i) => (
              <div
                key={i}
                className='header'
                style={{ minWidth: month.size * 30 }}
              >
                {month.name}
              </div>
            ))}
          </div>
          <div className='grid'>
            {columns.days.map((dayInfo, i) => (
              <div key={i} className='col'>
                <div className='header'>{dayInfo.day}</div>
                <div className={'period ' + (!isWorkday(dayInfo) ? 'nowork' : '')} />
              </div>
            ))}
            <div className='col-filler' />
          </div>
        </GanttBodyBase>
        <GanttBodyContent>
          {tasks.map((task, i) => {
            return (
              <GanttTask
                key={i}
                type={task.type}
                top={task.offsetY}
                width={task.fx - task.ix}
                limit={task.limit}
                left={task.ix}
                style={task.style}
                className={task.class}
                onClick={() => {
                  onTaskClick(task)
                }}
              />
            )
          })}
        </GanttBodyContent>
      </div>
    </GanttBodyContainer>
  )
}

export default GanttBody
