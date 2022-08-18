<html>
 <head>
  <meta charset="utf-8">
  <title>Open Horse</title>
  <link rel="stylesheet" href="css/menu.css">
  <link rel="icon" type="image/x-icon" href="res/favicon.png">
  <style>
    .main {
      text-align: left;
      text-justify: inter-word;
      margin-right: 30%;
      margin-left: 30%;
    }
   
    .main h3{
      color: #ffbe3c;
    }
   
    .main h1{
      color: #c77aff;
    }
   
    .main h5{
      color: #ff788b;
    }
    /* . . . THE CANVAS MAIN PREVIEW . . .*/
    .preview{
     border-style: solid;
     border: 1px;
     border-radius: 2%; 
     background-color: #9d68bb;
     margin-left: 5%;
     margin-right: 5%;
     width: 70%;
     height: 40%;
    }
    /* . . . THE FIRST MAIN BUTTON . . . */
    .button{
     border: 2px;
     border-style: solid;
     border-radius: 2%; 
     border-color: #bf7a32;
     margin-left: 10%;
     margin-right: 10%;
     font-size: 17px;
    }
    
    .button:hover{
     background-color: #bf7a32;
    }

    .button a{
     color: #ffffff;
    }
    /*....................................*/
    /* . . . THE SECOND BUTTON . . . */
    .button1{
     border: 2px;
     border-style: solid;
     border-radius: 2%; 
     border-color: #ff6ea2;
     margin-left: 10%;
     margin-right: 10%;
     font-size: 17px;
    }
    
    .button1:hover{
     background-color: #ff6ea2;
    }

    .button1 a{
     color: #ffffff;
    }
    
    /* . . . THE PLAY BUTTON . . . */
    .playbutton{
     border: 2px;
     border-style: solid;
     border-radius: 2%; 
     border-color: #64e957;
     margin-left: 10%;
     margin-right: 10%;
     font-size: 17px;
    }
    
    .playbutton:hover{
     background-color: #64e957;
    }

    .playbutton a{
     color: #ffffff;
    }
    
    .main button{
     background-color: transparent;
     border: 0px;
     color: #ffffff;
     font-family: "Lucida Console", "Courier New", monospace;
     font-size: 17px;
    }
    /*.... TEXT BOX DESIGN GOES HERE ....*/
    .setname{
     background-color: #000000;
     color: #A0A0A0;
     border: 1px;
     border-color: #9c9c9c;
     margin-left: 10%;
     margin-right: 10%;
     font-size: 20px;
     border-radius: 2%; 
     width: 70%;
     height: 5%;
     margin-bottom: 0%;
    }
    /*.................................*/
  </style>
 </head>
 <body>
  <!-- THIS IS THE WEBSITE HEADER -->
  <div class="top_bar">
   <!--img src="res/logo.png" width=226px height=48px /img -->
   <a href="https://www.reddit.com/r/OpenHorse/">Forums</a>
   <a href="https://github.com/boniikawaiidesu/OpenHorse">Source code</a>
   <a href="https://discord.gg/ckx7MTKheU">Support</a>
   <a href="aboutus.php">About us</a>
  </div>
  <!-- CONTENT OF THE WEBSITE GOES HERE -->
  <div class="main"> 
   <center>
    <img src="res/logo.png" style="height:30%;width:110%;margin-left:-5%;"></img>
    <br><br>
    <!-- USE IT AS A TEMPLATE FOR THE BUTTONS -->
    <!-- THIS IS THE CUSTOM SERVER BUTTON -->
    <div class="button">
     <a href="https://github.com/boniikawaiidesu/OpenHorse">
      <img src="res/buttons/cust_server.png" style="width:32px;height:32px;"></img>
      Create a Custom Server!
     </a>
    </div>
    <br>
    <!-- ................................ -->
    <!-- THIS IS THE MAIN SERVER BUTTON -->
    <div class="button1">
     <a href="#">
      <img src="res/buttons/main_server.png" style="width:32px;height:32px;"></img>
      Teleport Main Server!
     </a>
    </div>
    <!-- ...... INITIALIZING THE FORM FOR PONY INPUT .. -->
    <form action="gameClient.php">
    <!-- ...... THIS IS THE PONY EDITOR SEGMENT ..... -->
     <br>
     <!-- GIVE A NAME TO YOUR PONY -->
     <input class="setname" type="text" value="insert your username here!"
      id="ponyname" name="ponyname"><br>
     <!-- PONY DRAWING PREVIEW -->
     <!-- PONY PREVIEW RESOURCES LOADING -->
      <img src="res/debug.png" id="PonyBody" hidden></img>
     <!-- .............................. -->
     <canvas class="preview" id="ponyEdit"></canvas>
     <script src="src/editor1.js"></script>
     <!-- .................... -->
     <br>
     <small><p style="color:#8f66a9">Notice, that this game is still in development
     errors might appear!</p></small>
     
    <!-- ............................................ -->
    <!-- THIS IS THE MAIN SERVER BUTTON -->
    <div class="playbutton">
     <button>
      <img src="res/buttons/play_button.png" style="width:32px;height:32px;"></img>
      <a>Play in Server!</a>
     </button>
    </div>
    <br>
    <!-- RULES FROM THE SERVER -->
    <h3>Server Rules [!]</h3>
    <p>
     <ul style="text-align:left;">
      <br><li>Be kind to other users</li>
      <br><li>Do not use scripts or hacks</li>
      <br><li>Ask before joining other people RP</li>
      <br><li>Do not encourage breaking the rules</li>
      <br><li>Read terms of use in case you make a new server</li>
     </ul>
    </p> 
    <br>
    <h5>Breaking the rules might result in permanent or temporal ban</h5>
    <!-- ................................ -->
   </center>
  </div>
  <!-- THIS IS THE WEBSITE FOOTER -->
  <div class="bottom_bar">
   <hr>
   <center><p style="color:#8f66a9">OpenHorse - 2022 By: BoniiKwiiDz & ClaraCF</p></center>
   <center><p style="color:#8f66a9">Version <b>0.1.12</b> 
   <u><a style="color:#8f66a9" href="changes.php">changelog</a></u></p></center>
  </div>
 </body>
</html>
