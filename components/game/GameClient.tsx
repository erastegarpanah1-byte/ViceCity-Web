'use client';
import {Canvas,useFrame} from '@react-three/fiber';
import {Sky,Environment,PerspectiveCamera,Text} from '@react-three/drei';
import * as THREE from 'three';
import {useEffect,useMemo,useRef} from 'react';
import {useGameStore} from '../../game/state';
import {InputSystem} from '../../game/systems/InputSystem';
import {VehicleSystem} from '../../game/systems/VehicleSystem';
import {CombatSystem} from '../../game/systems/CombatSystem';
import {WantedSystem} from '../../game/systems/WantedSystem';
import {MissionManager} from '../../game/systems/MissionManager';
import {WeatherSystem} from '../../game/systems/WeatherSystem';
import {City} from './City';

function Runtime(){const input=useMemo(()=>new InputSystem(),[]),vehicle=useMemo(()=>new VehicleSystem(),[]),combat=useMemo(()=>new CombatSystem(),[]),wanted=useMemo(()=>new WantedSystem(),[]),mission=useMemo(()=>new MissionManager(),[]),weather=useMemo(()=>new WeatherSystem(),[]);useEffect(()=>{input.start();return()=>input.stop()},[input]);useFrame((_,dt)=>{const s=useGameStore.getState();if(!s.started)return;s.tick(dt);vehicle.update(dt,input.state);combat.update(dt);wanted.update(dt);weather.update(dt);mission.update();if(input.state.attack){combat.attack();}if(input.state.shoot){combat.shoot()}});return null}
function Player(){const ref=useRef<THREE.Mesh>(null);useFrame(()=>{const p=useGameStore.getState().player.position;if(ref.current)ref.current.position.set(p.x,p.y,p.z)});return <mesh ref={ref}><capsuleGeometry args={[.38,.9,6,10]}/><meshStandardMaterial color="#f4d2b1"/></mesh>}
function CameraRig(){useFrame(({camera})=>{const s=useGameStore.getState();const p=s.player.position;const target=new THREE.Vector3(p.x,p.y+1,p.z);camera.position.lerp(new THREE.Vector3(p.x+7,p.y+6,p.z+9),.08);camera.lookAt(target)});return null}
function World(){return <><Sky sunPosition={[100,40,30]} turbidity={7} rayleigh={1.2}/><Environment preset="city"/><ambientLight intensity={1.8}/><directionalLight position={[20,40,10]} intensity={3}/><City/><Player/><CameraRig/><Runtime/></>}
function HUD(){const s=useGameStore();if(!s.started)return <div className="center-msg"><h1>آفتاب سرخ</h1><p>یک شهر ساحلی کوچک، یک شب طولانی.</p><button className="start-btn" onClick={s.start}>شروع بازی</button></div>;return <div className="hud"><div className="mission">{s.mission.title} — {s.mission.objective}</div><div className="top-right"><div className="wanted">{[1,2,3,4,5,6].map(n=><span key={n} className={`star ${s.wanted.level>=n?'on':''}`}>★</span>)}</div><div className="status">جان: {Math.round(s.player.health)}٪ · پول: ${s.player.cash} · مهمات: {s.ammo}</div><div className="status">هوا: {s.weather} · زمان: {Math.floor(s.time).toString().padStart(2,'0')}:00</div></div><div className="bottom-left"><div className="minimap"><div className="route"/><div className="player-dot"/><div className="objective"/></div><div className="meters"><div className="meter">سوخت {s.fuel}%</div><div className="meter">فاصله 0.57 mi</div></div></div><div className="controls">WASD حرکت · Shift دویدن · F ضربه · E تعامل · V تغییر حالت</div></div>}
export default function GameClient(){return <div className="game-root"><Canvas shadows gl={{antialias:true}}><PerspectiveCamera makeDefault fov={58} position={[8,7,10]}/><World/></Canvas><HUD/></div>}
