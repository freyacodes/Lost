import main from "../main.js"
import Ball from "../puzzle-cube/ball.js"
import Track from "../puzzle-cube/track.js"
import TrackGrid from "../puzzle-cube/track-grid.js"

const module = {};

module.run = function () {
	//Drag and drop example	
	var stage = main.stage;

	//TODO: Remove updates from event handlers if we move to a tick-based system instead of a reactive one
	var ball = new Ball(5, "red", {x: 500,  y: 200});

	var tracksContainer = new createjs.Container();	
	var gridSideOne = new TrackGrid();
	tracksContainer.addChild(gridSideOne.displayObject);


	stage.addChild(tracksContainer);
	stage.addChild(ball.displayObject);

	stage.update();

	//event listeners
	ball.displayObject.on("mousedown", function(event) {
		ball.held = true;
		console.log(`draggable has been picked up at x: ${ball.displayObject.x} y: ${ball.displayObject.y}`);
		stage.update();
	});
	
	ball.displayObject.on("pressmove", function(event) {
		if(gridSideOne.displayObject.hitTest(event.stageX, event.stageY) && ball.held) {
			event.target.x = event.stageX;
			event.target.y = event.stageY;		
		} else {
			ball.held = false;
		}
		//console.log(circle.x, circle.y);
		console.log(gridSideOne.displayObject.hitTest(ball.displayObject.x, ball.displayObject.y));
		stage.update();
	});
	
	ball.displayObject.on("pressup", function(event) {
		ball.held = false;
		stage.update();
	});
};

export default module;
