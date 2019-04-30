import React from 'react'
import { Gantt } from '../../lib/regantt'

const formatDate = date => {
  const d = new Date(date)
  return d.toLocaleDateString()
}

const data = {
  from: '2019-01-01',
  to: '2019-04-30',
  rows: [
    {
      group: 'Project A',
      data: { message: 'Hellow!' },
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
    },
    {
      group: 'Project B',
      column: {
        name: { name: 'Task 3', width: 240 },
        user: { name: 'Kenny', width: 150 },
        start: { name: formatDate('2019-01-05 05:00:00'), width: 100 },
        estimate: { name: formatDate('2019-01-08 05:00:00'), width: 100 }
      },
      // one tasks ocupate entire row
      tasks: [{
        from: new Date('2019-01-05 05:00:00'),
        to: new Date('2019-01-08 05:00:00'),
        title: 'Task 2'
      }]
    }
  ]
}

const Example = () => (
  <Gantt
    data={data}
    onHeaderGroupClick={(groupName) => {
      console.log('onHeaderGroupClick', groupName)
    }}
    onHeaderTaskClick={(data) => {
      console.log('onHeaderTaskClick', data)
    }}
    onTaskClick={(a) => {
      console.log('onTaskClick', a)
    }} />
)

export default Example
