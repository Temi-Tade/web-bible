const BOOKS = document.querySelector("#books-list")
const CHAPTERS = document.querySelector("#chapters-list")
const READING = document.querySelector("#bible-reading")
const MOD = document.querySelector("#modal")
const INFO = document.querySelector("#info")

sessionStorage.setItem("bible_url", JSON.stringify({
    version: "KJV",
    link: ""
}))