import type { Weather } from '../types';
export class TimeSystem{hours=10;weather:Weather='sunny';update(dt:number){this.hours=(this.hours+dt*.12)%24}get daylight(){return Math.max(0,Math.sin((this.hours-6)/12*Math.PI))}}
