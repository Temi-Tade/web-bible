const CREATE_URL = (chp) => {
    url += `/${chp}/`
    let req = fetch(url)
    .then(res => res.json())
    .then(data => {
        // console.log(data)
        READING.innerHTML = ""
        let arr = []
        let j = 0
        while (j < data.length) {
            arr.push(data)
            ++j
        }
        arr.forEach((val,ind) => {
            READING.innerHTML += `<p>${val[ind].verse} ${val[ind].text}</p><br>`
        }); 
        url = `https://bolls.life/get-chapter/KJV`
    })
}