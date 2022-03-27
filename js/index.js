
let pg = 1

fetchMons(pg)
changeMon()

function fetchMons(pg) {
    fetch(`http://localhost:3000/monsters/?_limit=50&_page=${pg}`)
    .then(resp => resp.json())
    .then(monsters => {
    console.log(monsters)
    renderPage(monsters)
})

//1st Deliverable: Get first 50 monsters on the page with info
function renderPage(monsters) {
    const monCont = document.querySelector('#monster-container')
    monCont.textContent = ""
    monsters.forEach(monster => {
        console.log(monster)
        const monCard = document.createElement('div')
        const monName = document.createElement('h2')
        const monAge = document.createElement('h4')
        const monBio = document.createElement('p')

        monName.textContent = monster.name
        monAge.textContent = `Age: ${monster.age}` 
        monBio.textContent = `Bio: ${monster.description}`

        monCard.append(monName, monAge, monBio)
        monCont.append(monCard)
    })
}}


//2nd Deliverable: Create form to make new monster, when button is clicked, monster is added to API
const formDiv = document.querySelector('#create-monster')
const monForm = document.createElement('form')
    monForm.method = 'POST'
    monForm.action = "http://localhost:3000/monsters"
    const nameForm = document.createElement("input")
    nameForm.id = "name"
    nameForm.placeholder = "name..."
    const ageForm = document.createElement("input")
    ageForm.id = "age"
    ageForm.placeholder = "age..."
    const bioForm = document.createElement('input')
    bioForm.id = "description"
    bioForm.placeholder = 'description...'
    const formBttn = document.createElement('button')
    formBttn.textContent = "Create"
    monForm.append(nameForm, ageForm, bioForm, formBttn)

monForm.addEventListener('submit', e => {
    e.preventDefault()
    const newMon = {}
    newMon.name = nameForm.value,
    newMon.age = ageForm.value,
    newMon.description = bioForm.value
    monForm.reset()
    fetch('http://localhost:3000/monsters', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json', 
    },
    body: JSON.stringify(newMon)
})
})

formDiv.append(monForm)

//3rd Deliverable: Create button to load next 50 monsters and show them
function changeMon() {
    const nextPg = document.querySelector("#forward")
    const prevPg = document.querySelector("#back")

    nextPg.addEventListener("click", () => {
        pg++
        fetchMons(pg)
    })
    prevPg.addEventListener("click", () => {
        if (1 < pg) {
            pg--
        } else {
            alert("No more monsters!")
        }
        fetchMons(pg)
    })
}








