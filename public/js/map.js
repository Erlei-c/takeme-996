function loadScript()
{
  var script = document.createElement("script");
  script.type = "text/javascript";
  script.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyDXiO1w8AvrtV7QirktKq_u4lLLe8CjX6s=false&callback=initialize";
  document.body.appendChild(script);
}
 
window.onload = loadScript;