nothings = "";
paint_my_love = "";
right_here = "";
baby = "";
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
leftElbowX = 0;
leftElbowY = 0;
rightElbowX = 0;
rightElbowY = 0;
scoreLW = 0;
scoreRW = 0;
scoreLE = 0;
scoreRE = 0;
song_status_n = "";
song_status_p = "";
song_status_r = "";
song_status_b = "";

function setup() {
    canvas = createCanvas(450 , 370);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video , modelLoaded);
    poseNet.on('pose' , gotPoses)
}
function draw() {
   image(img , 0 , 0, 450 , 400);
   image(video , 25 , 15, 400 , 320);  
   
   song_status_b = baby.isPlaying();
   song_status_r = right_here.isPlaying();
   song_status_p = paint_my_love.isPlaying();
   song_status_n = nothings.isPlaying();

   fill(255 , 0 , 0);
   stroke(255 , 0 , 0);

   if(scoreLW > 0.2) {
     circle(leftWristX  ,  leftWristY  ,  20);
     nothings.stop();
     baby.stop();
     right_here.stop();
      
    if(song_status_p == "false") {
      paint_my_love.play();
      document.getElementById("song_name").innerHTML =  "Song Name is PAINT MY LOVE";
    }
   }
   if(scoreRW > 0.2) {
    circle(rightWristX  ,  rightWristY  ,  20);
    paint_my_love.stop();
    baby.stop();
    right_here.stop();

    if(song_status_n == "false") {
        nothings.play();
        document.getElementById("song_name").innerHTML =  "Song Name is NOTHINGS GONNA CHANGE MY LOVE FOR YOU";
    }
   }
   if(scoreLE > 0.2) {
    circle(leftElbowX  ,  leftElbowY  ,  20);
    nothings.stop();
    baby.stop();
    paint_my_love.stop();
     
   if(song_status_r == "false") {
     right_here.play();
     document.getElementById("song_name").innerHTML =  "Song Name is RIGHT HERE WAITING FOR YOU";
   }
  }
  if(scoreRE > 0.2) {
   circle(rightElbowX  ,  rightElbowY  ,  20);
   paint_my_love.stop();
   nothings.stop();
   right_here.stop();

   if(song_status_b == "false") {
       baby.play();
       document.getElementById("song_name").innerHTML =  "Song Name is BABY";
   }
  }
}
function preload() {
   nothings = loadSound("Justin Bieber.mp3") ;
   paint_my_love = loadSound("NOTHING.mp3") ;
   right_here = loadSound("paint_my_love.mp3") ;
   baby = loadSound("right_here.mp3") ;
    img  = loadImage("https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcS6dkzQYnuyzlbg7vNZdXMDLakdEEnjcuuwBg&usqp=CAU");
}

function modelLoaded() {
   console.log("poseNet is initialized !")
}
function gotPoses(results) {
        if(results.length > 0) {
            console.log(results);

            leftWristX = results[0].pose.leftWrist.x;
            leftWristY = results[0].pose.leftWrist.y;
            rightWristX = results[0].pose.rightWrist.x;
            rightWristY = results[0].pose.rightWrist.y;
            leftElbowX = results[0].pose.leftElbow.x;
            leftElbowY = results[0].pose.leftElbow.y;
            rightElbowX = results[0].pose.rightElbow.x;
            rightElbowY = results[0].pose.rightElbow.y;
            scoreLW = results[0].pose.keypoints[9].score;
            scoreRW = results[0].pose.keypoints[10].score;
            scoreLE = results[0].pose.keypoints[7].score;
            scoreRE = results[0].pose.keypoints[8].score;

            console.log("leftWristX = "+leftWristX+"leftWristY = "+leftWristY);
            console.log("rightWristX = "+rightWristX+"rightWristY = "+rightWristY);
            console.log("leftElbowX = "+leftElbowX+"leftElbowY = "+leftElbowY);
            console.log("rightElbowX = "+rightElbowX+"rightElbowY = "+rightElbowY);
            console.log("Score of leftWrist = "+scoreLW+" Score of rightWrist = "+scoreRW);
            console.log("Score of leftElbow = "+scoreLE+" Score of rightElbow = "+scoreRE);
        }
}