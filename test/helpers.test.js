import {
  vDate,
  addDays,
  distinctGroups,
  makeColumns,
  generateTaskClass,
  makeData
} from '../src/core/helpers'

test('Should convert a date to useful parameters', () => {
  const date = new Date('2020-05-01T10:00:00.000Z')
  const result = vDate(date)
  expect(result.day).toBe(1)
  expect(result.month).toBe(4)
  expect(result.year).toBe(2020)
  expect(result.wd).toBe(5)
  expect(result.sd).toBe('Fri May 01 2020')
  expect(result.date).toBe(date)
})

test('Should convert a text date to useful parameters', () => {
  const date = '2020-05-01T10:00:00.000Z'
  const result = vDate(date)
  expect(result.day).toBe(1)
  expect(result.month).toBe(4)
  expect(result.year).toBe(2020)
  expect(result.wd).toBe(5)
  expect(result.sd).toBe('Fri May 01 2020')
  expect(result.date.toString())
    .toBe((new Date(date)).toString())
})

test('Should clone a date and add days', () => {
  const date = new Date('2020-05-01T10:00:00.000Z')
  const result = addDays(date, 5)
  expect(result.toISOString()).toBe('2020-05-06T10:00:00.000Z')
})

test('Should distinct and sort by rows.group', () => {
  const data = {
    rows: [
      { group: 'Group A' },
      { group: 'Group C' },
      { group: 'Group A' },
      { group: 'Group B' },
      { group: 'Group C' },
      { group: 'Group B' },
      { group: 'Group E' }
    ]
  }
  const result = distinctGroups(data)
  expect(result.length).toBe(4)
  expect(result[0]).toBe('Group A')
  expect(result[1]).toBe('Group B')
  expect(result[2]).toBe('Group C')
  expect(result[3]).toBe('Group E')
})

test('Should create period props to help building UI', () => {
  const groups = [ 'Group A', 'Group B', 'Group C' ]
  const data = {
    from: '2020-05-01T10:00:00.000Z',
    to: '2020-08-20T10:00:00.000Z'
  }
  const result = makeColumns(groups, data)
  expect(result.month.length).toBe(4)
  expect(result.month[0].name).toBe('May')
  expect(result.month[0].size).toBe(31)
  expect(result.month[1].name).toBe('June')
  expect(result.month[1].size).toBe(30)
  expect(result.month[2].name).toBe('July')
  expect(result.month[2].size).toBe(31)
  expect(result.month[3].name).toBe('August')
  expect(result.month[3].size).toBe(20)
  expect(result.days.length).toBe(112)
  expect(result.days[0].day).toBe(1)
  expect(result.days[1].day).toBe(2)
  expect(result.days[6].day).toBe(7)
  expect(result.days[31].day).toBe(1)
  expect(Object.keys(result.sign).length).toBe(112)
  expect(result.sign['Fri May 01 2020']).toBe(0)
  expect(result.sign['Sat May 02 2020']).toBe(1)
  expect(result.sign['Sun May 03 2020']).toBe(2)
  expect(result.sign['Mon Jun 01 2020']).toBe(31)
  expect(result.sign['Tue Jun 02 2020']).toBe(32)
  expect(result.sign['Thu Aug 20 2020']).toBe(111)
})

test('Should get css class for only task', () => {
  // if has only one task for the row
  const result = generateTaskClass(0, 1)
  expect(result).toBe('task')
})

test('Should get css class first task of two', () => {
  const result = generateTaskClass(0, 2)
  expect(result).toBe('task-top')
})

test('Should get css class second task of two', () => {
  const result = generateTaskClass(1, 2)
  expect(result).toBe('task-bottom')
})

test('Should get css class for undefined task count', () => {
  const result = generateTaskClass(1, 3)
  expect(result).toBe('task-hidden')
})

