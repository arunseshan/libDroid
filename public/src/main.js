
import Compositor from './Compositor.js'
import {loadLevel} from './Loaders.js'
import {loadCharacterSprites, loadBackgroundSprites} from './Sprites.js'
import {createBackgroundLayer, createSpriteLayer} from './Layers.js'


const canvas = document.getElementById('gameCanvas')
const context = canvas.getContext("2d")

class Vector2D{
  constructor(x,y){
    this.x = x
    this.y = y
  }
}

Promise.all([
  loadCharacterSprites(),
  loadBackgroundSprites(),
  loadLevel('1-1')
])
.then(([ characterSprites, backgroundSprites, level])=>{
  const comp = new Compositor()
  const gravity = 0.5
  const backgroundLayer = createBackgroundLayer(level.backgrounds, backgroundSprites)
  comp.layers.push(backgroundLayer)

  const position = new Vector2D(64,180)

  const velocity = new Vector2D(2, -10)

  const spriteLayer = createSpriteLayer(characterSprites,position)
  comp.layers.push(spriteLayer)

  function update(){
    comp.draw(context)
    position.x += velocity.x
    position.y += velocity.y
    velocity.y += gravity
    requestAnimationFrame(update)
  }

  update()
  
})
