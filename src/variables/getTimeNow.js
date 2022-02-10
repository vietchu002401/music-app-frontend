export let getTimeNow = (time) => {
    let years = time.getFullYear()
    let month = time.getMonth()
    let days = time.getDate()
    let hours = time.getHours()
    let mins = time.getMinutes()
    let secs = time.getSeconds()
    return (years * 365 * 24 * 60 * 60 + month * 30 * 24 * 60 * 60 + days * 24 * 60 * 60 + hours * 60 * 60 + mins * 60 + secs)
}

export let timeAgo = (timeComment) => {
    let secAgo = getTimeNow(new Date()) - timeComment

    let render = (time) => {
        let min = (time - time%60) / 60
        let hour = (min - min%60) / 60
        let day = (hour - hour%24) / 24
        let month = (day - day%30) / 30
        let year = (month - month%12) / 12

        if(time < 60){
            return ("Just now")
        }
        else if (time > 60 && time < 3600) {
            return (min + " mins ago");
        }
        else if (time > 3600 && time < 86400) {
            return (hour + " hours ago");
        }
        else if (time > 86400 && time < 2592000) {
            return (day + " days ago");
        }
        else if (time > 2592000 && time < 31104000) {
            return (month + " months ago");
        }
        else if (time > 31104000) {
            return (year + " years ago");
        }
    }
    return render(secAgo)
}