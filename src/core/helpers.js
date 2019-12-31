const _months = {
  0: 'January',
  1: 'February',
  2: 'March',
  3: 'April',
  4: 'May',
  5: 'June',
  6: 'July',
  7: 'August',
  8: 'September',
  9: 'October',
  10: 'November',
  11: 'December'
}

export const vDate = date => {
  let obj = date
  if (typeof obj === 'string') {
    obj = new Date(date)
  }
  return {
    day: obj.getDate(),
    month: obj.getMonth(),
    year: obj.getFullYear(),
    wd: obj.getDay(),
    date: obj,
    sd: obj.toDateString()
  }
}

export const addDays = function (date, days) {
  var rDate = new Date(date.valueOf())
  rDate.setDate(rDate.getDate() + days)
  return rDate
}

export const distinctGroups = data => {
  return data.rows
    .reduce(
      (acc, r) => (acc.includes(r.group) ? acc : [].concat(acc, r.group)),
      []
    )
    .sort((a, b) => (a > b ? 1 : -1))
}

export const makeColumns = (groups, data) => {
  const to = vDate(data.to)
  let current = vDate(data.from)
  let index = 0
  // total de dias para cada mes 'month': size
  const m = {}
  // posição dos dias [] = { day, month, year, wd, sd, data }
  const d = []
  // para cada dia.. do from até to... 'token_do_dia_e_mes(sd)': position da coluna
  const s = {}

  while (current && current.date <= to.date) {
    if (!m[current.month]) {
      m[current.month] = 1
    } else {
      m[current.month]++
    }
    s[current.sd] = index
    d.push(current)
    current = vDate(addDays(current.date, 1))
    index++
  }

  return {
    month: Object.keys(m).map(key => ({
      name: _months[key],
      size: m[key]
    })),
    days: d,
    sign: s
  }
}

export const generateTaskClass = (taskIndex, parentTasksCount) => {
  switch (parentTasksCount) {
    case 1:
      return 'task'
    case 2:
      return taskIndex === 0 ? 'task-top' : 'task-bottom'
    default:
      return 'task-hidden'
  }
}

export const makeData = (groups, columns, input) => {
  const values = groups.map(group => {
    const rows = input.rows.filter(p => p.group === group)

    const data = rows.map(({ column, data }) => ({
      tableData: Object
        .values(column)
        .map(s => (typeof s === 'string') ? ({ name: s }) : s),
      data
    }))

    const tasks = rows.map((p, i) => {
      if (!p.tasks || p.tasks.length === 0) return []
      return p.tasks.map((t, it) => {
        const from = vDate(t.from)
        const to = vDate(t.to)
        const limit = p.data.limite
        return Object.assign({}, t, {
          ix: columns.sign[from.sd],
          fx: columns.sign[to.sd],
          y: i,
          data: p.column,
          limit,
          type: generateTaskClass(it, p.tasks.length)
        })
      })
    })

    return {
      group,
      data,
      tasks
    }
  })

  return values
}

export function calculate (input) {
  const groups = distinctGroups(input)
  const columns = makeColumns(groups, input)
  const data = makeData(groups, columns, input)
  return {
    columns: {
      month: columns.month,
      days: columns.days
    },
    data
  }
}
