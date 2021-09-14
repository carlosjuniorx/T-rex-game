const dino = document.getElementById('dino')
const background = document.querySelector('.background')
const imageFundo = document.createElement('div') 
const end = document.createElement('h1')
let gameOver=false
let isJump = false
let position=0


const handleKeyUp = (event)=>{
    if(event){
        if(!isJump){
            jump()  
            isJump=true         
        }
    }
}

imageFundo.classList.add('backgroundImg')

document.querySelector('body').appendChild(imageFundo)


const jump = ()=>{
    let down = false
    dino.classList.remove('dino')
    dino.classList.add('dino2')

    let upInterval=setInterval(()=>{
        if(position >= 150){           
            down=true
        }else if(!down&& !gameOver){
            position +=20
            dino.style.bottom = position + 'px'
        }
        if(position==0){
            down=false
            clearInterval(upInterval)          
            dino.classList.remove('dino2')
            dino.classList.add('dino')  
            isJump=false    
        }
        if(down&&!gameOver){
            position-=20
            dino.style.bottom = position + 'px'
        }      
    },30)
}

const createCactus = ()=>{
    let randomTime = Math.random() * (3000-500)+500 
    
    const cactus = document.createElement('div')
    let cactusPosition = 1000
    cactus.classList.add('cactus')
    cactus.style.left = cactusPosition + 'px'
    background.appendChild(cactus)
    let leftMove = setInterval(()=>{    
        if(cactusPosition <= -60){
            clearInterval(leftMove)
            background.removeChild(cactus)
            return
        }else if(cactusPosition > 0 && cactusPosition < 50 && position < 60){
            gameOver=true
            dino.classList.remove('dino')
            dino.classList.add('dino3')
            clearInterval(leftMove)
            imageFundo.style.animation = 'none' 
            end.innerHTML = 'Game Over'
            document.body.appendChild(end)
            return
            
        }else if(!gameOver){
            cactusPosition-=10
            cactus.style.left = cactusPosition + 'px'           
        }
    },35)
    if(!gameOver)setTimeout(createCactus,randomTime)
    
}
createCactus()

document.addEventListener('keydown', handleKeyUp)
document.addEventListener('touchstart', handleKeyUp)
