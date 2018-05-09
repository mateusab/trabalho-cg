var container;
var camera, controls, scene, renderer;

    function init() {

      container = document.createElement('div');
      document.body.appendChild(container);

      var matrixGoal = new THREE.Matrix4();
      var matrixBall = new THREE.Matrix4();

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


      /* Criacao do cenario */
      scene = new THREE.Scene(); //Aplicando o scene no objeto
      ambient = new THREE.AmbientLight(0xFFFFFFF, 1.0); //Iluminando o objeto
      scene.add(ambient);


      /* Colocando o caminho do objeto */
      ball = new THREE.Object3D();
      var mtlLoader = new THREE.MTLLoader();
      mtlLoader.load('images/Football.mtl', function(materials){
      materials.preload();
        
        /* Careegando o Objeto */
      	var objLoader = new THREE.OBJLoader();
       	objLoader.setMaterials(materials);
      	objLoader.load('images/Football.obj', function(object){
        //Seta o posicionamento do objeto
        object.position.set(0, 0, 0);
        //Uso do scale para aumentar o objeto em 2.5 nas tres coordenadas
        object.scale.set(2.5, 2.5, 2.5);
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
          
          /* Careegando o Objeto */
        var objLoader = new THREE.OBJLoader();
          objLoader.setMaterials(materials);
          objLoader.load('images/goal.obj', function(object){
          //Seta o posicionamento do objeto
          object.position.set(0, 0, 0);
          object.applyMatrix(matrixGoal);
          object.updateMatrix();
          goal.add(object);
          });
        });
        //Adiciona a bola no cenario
        //goal.rotation.x += 50.2;
        goal.rotation.y += 500;
        //goal.rotation.x += 50;
        scene.add(goal);

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
      //Comandos para fazer a rotacao da bola
      //ball.rotation.x += 0.01;
      ball.rotation.y += 0.05;
      //ball.rotation.z += 0.02
      renderer.render(scene, camera);
    }
