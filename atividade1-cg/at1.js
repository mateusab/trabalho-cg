var container;
var camera, controls, scene, renderer;

    function init() {

      container = document.createElement('div');
      document.body.appendChild(container);

      /* Camera */
      camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000);

      //Colocando a posição da câmera 3D
      camera.position.x = 250;
      camera.position.y = 200;
      camera.position.z = 500;


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
        ball.add(object);
        });
      });
      //Adiciona a bola no cenario
      scene.add(ball);

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
      ball.rotation.x += 0.010;
      ball.rotation.y += 0.05;
      ball.rotation.z += 0.02
      renderer.render(scene, camera);
    }