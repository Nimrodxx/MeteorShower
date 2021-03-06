﻿function createMeteor() {
    var randomX = Math.floor(Math.random() * 500) + 1;
    var meteor = new Meteor(stage, randomX, -100);
    objects.push(meteor);
};

var player = new Player(stage, 400, 265);
var objects: IDrawable[] = [];

createMeteor();

var spear = new Spear(stage, -100, 200);
objects.push(spear);

var fpsmeter = new (<any>window).FPSMeter();

requestAnimFrame(animate);
function animate() {
    // render the stage   
    renderer.render(stage);

    var animationAgeInMs = new Date().getTime();
    for (var i = 0; i < objects.length; i++) {
        var object = objects[i];
        if (!object.paint(animationAgeInMs) || player.colidesWith(object)) {
            objects.splice(i, 1);
            createMeteor();
        }
    }

    player.paint(animationAgeInMs);

    fpsmeter.tick();
    
    requestAnimFrame(animate);
}