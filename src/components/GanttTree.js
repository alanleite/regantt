import React from 'react'
import styled from 'styled-components'

const GanttTreeContent = styled.div`
  height: 100%;
  width: 100%;
  display: absolute;
`

const GanttTreeHeader = styled.div`
  height: 60px;
`

const GanttTreeGroupHeader = styled.div`
  height: 50px;
  display: flex;
  align-items: center;
  background-color: whitesmoke;
  padding-left: 8px;
  font-size: 16px;
  font-weight: bold;
`

const GanttTreeGroupRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  height: 48px;
  border-bottom: 1px solid lightgray;
`

const GanttTreeGroupCol = styled.div`
  display: flex;
  align-items: center;
  padding: 4px 8px;
`

const GanttTree = ({
  data = [],
  onHeaderGroupClick,
  onHeaderTaskClick
}) => {
  return (
    <GanttTreeContent>
      <GanttTreeHeader />
      {data.map((g, i) => (
        <div key={i}>
          <GanttTreeGroupHeader
            onClick={() => {
              onHeaderGroupClick(g)
            }}>
            {g.group}
          </GanttTreeGroupHeader>
          {g.data.map((r, i) => (
            <GanttTreeGroupRow key={i}>
              {r.map((c, i) => (
                <GanttTreeGroupCol
                  key={i}
                  style={{ width: c.width || 150 }}
                  onClick={() => {
                    onHeaderTaskClick(g, r, c)
                  }}>
                  {c.name}
                </GanttTreeGroupCol>
              ))}
            </GanttTreeGroupRow>
          ))}
        </div>
      ))}
    </GanttTreeContent>
  )
}

export default GanttTree
