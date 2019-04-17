import styled from 'styled-components'

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
  .grid .col .period.nowork {
    background-color: floralwhite;
    z-index: 1;
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

GanttBodyBase.displayName = 'GanttBodyBase'

export default GanttBodyBase
