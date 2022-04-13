const vid = document.querySelector('#video')

const deleteBtn = document.querySelector('#deleteButton')

const likeBtn = document.querySelector('#like')

let vidPos = vid.getBoundingClientRect()
let delPos = deleteBtn.getBoundingClientRect()


changePos(deleteBtn, vidPos.left, vidPos.bottom)
changePos(likeBtn, vidPos.right - 55, vidPos.bottom)

function changePos (el, x, y){
    el.style.position = 'absolute';
    el.style.left = x + 'px'
    el.style.top = y + 'px'
}

console.log(vidPos.top, vidPos.bottom, vidPos.right, vidPos.left)

console.log(delPos.top, delPos.bottom, delPos.right, delPos.left)