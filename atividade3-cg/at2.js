var container;
var camera, controls, scene, renderer;
var count = 0;  

function init() {

  container = document.createElement('div');
  document.body.appendChild(container);

  var matrixGoal = new THREE.Matrix4();
  var matrixBall = new THREE.Matrix4();
  var bezierCurve;

  //Rotacao da bola no eixo y - TESTAR, FAZER A BOLA FICAR NO CHAO
  matrixBall.set(
    1, 0, 0, 0,
    0, 1, 0, 0,
    0, 0, 1, 0,
    0, 0, 0, 1
    );

  //Escala nas coordenadas x, y, z. Todas com 6.5
  matrixGoal.set(
    6.5, 0, 0, 0,
    0, 6.5, 0, 0,
    0, 0, 6.5, 0,
    0, 0, 0, 1
    );

  /* Visualizacao */
  var cameraMatrix = new THREE.Matrix4();
  //Mudar as coordenadas da camera, onde a posicao x = 300, y = 100, z = 600
  cameraMatrix.set(
    1, 0, 0, 300,
    0, 1, 0, 100,
    0, 0, 1, 600,
    0, 0, 0, 1
  );

  /* Camera */
  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 2000);
  camera.applyMatrix(cameraMatrix);

  camera2 = new THREE.PerspectiveCamera(100, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera2.position.set(-120, 0, -200);
  camera2.rotation.y += 500;

  /* Criacao do cenario */
  scene = new THREE.Scene(); //Aplicando o scene no objeto
  ambient = new THREE.AmbientLight(0xFFFFFFF, 1.0); //Iluminando o objeto
  scene.add(ambient);

  /* Colocando o caminho do objeto */
  ball = new THREE.Object3D();
  var mtlLoader = new THREE.MTLLoader();
  mtlLoader.load('images/Football.mtl', function(materials){
    materials.preload();  
    /* Carregando o Objeto */
    var objLoader = new THREE.OBJLoader();
    objLoader.setMaterials(materials);
    objLoader.load('images/Football.obj', function(object){
      //Seta o posicionamento do objeto
      object.position.set(0, 0, 0);
      ball.position.set(250,-20,450);
      //Uso do scale para aumentar o objeto em 2.5 nas tres coordenadas
      ball.scale.set(0.75, 0.75, 0.75);
      object.applyMatrix(matrixBall);
      object.updateMatrix();
      ball.add(object);
      });
    });
    //Adiciona a bola no cenario
    scene.add(ball);

  goal = new THREE.Object3D();
  mtlLoader.load('images/goal.mtl', function(materials){
    materials.preload();
    /* Carregando o Objeto */
    var objLoader = new THREE.OBJLoader();
    objLoader.setMaterials(materials);
    objLoader.load('images/goal.obj', function(object){
      //Seta o posicionamento do objeto
      object.position.set(0, 0, 0);
      object.applyMatrix(matrixGoal);
      object.updateMatrix();
      object.scale.set(2,2,2);
      goal.add(object);
    });
  });
  //Adiciona o gol no cenario
  goal.rotation.y += 500;
  scene.add(goal);

  ronaldo = new THREE.Object3D();
  mtlLoader.load('images/ronaldo.mtl', function(materials){
    materials.preload();      
    /* Carregando o Objeto */
    var objLoader = new THREE.OBJLoader();
    objLoader.setMaterials(materials);
    objLoader.load('images/ronaldo.obj', function(object){
      //Seta o posicionamento do objeto
      object.position.set(-50, 0, 0);
      object.scale.set(1, 1, 1);
      ronaldo.position.set(250,0,500);
      ronaldo.add(object);
    });
  });
      //O comando abaixo deixa o CR7 de Costa
      ronaldo.rotation.y += 500;
      scene.add(ronaldo);

  /* Renderizacao */
  renderer = new THREE.WebGLRenderer();
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor(new THREE.Color("green"));
  container.appendChild(renderer.domElement);

  /* Controles */
  controls = new THREE.OrbitControls(camera, renderer.domElement);

  /* Tratamento de redimensionamento de janela */
    window.addEventListener('resize', onWindowResize, false);
  }

  /* Movimento */
  document.addEventListener("keydown", onDocumentKeyDown, false);
  function onDocumentKeyDown(event) {
    var keyCode = event.which;
    var bezierCurve = new THREE.CubicBezierCurve3(
          new THREE.Vector3(250,-20,450),   //Starting point
          new THREE.Vector3(-200, 10, 350),    //First control point
          new THREE.Vector3(100, 0, 250),    //Second control point
          new THREE.Vector3(0, 0, 0)      //Ending point
        );

    var points = bezierCurve.getPoints(100);
    //pressionando a barra de espaço
    if (keyCode == 32){
      if (count <= 100){
        atualiza(points[count].x,points[count].y,points[count].z)
        count++;
      }else{
        count = 0;
      }
    }
  render();
  }

  function atualiza(x, y, z){
      ball.position.set(x,y,z); 
      render();      
  }

  function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  }

  function animate() {
    requestAnimationFrame(animate);
    controls.update();
    render();
  }
  
  function render() {
    var view;
    view = camera;
    ball.rotation.y += 0.05;
    renderer.render(scene, view);
  }