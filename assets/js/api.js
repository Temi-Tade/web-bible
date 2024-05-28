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
        	if (i === 0) {
        		BOOKS.innerHTML += '<h3 class="testament">Old Testament</h3>'
        	}
        	if (i === 39){
        		BOOKS.innerHTML += '<h3 class="testament">new testament</h3>'
        	}
            BOOKS.innerHTML += `<li><button onclick='listChapters(${data[i].chapters}, this.innerHTML, ${i + 1})'>${data[i].name}</button></li>`
            document.querySelector("#search_books").disabled = false
            listChapters = (chps, name, ind) => {
                if (window.innerWidth <= 600) {
                    document.querySelector(".search-wrap").style.display = "none"
                }
                url = `https://bolls.life/get-chapter/${state.version}/${ind}`
                state.chapter = ind
                state.link = url
                sessionStorage.setItem("bible_url", JSON.stringify(state))
                document.querySelector("#chapter-name").innerHTML = name
                document.querySelector("#b").innerHTML = name
                document.querySelector("#c").innerHTML = window.innerWidth <= 600 ? "" + '  <i class="fa-solid fa-caret-down"></i>' : ""
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
                            val.style = "text-align: center; padding: .75rem; font-size: 1.5rem; width: 5rem; margin-top: 1rem"
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
//share