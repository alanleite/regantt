import styled, { css } from 'styled-components'

const taskStyles = {
  task: css`
      height: 30px;
    `,
  'task-top': css`
      height: 14px;
      top: ${p => p.top + 'px'};
    `,
  'task-bottom': css`
      height: 14px;
      top: ${p => p.top + 16 + 'px'};
    `
}

const GanttTask = styled.div`
  position: absolute;
  background-color: lightblue;
  top: ${p => p.top + 'px'};
  width: ${p => p.width * 30 + 30 + 'px'};
  left: ${p => p.left * 30 + 'px'};
  ${p => taskStyles[p.type]};
`

GanttTask.displayName = 'GanttTask'

export default GanttTask
