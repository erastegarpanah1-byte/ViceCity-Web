import * as THREE from 'three';
import { useGameStore } from '../state';
export interface Cop{position:THREE.Vector3;speed:number;kind:'car'|'heavy'|'heli'}
export class PoliceSystem{units:Cop[]=[];update(dt:number){const s=useGameStore.getState();if(s.wanted.level===0){this.units.length=0;return}const target=new THREE.Vector3(s.player.position.x,0,s.player.position.z);if(this.units.length<s.wanted.level+1)for(let i=this.units.length;i<s.wanted.level+1;i++)this.units.push({position:target.clone().add(new THREE.Vector3((i+1)*7,0,(i%2?1:-1)*12)),speed:8+s.wanted.level*2,kind:i>3?'heavy':'car'});for(const c of this.units){const d=target.clone().sub(c.position);d.y=0;if(d.length()>2)c.position.add(d.normalize().multiplyScalar(c.speed*dt))}}}
