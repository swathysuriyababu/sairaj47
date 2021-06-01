class Game{
  constructor(){

  }
getState(){
    var gameStateRef=database.ref('gameState');
    gameStateRef.on("value",function(data){
        gameState=data.val();

    })    
}

update(state){
    database.ref('/').update({
        gameState:state
    });
    
}
async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }
   
    fighter1 = createSprite (200,500,30,30);
    fighter1.addAnimation('fighter1',fighter1Img);
    fighter1.scale = 4;
    
    fighter2 = createSprite (670,500,50,50);
    fighter2.addAnimation('fighter1',fighter2Img);

    healthBar1 = createSprite(670,40,200,20);
    healthBar1.shapeColor='green';
    healthBar2=createSprite(200,40,200,20);
    healthBar2.shapeColor='green';
    healthbar=[healthBar1,healthBar2];
    fighter2.scale = 5.3;
    
    fighter = [fighter1,fighter2];

  fighterImages=[fighter1PunchImg,fighter2PunchImg];
  fImg=[fighter1Img,fighter2Img];

}
play(){
    form.hide();
    Player.getPlayerInfo();

    background(backgroundImg);
   
      var index = 0;
       //x and y position of the cars
     var x = 100 ;
     var y = 100;
      //var y;

      for(var plr in allPlayers){
        
        index = index + 1 ;
        x = 500 - allPlayers[plr].distance;
        y = 600;

       fighter[index-1].x=x;
       fighter[index-1].y=y;
  
      healthbar[index-1].width=allPlayers[plr].width;
       

        if (index === player.index){
          if (keyDown('LEFT_ARROW')){
            player.distance+=10;  
            player.update();
          }
          if (keyDown('RIGHT_ARROW')){
            player.distance-=10;  
            player.update();
          }
          if (keyWentDown('p') ){
            if(player.isTouching1(fighter1,fighter2)){

            fighter[index-1].addAnimation('fighter1',fighterImages[index-1]);
             player.punch++;
             player.health--;
           player.width-=5;
             player.update();
            }         
          }
          if(keyWentUp('p')){
            fighter[index-1].addAnimation('fighter1',fImg[index-1]);
          }   
        } 

      }
        
      
       
  
      
       
    drawSprites();
} 
}