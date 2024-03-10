let url = `https://bolls.life/get-chapter/KJV`

async function getBooks(version) {
    if (window.innerWidth <= 600) {
        BOOKS.innerHTML = ""
    }
    fetch(`https://bolls.life/get-books/${version}/`)
    .then(res => res.json())
    .then(data => {
        // console.log(data);
        for (let i = 0; i < 66; i++) {
            BOOKS.innerHTML += `<li><button onclick='listChapters(${data[i].chapters}, this.innerHTML, ${i + 1})'>${data[i].name}</button></li>`
            listChapters = (chps, name, ind) => {
                document.querySelector(".search-wrap").style.display = "none"
                url += `/${ind}`
                document.querySelector("#chapter-name").innerHTML = name
                document.querySelector("#b").innerHTML = name
                document.querySelector("#c").innerHTML = ""
                CHAPTERS.innerHTML = ""
                if (window.innerWidth <= 600) {
                    BOOKS.innerHTML = ""
                }
                let arr = []
                let j = 1
                while (j <= chps) {
                    arr.push(j)
                    ++j
                }
                arr.forEach(val => {
                    CHAPTERS.innerHTML += `<li><button onclick='CREATE_URL(this.innerHTML)'>${val}</button></li>`
                    if (window.innerWidth <= 600) {
                        BOOKS.innerHTML += `<li><button onclick='CREATE_URL(this.innerHTML)'>${val}</button></li>`
                    }
                })
            }
        }
    })
}

getBooks("KJV")

//settings: version, font, search, random, verse of the day
// bookmarks
// bot
//contextmenu