test('Make data', () => {
  const groups = [ 'Group A', 'Group B', 'Group C' ]

  const data = {
    from: '2020-05-01T10:00:00.000Z',
    to: '2020-05-20T10:00:00.000Z',
    rows: [
      {
        column: 'Group A',
        data: { message: 'hello!' }
      }
    ]
  }

  const columns = {
    month: [ { name: 'May', size: 20 } ],
    days: [
      { day: 1,
        month: 4,
        year: 2020,
        wd: 5,
        date: '2020-05-01T10:00:00.000Z',
        sd: 'Fri May 01 2020' },
      { day: 2,
        month: 4,
        year: 2020,
        wd: 6,
        date: '2020-05-02T10:00:00.000Z',
        sd: 'Sat May 02 2020' },
      { day: 3,
        month: 4,
        year: 2020,
        wd: 0,
        date: '2020-05-03T10:00:00.000Z',
        sd: 'Sun May 03 2020' },
      { day: 4,
        month: 4,
        year: 2020,
        wd: 1,
        date: '2020-05-04T10:00:00.000Z',
        sd: 'Mon May 04 2020' },
      { day: 5,
        month: 4,
        year: 2020,
        wd: 2,
        date: '2020-05-05T10:00:00.000Z',
        sd: 'Tue May 05 2020' },
      { day: 6,
        month: 4,
        year: 2020,
        wd: 3,
        date: '2020-05-06T10:00:00.000Z',
        sd: 'Wed May 06 2020' },
      { day: 7,
        month: 4,
        year: 2020,
        wd: 4,
        date: '2020-05-07T10:00:00.000Z',
        sd: 'Thu May 07 2020' },
      { day: 8,
        month: 4,
        year: 2020,
        wd: 5,
        date: '2020-05-08T10:00:00.000Z',
        sd: 'Fri May 08 2020' },
      { day: 9,
        month: 4,
        year: 2020,
        wd: 6,
        date: '2020-05-09T10:00:00.000Z',
        sd: 'Sat May 09 2020' },
      { day: 10,
        month: 4,
        year: 2020,
        wd: 0,
        date: '2020-05-10T10:00:00.000Z',
        sd: 'Sun May 10 2020' },
      { day: 11,
        month: 4,
        year: 2020,
        wd: 1,
        date: '2020-05-11T10:00:00.000Z',
        sd: 'Mon May 11 2020' },
      { day: 12,
        month: 4,
        year: 2020,
        wd: 2,
        date: '2020-05-12T10:00:00.000Z',
        sd: 'Tue May 12 2020' },
      { day: 13,
        month: 4,
        year: 2020,
        wd: 3,
        date: '2020-05-13T10:00:00.000Z',
        sd: 'Wed May 13 2020' },
      { day: 14,
        month: 4,
        year: 2020,
        wd: 4,
        date: '2020-05-14T10:00:00.000Z',
        sd: 'Thu May 14 2020' },
      { day: 15,
        month: 4,
        year: 2020,
        wd: 5,
        date: '2020-05-15T10:00:00.000Z',
        sd: 'Fri May 15 2020' },
      { day: 16,
        month: 4,
        year: 2020,
        wd: 6,
        date: '2020-05-16T10:00:00.000Z',
        sd: 'Sat May 16 2020' },
      { day: 17,
        month: 4,
        year: 2020,
        wd: 0,
        date: '2020-05-17T10:00:00.000Z',
        sd: 'Sun May 17 2020' },
      { day: 18,
        month: 4,
        year: 2020,
        wd: 1,
        date: '2020-05-18T10:00:00.000Z',
        sd: 'Mon May 18 2020' },
      { day: 19,
        month: 4,
        year: 2020,
        wd: 2,
        date: '2020-05-19T10:00:00.000Z',
        sd: 'Tue May 19 2020' },
      { day: 20,
        month: 4,
        year: 2020,
        wd: 3,
        date: '2020-05-20T10:00:00.000Z',
        sd: 'Wed May 20 2020' }
    ],
    sign: { 'Fri May 01 2020': 0,
      'Sat May 02 2020': 1,
      'Sun May 03 2020': 2,
      'Mon May 04 2020': 3,
      'Tue May 05 2020': 4,
      'Wed May 06 2020': 5,
      'Thu May 07 2020': 6,
      'Fri May 08 2020': 7,
      'Sat May 09 2020': 8,
      'Sun May 10 2020': 9,
      'Mon May 11 2020': 10,
      'Tue May 12 2020': 11,
      'Wed May 13 2020': 12,
      'Thu May 14 2020': 13,
      'Fri May 15 2020': 14,
      'Sat May 16 2020': 15,
      'Sun May 17 2020': 16,
      'Mon May 18 2020': 17,
      'Tue May 19 2020': 18,
      'Wed May 20 2020': 19
    }
  }

  const result = makeData(groups, columns, data)

  console.log(result)
})
