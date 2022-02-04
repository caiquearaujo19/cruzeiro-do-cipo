export const orderListByGoals = (a, b) => {
    let year = sessionStorage.getItem('year')
    if(a[year] && b[year]) {
        if(a[year].goals < b[year].goals) {return 1}
        if(b[year].goals < a[year].goals) {return -1}
    }
    return 0
}

export const orderListByAssists = (a, b) => {
    let year = sessionStorage.getItem('year')
    if(a[year] && b[year]) {
        if(a[year].assists < b[year].assists) {return 1}
        if(b[year].assists < a[year].assists) {return -1}
    }
    return 0
}

export const orderListByCleanSheets = (a, b) => {
    let year = sessionStorage.getItem('year')
    if(a[year] && b[year]) {
        if(a[year].goalkeeper.cleanSheets < b[year].goalkeeper.cleanSheets) {return 1}
        if(b[year].goalkeeper.cleanSheets < a[year].goalkeeper.cleanSheets) {return -1}
        return orderKeepersByMatches(a, b)
    }
    return 0
}

const orderKeepersByMatches = (a, b) => {
    let year = sessionStorage.getItem('year')
    if(a[year].goalkeeper.matches < b[year].goalkeeper.macthes) {return 1}
    if(b[year].goalkeeper.matches < a[year].goalkeeper.matches) {return -1}
    return 0
}