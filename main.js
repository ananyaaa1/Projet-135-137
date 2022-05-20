objects = [];
video = "";
Status = "";

function preload()
{
    video = createVideo("video.mp4");
    video.hide();
}

function setup()
{
    canvas = createCanvas(480,380);
    canvas.center();
}

function draw()
{
    image(video,0,0,480,380);
    if(Status != "")
    {
        objectDetector.detect(video,gotResult);
        for(i=0 ; i< objects.length ; i++)
        {
            document.getElementById("status").innerHTML="Object Detected";
            document.getElementById("number_of_object").innerHTML="Number Of Objects" + objects.length;
            fill("red");
            percent= floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%" , objects[i].x + 15, objects[i].y + 15);

            noFill();
            stroke("red");
            rect(objects[i].x , objects[i].y , objects[i].width , objects[i].height);
        }  
    }
}

function gotResult(error,results)
{
    if(error)
    {
        console.log(error);
    }
    else
    {
        console.log(results);
        objects = results;
    }

}

function start()
{
    objectDetector = ml5.objectDetector("cocossd", modelLoaded);
    document.getElementById("status").innerHTML="Status = Object Detecting";
}

function modelLoaded()
{
    console.log("Model Loaded");
    Status = true;
    video.loop();
    video.speed(1);
    video.volume(0); 
}
