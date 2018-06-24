export default class Copmositor{
  constructor(){
    this.layers = []
  }

  draw(context){
    this.layers.forEach(layer=>{
      layer(context)
    })
  }
}
