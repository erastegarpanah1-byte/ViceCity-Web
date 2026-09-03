import { useGameStore } from '../state';
const steps=[
 ['آفتاب سرخ','در کوچه با نگهبان‌ها درگیر شو.'],
 ['کار ماشین','ماشین مشخص‌شده را سوار شو.'],
 ['فرار','از محدوده جست‌وجوی پلیس خارج شو.'],
 ['قایق','به مارینا برو و با قایق به جزیره برس.'],
 ['هلیکوپتر','خودت را به پشت‌بام برسان و پرواز کن.'],
 ['پرش','از ارتفاع پایین بیا و روی پشت‌بام فرود بیا.'],
 ['پایان','روی پشت‌بام با لونا صحبت کن.']
] as const;
export class MissionManager{update(){const s=useGameStore.getState();const i=Math.min(s.mission.step,steps.length-1);if(s.mission.title!==steps[i][0]||s.mission.objective!==steps[i][1])s.mission={...s.mission,title:steps[i][0],objective:steps[i][1]}}advance(){useGameStore.getState().advanceMission()}}
