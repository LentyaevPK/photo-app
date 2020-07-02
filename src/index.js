import {albums, photos, fetchUsers} from './getContent'

let counter = 0
let currentPhotos = []
let currentAlbums = []

const input = document.querySelector('.album__filter')

input.addEventListener('input', () => {filterAlbums(currentAlbums)})

async function showUsers() {
    let users = await fetchUsers()
    let cont = document.querySelector('.user__container');
    users.forEach(user => {
        let btn = document.createElement('button')
        btn.innerHTML = `${user.name}`
        btn.addEventListener('click', () => {getCurrentAlbums(user.id)})
        cont.appendChild(btn)
    })
}

function getCurrentAlbums(userId) {
    currentAlbums = albums.filter(album => album.userId === userId)
    filterAlbums(currentAlbums)
}

function showPhotos(albumId) {
    counter = 0
    let cont = document.querySelector('.photo__container')
    cont.innerHTML = ''
    currentPhotos = photos.filter(photo => photo.albumId === albumId)
    showMore()
    createMoreButton()
}

function createMoreButton() {
    let btnCont = document.querySelector('.more-btn__cont')
    btnCont.innerHTML = ''
    let moreBtn = document.createElement('button')
    moreBtn.innerHTML = 'More'
    moreBtn.classList.add('more__btn')
    moreBtn.addEventListener('click', () => {showMore()})
    btnCont.appendChild(moreBtn)
}

function showMore() {
    let cont = document.querySelector('.photo__container')
    currentPhotos.forEach((photo, index) => {
        if(index + 1 >= counter + 1 && index + 1 <= counter + 10) {
            let imgHTML = `<img src="${photo.thumbnailUrl}">`
            cont.insertAdjacentHTML('beforeend', imgHTML)
        }
    })
    counter += 10
    if(counter >= currentPhotos.length) {
        let moreBtn = document.querySelector('.more-btn__cont')
        moreBtn.innerHTML = ''
    }
}

function filterAlbums(albums) {
    let albumCont = document.querySelector('.albums__container')
    albumCont.innerHTML = ''
    albums.forEach(album => {
        if(album.title.indexOf(input.value) !== -1) {
            let btn = document.createElement('button')
            btn.innerHTML = `${album.title}`
            btn.addEventListener('click', () => {showPhotos(album.id)})
            albumCont.appendChild(btn)
        }
    })
}


showUsers()
