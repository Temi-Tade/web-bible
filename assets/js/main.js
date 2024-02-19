const BOOKS = document.querySelector("#books-list")
const CHAPTERS = document.querySelector("#chapters-list")
const READING = document.querySelector("#bible-reading")

const SEARCH_BOOKS = (param) => {
    [...BOOKS.querySelectorAll("li button")].forEach(val => {
        if (val.innerHTML.toLowerCase().includes(param)) {
            val.style.display = "block"
        } else {
            val.style.display = "none"
        }
    })
}