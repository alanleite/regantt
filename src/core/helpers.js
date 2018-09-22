const _months = {
    0: 'Janeiro',
    1: 'Fevereiro',
    2: 'Março',
    3: 'Abril',
    4: 'Maio',
    5: 'Junho',
    6: 'Julho',
    7: 'Agosto',
    8: 'Setembro',
    9: 'Outubro',
    10: 'Novembro',
    11: 'Dezembro'
  }
  
  const vDate = (date) => {
    let obj =  date
    if(typeof obj === 'string'){
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
  
  const addDays = function(date, days) {
    var rDate = new Date(date.valueOf());
    rDate.setDate(rDate.getDate() + days);
    return rDate;
  }
  
  const distinctGroups = (data) => {
    return data.rows
      .reduce((acc, r) => (
      acc.includes(r.group)
        ? acc
        : [].concat(acc, r.group)
      ), [])
      .sort((a, b) => a > b ? 1 : -1)
  }
  
  const makeColumns = (groups, data) => {
    const to = vDate(data.to)
    let current = vDate(data.from)
    let index = 0
    const m = {}
    const d = []
    const s = {}
  
    while(current && current.date <= to.date) {
      if(!m[current.month]) {
        m[current.month] = 1
      } else {
        m[current.month]++
      }
      s[current.sd] = index
      d.push(current.day)
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
  
  const makeData = (groups, columns, data) => {
    const values = groups.map(group => {
      const rows = data.rows.filter(p => p.group === group)
      const rowData = rows
        .map(p => 
          Object.values(p.column).map(p => {
            if(typeof p === 'string') {
              return { name: p }
            }
            return p
          })
        )
  
      const tasks = rows
        .map((p, i) => {
          if(!p.tasks || p.tasks.length === 0) return []
          return p.tasks.map(t => {
            const from = vDate(t.from)
            const to = vDate(t.to)
            return Object.assign({}, t, {
              ix: columns.sign[from.sd],
              fx: columns.sign[to.sd],
              y: i
            })
          })
        })

      return {
        group,
        data: rowData,
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
        days: columns.days,
      },
      data
    }
  }