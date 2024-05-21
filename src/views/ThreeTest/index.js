import './index.css'
import React, { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader'

let scene
let camera
let renderer
let mixer
let clock

const ThreeTest = () => {

  const renderBox = useRef(null)

  const init = () => {
    scene = new THREE.Scene()
    scene.background = new THREE.Color(0xdddddd)

    camera = new THREE.PerspectiveCamera(75, renderBox.current.offsetWidth / renderBox.current.offsetHeight, 0.1, 2000)
    camera.position.set(0, 0, 5)
    camera.lookAt(new THREE.Vector3())

    renderer = new THREE.WebGLRenderer()
    renderer.setSize(renderBox.current.offsetWidth, renderBox.current.offsetHeight)
    renderBox.current.appendChild(renderer.domElement)

    var controls = new OrbitControls(camera, renderer.domElement)
    controls.autoRotate = false
    controls.enablePan = false
    controls.enableZoom = true

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
    scene.add(ambientLight)

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1)
    directionalLight.position.set(5, 10, 7.5).normalize()
    scene.add(directionalLight)

    clock = new THREE.Clock()

    fetch('/aaa.glb')
    .then(response => response.arrayBuffer())
    .then(buffers => {
      console.log(buffers)
      const loader = new GLTFLoader()
      loader.parse(buffers, '', (res) => {

        scene.add(res.scene)
        scene.animations.push(...res.animations)

        mixer = new THREE.AnimationMixer(res.scene)
        scene.animations.forEach(clip => {
          mixer.clipAction(clip).play()
        })
        
        console.log(res)
      })
    })
    animate()
  }

  const animate = () => {
    requestAnimationFrame(animate)
    const delta = clock.getDelta()
    if (mixer) mixer.update(delta)
    renderer.render(scene, camera)
  }

  useEffect(() => {
    init()
  }, [])

  return (
    <>
      <div className="three-render-box" ref={ renderBox }></div>
    </>
  )
}

export default ThreeTest
