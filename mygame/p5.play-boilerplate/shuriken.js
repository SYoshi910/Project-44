class Shuriken{
    constructor(){
        this.ken = createSprite(player.x,player.y,20,20);
        this.x = (camera.position.x - 800) + mouseX;
        this.y = mouseY;
        this.mover = 0.01 //1 
        this.playerX = player.x;
        this.playerY = player.y;
   
    }
    display(){
        this.ken.x = ((this.playerX + ((this.x - this.playerX)*this.mover)));
        this.ken.y = (this.playerY + ((this.y - this.playerY)*this.mover))
        this.mover += 0.01    
         //this.ken.x = player.x + this.moverX; //0 + 1
        //this.ken.y = player.y + this.moverY; //0 + 1
        //this.moverX += this.x / 50;
       // this.moverY -= this.y / 50; 
       console.log(this.x,this.y)
       
    }
}