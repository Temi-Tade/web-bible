async function getBooks(version) {
    fetch(`https://bolls.life/get-books/${version}/`)
    .then(res => res.json())
    .then(data => {
        console.log(data);
        for (let i = 0; i < 66; i++) {
            BOOKS.innerHTML += `<li><button onclick='listChapters(${data[i].chapters})'>${data[i].name}</button></li>`
            listChapters = (chps) => {
                for (let j = 0; j <= chps; j++) {
                    CHAPTERS.innerHTML += `<li><button>${j}</button></li>`
                }
            }
        }
    })
}

getBooks("KJV")