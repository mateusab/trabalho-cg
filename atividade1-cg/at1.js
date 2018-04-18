var container;
var camera, controls, scene, renderer;

    function init() {

      container = document.createElement('div');
      document.body.appendChild(container);

      /* Camera */
      camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000);
      camera.position.x = 250;
      camera.position.y = 200;
      camera.position.z = 500;


      /* Scene */
      scene = new THREE.Scene();
      ambient = new THREE.AmbientLight(0xFFFFFF, 1.0);
      scene.add(ambient);


      /* Model */
      ball = new THREE.Object3D();
      var mtlLoader = new THREE.MTLLoader();
      mtlLoader.load('images/Football.mtl', function(materials){
        materials.preload();
        
        /* Objeto */
        var objLoader = new THREE.OBJLoader();
        objLoader.setMaterials(materials);
        objLoader.load('images/Football.obj', function(object) {
          object.position.set(0, 0, 0);
          object.receiveShadow = true;
          object.scale.set(2.5, 2.5, 2.5);
          ball.add(object);
        });
      });

      scene.add(ball);

      /* Renderer */
      renderer = new THREE.WebGLRenderer();
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setClearColor(new THREE.Color("green"));
      container.appendChild(renderer.domElement);

      /* Controls */
      controls = new THREE.OrbitControls(camera, renderer.domElement);

      /* Events */
      window.addEventListener('resize', onWindowResize, false);
      window.addEventListener('keydown', onKeyboardEvent, false);

    }

    function onWindowResize() {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);

    }

    function onKeyboardEvent(e) {

    }

    function animate() {
      requestAnimationFrame(animate);
      controls.update();
      render();
    }
   
    function render() {
      ball.rotation.x += 0.010;
      ball.rotation.y += 0.05;
      ball.rotation.z += 0.02
      renderer.render(scene, camera);
    }