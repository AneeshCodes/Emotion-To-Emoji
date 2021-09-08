var p1 = "";
var p2 = "";

Webcam.set({
  width:  350,
  height: 300,
  image_format: 'png',
  png_quality: 90
});

var camera = document.getElementById('camera');

Webcam.attach('#camera');

function takesnapshot()
{
  Webcam.snap(function(data_uri){
    document.getElementById('result').innerHTML = '<img id="captured_image" src="' + data_uri + '">';
  })
}

console.log('ml5 version:',ml5.version);

classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/1ob50bhm4/model.json', modelLoaded);

function modelLoaded()
{
  console.log('model is loaded');
}

function speak()
{
  synth = window.SpeechSynthesis;
  sd1 = "The first prediction is " + p1;
  sd2 = "and the second prediction is " + p2;
  utterThis = new SpeechSynthesisUtterance(sd1 + sd2);
  synth.speak(utterThis);
}

function check()
{
  img = document.getElementById('captured_image');
  classifier.classify(img, gotResult);
}

function gotResult(error, results)
{
  if(error)
  {
    console.log(error);
  }
  else
  {
    console.log(results);
    p1 = results[0].label;
    p2 = results[1].label;
    document.getElementById('result_emotion_name').innerHTML = p1;
    document.getElementById('result_emotion_name2').innerHTML = p2; 
    

    if(p1 == "Happy")
    {
      document.getElementById('update_emoji').innerHTML = "&#128522";
    }
    if(p1 == "Crying")
    {
      document.getElementById('update_emoji').innerHTML = "&#128546";
    }
    if(p1 == "Angry")
    {
      document.getElementById('update_emoji').innerHTML = "&#128548";
    }
    if(p1 == "Interested")
    {
      document.getElementById('update_emoji').innerHTML = "&#129300";
    }

    if(p2 == "Happy")
    {
      document.getElementById('update_emoji2').innerHTML = "&#128522";
    }
    if(p2 == "Crying")
    {
      document.getElementById('update_emoji2').innerHTML = "&#128546";
    }
    if(p2 == "Angry")
    {
      document.getElementById('update_emoji2').innerHTML = "&#128548";
    }
    if(p2 == "Interested")
    {
      document.getElementById('update_emoji2').innerHTML = "&#129300";
    }

    speak()
  }
}