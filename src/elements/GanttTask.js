import React from 'react'
import styled, { css } from 'styled-components'

const taskStyles = {
  task: css`
      height: 30px;
      ${p => printLimit(p.limit, 30)}
    `,
  'task-top': css`
      top: ${p => p.top + 'px'};
      ${p => printLimit(p.limit)}
    `,
  'task-bottom': css`
      top: ${p => p.top + 16 + 'px'};
      ${p => printLimit(p.limit)}
    `
}

const printLimit = (daysQtt, height = 14) => {
  if (daysQtt === undefined) return
  return css`
    &:after {
      content: '';
      position: absolute;
      right: ${daysQtt * -30}px;
      background-color: red;
      height: ${height}px;
      width: 2px;
    }
  `
}

const GanttTask = styled.div`
  position: absolute;
  background-color: lightblue;
  top: ${p => p.top + 'px'};
  height: 14px;
  width: ${p => p.width * 30 + 30 + 'px'};
  left: ${p => p.left * 30 + 'px'};
  ${p => taskStyles[p.type]};
`

GanttTask.displayName = 'GanttTask'

export default GanttTask
