class Platform{
    constructor(x,y,blockWidth){
        this.x = x;
        this.y = y;
        this.blockWidth = blockWidth;
        this.plat = createSprite(this.x,this.y,50*this.blockWidth,50);
        this.plat.shapeColor = "blue";
        this.score = true;
        //platforms.push(this.plat)
    }
    setObjective(){
        this.plat.shapeColor = "yellow";
    }
    
}