export let setTitle = (title)=>{
    window.scrollTo({
        top: 0,
        behavior: "instant"
    })
    document.title = title
}