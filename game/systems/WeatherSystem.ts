import type { Weather } from '../types';
import { useGameStore } from '../state';
export class WeatherSystem{timer=0;update(dt:number){this.timer+=dt;if(this.timer<28)return;this.timer=0;const options:Weather[]=['sunny','cloudy','rain'];const next=options[Math.floor(Math.random()*options.length)];useGameStore.getState().setWeather(next)}}
