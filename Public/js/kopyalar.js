
var bars = document.getElementById('bars')
var smallNav= document.getElementById('small-nav')
var MobilNavOff = document.getElementById('MobilNavOff')

var x = true
// bars.addEventListener('click',()=>{
    
//     if(x){
//         smallNav.style.transform = ' translateY(10%)'
//         x = false
//     }
//     else{  
//         smallNav.style.transform  = ' translateY(-100%)'
//         x = true
//     }


// })
window.addEventListener('resize',()=>{
    if(window.innerWidth > 1200){
        smallNav.style.transform  = ' translateY(-100%)'
        x = true
    }
})

window.addEventListener('click',()=>{
    if(!smallNav.contains(event.target) && !bars.contains(event.target)){
        smallNav.style.transform  = ' translateY(-100%)'
        x = true
    }
})

MobilNavOff.addEventListener('click',()=>{
    smallNav.style.transform  = ' translateY(-100%)'
    x = true
})

let imgBo = document.getElementsByClassName('hbBoxImg')

let funcbox = ()=>{
    let x = window.innerWidth
    if (x < 768) {
        document.getElementsByClassName('resimkutu')[0].style.height = '300px'
        for (let i = 0; i < imgBo.length; i++) {
            imgBo[i].style.height = '300px'

        }
    }
    if (x > 768 && x < 1200) {
        document.getElementsByClassName('resimkutu')[0].style.height = '160px'
        for (let i = 0; i < imgBo.length; i++) {
            imgBo[i].style.height = '160px'
        }

    }
    if (x > 1200 && x < 1400) {
        document.getElementsByClassName('resimkutu')[0].style.height = '200px'
        for (let i = 0; i < imgBo.length; i++) {
            imgBo[i].style.height = '200px'
        }

    }
    if (x > 1400) {
        document.getElementsByClassName('resimkutu')[0].style.height = '220px'
        for (let i = 0; i < imgBo.length; i++) {
            imgBo[i].style.height = '220px'
        }

    }
}

funcbox()
window.addEventListener('resize', funcbox)