import { create } from 'zustand';
import type { GameMode, MissionState, PlayerState, Vec3, Weather, WantedState } from './types';

interface GameStore {
  started:boolean; paused:boolean; time:number; weather:Weather; player:PlayerState; wanted:WantedState; mission:MissionState; ammo:number; fuel:number; message:string;
  start:()=>void; setMode:(mode:GameMode)=>void; move:(p:Vec3,heading:number)=>void; damage:(n:number)=>void; addCash:(n:number)=>void; setWeather:(w:Weather)=>void; setWanted:(n:number)=>void; addHeat:(n:number)=>void; advanceMission:()=>void; setMessage:(s:string)=>void; tick:(dt:number)=>void;
}
const initialPlayer:PlayerState={position:{x:0,y:1,z:12},heading:0,health:100,cash:250,mode:'onFoot',character:'mateo',clothes:0,masked:false};
export const useGameStore=create<GameStore>((set)=>({
 started:false,paused:false,time:10,weather:'sunny',player:initialPlayer,wanted:{level:0,heat:0,searching:false,lastSeen:null},ammo:24,fuel:100,message:'به شهر ساحلی خوش آمدی.',
 start:()=>set({started:true}),setMode:(mode)=>set(s=>({player:{...s.player,mode}})),move:(p,heading)=>set(s=>({player:{...s.player,position:p,heading}})),damage:(n)=>set(s=>({player:{...s.player,health:Math.max(0,s.player.health-n)}})),addCash:(n)=>set(s=>({player:{...s.player,cash:Math.max(0,s.player.cash+n)}})),setWeather:(weather)=>set({weather}),setWanted:(level)=>set(s=>({wanted:{...s.wanted,level:Math.max(0,Math.min(6,level)),searching:level>0}})),addHeat:(n)=>set(s=>({wanted:{...s.wanted,heat:Math.max(0,Math.min(100,s.wanted.heat+n))}})),advanceMission:()=>set(s=>({mission:{...s.mission,step:s.mission.step+1}})),setMessage:(message)=>set({message}),tick:(dt)=>set(s=>({time:(s.time+dt*0.12)%24,wanted:{...s.wanted,heat:Math.max(0,s.wanted.heat-dt*1.2)}})),
 mission:{id:'intro',step:0,active:true,title:'آفتاب سرخ',objective:'در کوچه با نگهبان‌ها درگیر شو.'}
}));
