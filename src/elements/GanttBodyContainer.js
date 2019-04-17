import styled from 'styled-components'

const GanttBodyContainer = styled.div`
  overflow: hidden;
  overflow-x: auto;
  position: absolute;
  left: 700px;
  top: 0;
  right: 0;
  bottom: -20px;
  border: 1px solid lightgray;
  > div {
    height: 100%;
  }
`

GanttBodyContainer.displayName = 'GanttBodyContainer'

export default GanttBodyContainer
