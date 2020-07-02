let albums = []
let photos = []

async function fetchUsers() {
    let res = await fetch('https://jsonplaceholder.typicode.com/users')
    let data = await res.json()
    return data
} 

async function fetchAlbums() {
    let res = await fetch('https://jsonplaceholder.typicode.com/albums')
    albums = await res.json()
}

async function fetchPhotos() {
    let res = await fetch('https://jsonplaceholder.typicode.com/photos')
    photos = await res.json()
}

fetchAlbums()
fetchPhotos()

export { albums, photos, fetchUsers }