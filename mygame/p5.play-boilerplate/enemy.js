class Enemy{
    constructor(x,y){
        this.x = x;
        this.y = y;
        this.enemy = createSprite(this.x,this.y, 100,100)
        this.enemy.shapeColor = "red";
        this.isGrounded;
        this.health = 100;
        this.bar = createSprite(this.x,this.y+20,this.health,5);
        this.bar.shapeColor = "purple";
    }
    active(bool){
        if(bool == true){
            if(player.x <= this.enemy.x){
                this.enemy.velocityX = -3.5;
                this.bar.velocityX = -3.5;
            }
            else{
                this.enemy.velocityX = 3.5;
                this.bar.velocityX = 3.5;
            }
        }
        else{
            this.enemy.velocityX = 0;
            this.bar.velocityX = 0;
        }
        rectMode(CORNER)
        this.bar.width = this.health;
        this.bar.x = this.enemy.x;
        this.bar.y = this.enemy.y -65;
        
    }
   
}