const CREATE_URL = (chp) => {
    let state = JSON.parse(sessionStorage.getItem("bible_url"))
    url = `https://bolls.life/get-chapter/${state.version}/${chp}/${state.chapter}/`
    state.link = url
    sessionStorage.setItem("bible_url", JSON.stringify(state))
    READING.innerHTML = "<div class='loader-con'><span class='fa-solid fa-spinner fa-spin loader'></span></div>"
    if (window.innerWidth <= 600) {
        BOOKS.style = "display: flex"
        BOOKS.innerHTML = "<div class='loader-con'><span class='fa-solid fa-spinner fa-spin loader'></span></div>"
    }
    document.querySelector("#c").innerHTML = chp
    fetch(url)
    .then(res => res.json())
    .then(data => {
        // console.log(data)
        READING.innerHTML = ""
        if (window.innerWidth <= 600) {
            BOOKS.innerHTML = ""
        }
        let arr = []
        let j = 0
        while (j < data.length) {
            arr.push(data)
            ++j
        }
        arr.forEach((val,ind) => {
            READING.innerHTML += `<p>${val[ind].verse} ${val[ind].text}</p><br>`
            if (window.innerWidth <= 600) {
                BOOKS.style = "display: block"
                BOOKS.innerHTML += `<p>${val[ind].verse} ${val[ind].text}</p><br>`
            }
        }); 
        // url = `https://bolls.life/get-chapter/KJV`
    })
}

const SEARCH_BOOKS = (param) => {
    [...BOOKS.querySelectorAll("li button")].forEach(val => {
        if (val.innerHTML.toLowerCase().includes(param.toLowerCase())) {
            val.style.display = "block"
        } else {
            val.style.display = "none"
        }
    });
    if ([...BOOKS.querySelectorAll("li button")].every(val => val.style.display === "none")) {
       document.querySelector("#searchinfo").innerHTML = "Verily, it was written that ye shall seek and ye shall find. Howbeit, I would have you know that on this day, thou has sought and not found ;)"
    }else{
        document.querySelector("#searchinfo").innerHTML = ""
    }
}

const CREATE_MODAL = (text) => {
    MOD.parentElement.style.display = "block"
    MOD.parentElement.animate({
        opacity: ["0", "1"]
    },
    {
        duration: 200
    })
    MOD.innerHTML = text
    window.onclick = (e) => {
        if (e.target === MOD.parentElement) {
            MOD.parentElement.animate({
                opacity: ["1", "0"]
            },
            {
                duration: 200
            })
            setTimeout(() => {
                MOD.parentElement.style.display = "none"
            }, 100)
        }
    }
}

const SETTINGS = () => {
    CREATE_MODAL(` 
        <h3>Settings</h3>
        <ul type="none" id="mod-list">
            <!--<li>
                <p class='opt'>Theme</p>
                <p class='val'>
                    <select>
                        <option value="Light">Light</option>
                        <option value="Dark">Dark</option>
                    </select>
                </p>
            </li>

            <li>
                <p class='opt'>Font</p>
                <p class='val'>
                    <select id='fonts'>
                        <option value="Gudea">Default</option>
                        <option value="Ubuntu" id="ubuntu">Ubuntu</option>
                        <option value="Kode Mono" id="kode-mono">Kode Mono</option>
                        <option value="Anta" id="anta">Anta</option>
                    </select>
                </p>
            </li>-->

            <li>
                <p class='opt'>Select Version</p>
                <p class='val'>
                    <select id='fonts' onchange='CHANGE_VERSION(this.value)'>
                        <option value="KJV">KJV</option>
                        <option value="NIV">NIV</option>
                        <option value="AMP">AMP</option>
                        <option value="ESV">ESV</option>
                        <option value="NLT">NLT</option>
                        <option value="MSG">MSG</option>
                    </select>
                </p>
            </li>
        </ul>
        <p><em>More features are coming in future releases!</em></p>
    `)
}

if (window.innerWidth <= 600) {
    INFO.onclick = () => {
        getBooks("KJV")
        INFO.innerHTML = `<span id="b">Book</span> <span id="c">Chapter</span>`
        document.querySelector(".search-wrap").style.display = "block"
        document.querySelector(".search-wrap input").value = ""
        BOOKS.style = "display: block"
    }
}

const CHANGE_VERSION = (ver) => {
    let state = JSON.parse(sessionStorage.getItem("bible_url"))
    state.version = ver
    sessionStorage.setItem("bible_url", JSON.stringify(state))
    if (state.link === "") {
        BOOKS.innerHTML = ""
        getBooks(state.version)
    } else {
        let newlink = state.link.replace(state.link.substring(31, 34), state.version)
        state.link = newlink
        sessionStorage.setItem("bible_url", JSON.stringify(state))
        fetch(`${state.link}`)
        .then(res => res.json())
        .then(data => {
            READING.innerHTML = ""
            if (window.innerWidth <= 600) {
                BOOKS.innerHTML = ""
            }
            let arr = []
            let j = 0
            while (j < data.length) {
                arr.push(data)
                ++j
            }
            arr.forEach((val,ind) => {
                READING.innerHTML += `<p>${val[ind].verse} ${val[ind].text}</p><br>`
                if (window.innerWidth <= 600) {
                    BOOKS.style = "display: block"
                    BOOKS.innerHTML += `<p>${val[ind].verse} ${val[ind].text}</p><br>`
                }
            }); 
            // url = `https://bolls.life/get-chapter/KJV`
        })
    }
}