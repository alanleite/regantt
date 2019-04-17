import React from 'react'
import { render } from 'react-dom'
import styled from 'styled-components'
import { Gantt } from '../../lib/regantt'

const Container = styled.div`
    padding-top:40px;
    font-size: 12px;
`

const formatDate = date => {
  const d = new Date(date)
  return d.toLocaleDateString()
}

const data = {
  from: '2019-01-01',
  to: '2019-01-30',
  rows: [
    {
      group: 'Project A',
      column: {
        name: { name: 'Task 1', width: 240 },
        user: { name: 'Jonny', width: 150 },
        start: { name: formatDate('2019-01-03 05:00:00'), width: 100 },
        estimate: { name: formatDate('2019-01-10 05:00:00'), width: 100 }
      },
      // two tasks is splited in row
      tasks: [{
        from: new Date('2019-01-03 05:00:00'),
        to: new Date('2019-01-10 05:00:00'),
        title: 'Task 1'
      },
      {
        // you can pass some style props
        style: { backgroundColor: 'lightpink' },
        from: new Date('2019-01-05 05:00:00'),
        to: new Date('2019-01-11 05:00:00'),
        title: 'Task 1'
      }]
    },
    {
      group: 'Project A',
      column: {
        name: { name: 'Task 2', width: 240 },
        user: { name: 'Jonny', width: 150 },
        start: { name: formatDate('2019-01-11 05:00:00'), width: 100 },
        estimate: { name: formatDate('2019-01-15 05:00:00'), width: 100 }
      },
      // one tasks ocupate entire row
      tasks: [{
        from: new Date('2019-01-11 05:00:00'),
        to: new Date('2019-01-15 05:00:00'),
        title: 'Task 2'
      }]
    }
  ]
}

const App = () => (
  <Container>
    <Gantt
      data={data}
      onHeaderGroupClick={(a) => {
        console.log('onHeaderGroupClick', a)
      }}
      onHeaderTaskClick={(a, b, c) => {
        console.log('onHeaderTaskClick', { a, b, c })
      }}
      onTaskClick={(a) => {
        console.log('onTaskClick', a)
      }} />
  </Container>
)

render(<App />, document.getElementById('root'))
