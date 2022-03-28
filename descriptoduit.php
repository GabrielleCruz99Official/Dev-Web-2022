
<?php
  
  // Username is root
  $user = 'root';
  $password = ''; 
    
  // Database name is gfg
  $database = 'devweb'; 
    
  // Server is localhost with
  // port number 3308
  $servername='localhost';
  $mysqli = new mysqli($servername, $user, $password, $database);
    
  // Checking for connections
  if ($mysqli->connect_error) {
      die('Connect Error (' . 
      $mysqli->connect_errno . ') '. 
      $mysqli->connect_error);
  }
    
  // SQL query to select data from database
  $sql = "SELECT * FROM products ";
  $result = $mysqli->query($sql);
  $mysqli->close(); 
  ?>
  
  
  
  <!DOCTYPE html>
  <html lang="en">
    
  <head>
      <meta charset="UTF-8">
      <head>
              <! -- récuperation du css -->
              <link rel="stylesheet" type="text/css" href="css\projet.css" />
        
              <! -- récuperation javascript -->
              <script type="text/javascript" src="js\projet.js"></script>
                <title>Sinusoïda</title>
                
            </head>
      
  
  </head>
  
  <body>
  <div id="en-tête">
  
  <div id="titre"> 
      Sinusoida
  </div>
  <div id="titresuite"> 
      <a href="produits.php">Produits</a>
    <a href="Magasins.html">Magasin</a>
    <a href="Register.html">S'enregistrer</a>    
  </div>
  </div>
      <section>
          
          <!-- TABLE CONSTRUCTION-->
          <table>
             
              <!-- PHP CODE TO FETCH DATA FROM ROWS-->
              <?php   // LOOP TILL END OF DATA 
                  while($rows=$result->fetch_assoc())
                  {
               ?>
               
              <tr onclick='produit("<?php echo $rows["product"];?>" )' >
                  <!--FETCHING DATA FROM EACH 
                      ROW OF EVERY COLUMN-->
                  <td><?php echo $rows['product'];?></td>
                  <td><?php echo $rows['description'];?></td>
                  <td><?php echo $rows['price'];?> €</td>
                  <td onclick="a()" >acheter</td>
                  
              </tr>
              <?php
                  }
               ?>
          </table>
      </section>
  </body>
    
  </html>
  
  
  
  <script>
  
  function a(){
      alert("zebi")
  }
  function produit(prod){
      console.log(prod)
  }
  </script>