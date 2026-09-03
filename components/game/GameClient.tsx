'use client';
import {Canvas,useFrame} from '@react-three/fiber';
import {Sky,Environment,PerspectiveCamera} from '@react-three/drei';
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

function Runtime(){const input=useMemo(()=>new InputSystem(),[]),vehicle=useMemo(()=>new VehicleSystem(),[]),combat=useMemo(()=>new CombatSystem(),[]),wanted=useMemo(()=>new WantedSystem(),[]),mission=useMemo(()=>new MissionManager(),[]),weather=useMemo(()=>new WeatherSystem(),[]);const prevE=useRef(false);const prevV=useRef(false);useEffect(()=>{input.start();return()=>input.stop()},[input]);useFrame((_,dt)=>{const s=useGameStore.getState();if(!s.started)return;s.tick(dt);vehicle.update(dt,input.state);combat.update(dt);wanted.update(dt);weather.update(dt);mission.update();if(input.state.attack&&!prevE.current)combat.attack();if(input.state.shoot)combat.shoot();if(input.state.interact&&!prevE.current){mission.advance();s.setMessage('مرحله جلو رفت؛ هدف بعدی روی HUD آمد.')}if(input.state.mode&&!prevV.current){const modes=['onFoot','car','boat','air','skydive'] as const;const i=modes.indexOf(s.player.mode);s.setMode(modes[(i+1)%modes.length]);s.setMessage(`حالت: ${modes[(i+1)%modes.length]}`)}prevE.current=input.state.interact;prevV.current=input.state.mode});return null}
function Player(){const ref=useRef<THREE.Mesh>(null);useFrame(()=>{const p=useGameStore.getState().player.position;if(ref.current)ref.current.position.set(p.x,p.y,p.z)});return <mesh ref={ref}><capsuleGeometry args={[.38,.9,6,10]}/><meshStandardMaterial color="#f4d2b1"/></mesh>}
function CameraRig(){useFrame(({camera})=>{const p=useGameStore.getState().player.position;camera.position.lerp(new THREE.Vector3(p.x+7,p.y+6,p.z+9),.08);camera.lookAt(p.x,p.y+1,p.z)});return null}
function World(){return <><Sky sunPosition={[100,40,30]} turbidity={7} rayleigh={1.2}/><Environment preset="city"/><ambientLight intensity={1.8}/><directionalLight position={[20,40,10]} intensity={3}/><City/><Player/><CameraRig/><Runtime/></>}
function HUD(){const s=useGameStore();if(!s.started)return <div className="center-msg"><h1>آفتاب سرخ</h1><p>یک شهر ساحلی کوچک، یک شب طولانی.</p><button className="start-btn" onClick={s.start}>شروع بازی</button></div>;return <div className="hud"><div className="mission">{s.mission.title} — {s.mission.objective}<br/><small>{s.message}</small></div><div className="top-right"><div className="wanted">{[1,2,3,4,5,6].map(n=><span key={n} className={`star ${s.wanted.level>=n?'on':''}`}>★</span>)}</div><div className="status">جان: {Math.round(s.player.health)}٪ · پول: ${s.player.cash} · مهمات: {s.ammo}</div><div className="status">هوا: {s.weather} · زمان: {Math.floor(s.time).toString().padStart(2,'0')}:00 · حالت: {s.player.mode}</div></div><div className="bottom-left"><div className="minimap"><div className="route"/><div className="player-dot"/><div className="objective"/></div><div className="meters"><div className="meter">سوخت {Math.round(s.fuel)}%</div><div className="meter">فاصله 0.57 mi</div></div></div><div className="controls">WASD حرکت · F ضربه · E مرحله بعد · V تغییر حالت</div></div>}
export default function GameClient(){return <div className="game-root"><Canvas shadows gl={{antialias:true}}><PerspectiveCamera makeDefault fov={58} position={[8,7,10]}/><World/></Canvas><HUD/></div>}
