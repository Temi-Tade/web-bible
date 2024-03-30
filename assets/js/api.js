let url = ``
document.querySelector("#search_books").disabled = true

async function getBooks() {
    let state = JSON.parse(sessionStorage.getItem("bible_url"))
    if (window.innerWidth <= 600) {
        BOOKS.innerHTML = ""
    }
    fetch(`https://bolls.life/get-books/${state.version}/`)
    .then(res => res.json())
    .then(data => {
        // console.log(data);
        for (let i = 0; i < 66; i++) {
            BOOKS.innerHTML += `<li><button onclick='listChapters(${data[i].chapters}, this.innerHTML, ${i + 1})'>${data[i].name}</button></li>`
            document.querySelector("#search_books").disabled = false
            listChapters = (chps, name, ind) => {
                if (window.innerWidth <= 600) {
                    document.querySelector(".search-wrap").style.display = "none"
                }
                url = `https://bolls.life/get-chapter/${state.version}/${ind}`
                state.link = url
                sessionStorage.setItem("bible_url", JSON.stringify(state))
                document.querySelector("#chapter-name").innerHTML = name
                document.querySelector("#b").innerHTML = name
                document.querySelector("#c").innerHTML = ""
                CHAPTERS.innerHTML = ""
                if (window.innerWidth <= 600) {
                    BOOKS.innerHTML = ""
                    BOOKS.style = "display: grid; grid-template-columns: 1fr 1fr 1fr;"
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
                        BOOKS.innerHTML += `<li><button onclick='CREATE_URL(this.innerHTML)'>${val}</button></li>`;
                        [...BOOKS.querySelectorAll("li button")].forEach(val => {
                            val.style = "text-align: center; padding: .5rem; font-size: 1.25rem"
                        })
                    }
                })
            }
        }
    })
}

getBooks()

//settings: version, font, search, random, verse of the day
// bookmarks
// bot
//contextmenu
//quick search
//compare