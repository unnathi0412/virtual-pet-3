class Food{

    constructor(){
        this.image = loadImage("images/Milk.png");
        this.lastFed;
        this.foodStock = 0;
    }

    updatefoodStock(foodStock){
        this.foodStock = foodStock;
    }

    getFedTime(lastFed){
        this.lastFed = lastFed;
    }

    deductFood(){
        if (this.foodStock > 0){
            this.foodStock = this.foodStock - 1;
        }     
    }

    getfoodStock(){
        return this.foodStock;
    }

    display(){
        background(46,139,87);

        fill(255,255,254);
        textSize(15);

        if(lastFed >= 12){
            text("Last Feed : 12 AM", 50,30);
        }

        var x = 80, y = 100;
        imageMode(CENTER);
        image(this.image,720,220,70,70);
        if(this.foodStock != 0){
            for(var i = 0; i < this.foodStock; i++){
                if(i %10 === 0){
                    x =80
                    y = y+50;
                }
                image(this.image, x, y, 50,50);
                x = x+30;
            }
        }
    }

    bedroom(){
        background(bedroom,550,500);
    }

    garden(){
        background(garden,550,500);
    }

    washroom(){
        background(washroom,550,500);
    }
}