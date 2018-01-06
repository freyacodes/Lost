import main from "../main.js"
import stage1 from "../stage1/stage1.js"
import stage2 from "../stage2/stage2.js"
import stage3 from "../stage3/stage3.js"
import stage4 from "../stage4/stage4.js"

const module = {};
const stages = [stage1, stage2, stage3, stage4];
let stageSelected = false;
const buttons = [];

module.run = function() {
  const canvas = document.getElementById("game");
  main.ui.alpha = 0;

  for (let i = 0; i < 4; i++) {
    const button = new createjs.Shape();

    //TODO: Art
    button.graphics.beginFill('brown').drawRoundRect(canvas.width/2 - 258, 300 + i*150, 512, 94, 5);
    main.ui.addChild(button);
    buttons.push(button);

    button.addEventListener("mousedown", function(event) {
      if (stageSelected) return; // Debounce
      stageSelected = true;
      onSelect(i);
    })
  }

  createjs.Tween.get(main.ui)
    .to({alpha: 1}, 500);

  // Fade in, move up
  buttons.forEach(button => {
    createjs.Tween.get(main.ui)
      .to({y: button.y - 25}, 500);
  })
};

function onSelect(stageId) {
  createjs.Tween.get(main.ui)
    .to({alpha: 0}, 500)
    .call(function () {
      stages[stageId].run();
    });

  // Fade out, move down
  buttons.forEach(button => {
    createjs.Tween.get(button)
      .to({y: button.y + 25}, 500);
  });
}

export default module;