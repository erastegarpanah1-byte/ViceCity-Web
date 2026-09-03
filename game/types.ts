export type Weather = 'sunny' | 'cloudy' | 'rain';
export type GameMode = 'onFoot' | 'car' | 'boat' | 'air' | 'skydive';
export type MissionId = 'intro' | 'car-job' | 'boat-escape' | 'helicopter' | 'finale';

export interface Vec3 { x:number; y:number; z:number }
export interface PlayerState { position:Vec3; heading:number; health:number; cash:number; mode:GameMode; character:'mateo'|'luna'; clothes:number; masked:boolean }
export interface VehicleState { id:string; kind:'sedan'|'sports'|'suv'|'boat'|'helicopter'; position:Vec3; heading:number; speed:number; health:number; fuel:number; occupied:boolean }
export interface MissionState { id:MissionId; step:number; active:boolean; title:string; objective:string }
export interface WantedState { level:number; heat:number; searching:boolean; lastSeen:Vec3|null }
