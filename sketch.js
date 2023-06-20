let image_detect;
function preload() {
  image_detect = loadImage("https://i.postimg.cc/J0t1qQtb/icons8-square-480-1.png");
}
function setup() {
  canvas = createCanvas(700,700 );
  canvas.center();
  video = createCapture(VIDEO);
  video.size(width, height);
  video.hide();

  poseNet = ml5.poseNet(video, modelLoaded);
  poseNet.on("pose", gotPoses);
}
function draw() {
  image(video, 0, 0, width, height);
  if (image_detect) {
    image(image_detect, part1_x - 100, part1_y - 100, 200, 200);
    // image(image_detect, part2_x - 25, part2_y - 25, 50, 50);
  }

}
var part1_x;
var part1_y;
var part2_y;
var part2_x;

function gotPoses(results) {
  if (results.length > 0) {
    if (results[0].pose.nose.confidence > 0.80) {
      //console.log("Great accuracy");
      // part2_x = results[0].pose.leftWrist.x;
      // part2_y = results[0].pose.leftWrist.y;
      part1_x = results[0].pose.nose.x;
      part1_y = results[0].pose.nose.y;
      image_detect = loadImage("https://i.postimg.cc/J0t1qQtb/icons8-square-480-1.png");

    }
    else {
     // console.log("less accuracy");
      image_detect = null;
    }

    // nose_xx = results[0].pose.leftWrist.x;
    // nose_yy = results[0].pose.leftWrist.y;
  }
}

function modelLoaded() {
  console.log("Pose net is initialized");
}

function take_snapshot() {
  save("image.png");
}

