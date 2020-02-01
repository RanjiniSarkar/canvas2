var database
var drawing=[];
var currentPath = [];
var isDrawing =false
var path
var saveButton


function setup() {
  canvas=createCanvas(400,400);
  canvas.mousePressed(startPath);
  canvas.parent('canvascontainer');
 canvas.mouseReleased(endPath);
 saveButton = select('#saveButton')
 saveButton.mousePressed(saveDrawing)
 
 database = firebase.database(); 
 input = createInput('Name');
 button = createButton('Play');

}

function startPath(){
  isDrawing = true
  currentPath = [];
  drawing.push(currentPath);
}
function endPath(){
  isDrawing = false
  

}
function draw() {
  background("black"); 
  fill("white");
  textSize(18);
  text("CANVAS",150,50)
  input.position(200,200);
  button.position(200,300);
  button.mousePressed(()=>{
  input.hide();
  button.hide();
   


  });
  
  if(isDrawing){
  var point = {
    x : mouseX,
    y : mouseY
  }

    currentPath.push(point)

  }
 
  stroke("white")
  strokeWeight(4);
  noFill();
  for(var i = 0; i < drawing.length; i++){
    path = drawing[i];
    beginShape();
  
  for(var j = 0; j< path.length; j++){
    vertex(path[j].x,path[j].y)
  }
  endShape();

}
}

function saveDrawing(){
  var ref = database.ref('drawings');
  var data = {
    name : "Code",
    drawing: drawing
  }

  var result = ref.push(data,dataSent);
  console.log(result.key)
ref.push(data,dataSent);
function dataSent( err,status){
  console.log(status);
}


}


