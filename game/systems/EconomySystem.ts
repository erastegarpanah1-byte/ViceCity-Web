import {useGameStore} from '../state';
export class EconomySystem{buy(cost:number,label:string){const s=useGameStore.getState();if(s.player.cash<cost){s.setMessage('پول کافی نیست.');return false}s.addCash(-cost);s.setMessage(`${label} خریداری شد.`);return true}repair(){return this.buy(75,'تعمیر خودرو')}refuel(){return this.buy(40,'سوخت')}}
