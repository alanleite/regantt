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
  cursor: pointer;
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
              onHeaderGroupClick(g.group)
            }}>
            {g.group}
          </GanttTreeGroupHeader>
          {g.data.map(({ tableData, data }, i) => (
            <GanttTreeGroupRow key={i}>
              {tableData.map((tableFields, i) => (
                <GanttTreeGroupCol
                  key={i}
                  style={{ width: tableFields.width || 150 }}
                  onClick={() => {
                    onHeaderTaskClick(data || null)
                  }}>
                  {tableFields.name}
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
