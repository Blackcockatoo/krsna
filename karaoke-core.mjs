export const start=line=>line.words[0].s;
export const end=line=>line.words.at(-1).e;
export const text=line=>line.words.map(w=>w.t).join(' ');
export function atTime(lines,t){
 let focus=-1;
 for(let i=0;i<lines.length;i++){if(t>=start(lines[i]))focus=i;else break;}
 if(focus<0)return {active:-1,next:0,focus:0,ended:false};
 const ended=focus===lines.length-1&&t>end(lines[focus])+.6;
 const active=t<=end(lines[focus])+.22&&!ended?focus:-1;
 return {active,next:focus+1<lines.length?focus+1:-1,focus:ended?-1:focus,ended};
}
export function fill(word,t){return Math.max(0,Math.min(1,(t-word.s)/(word.e-word.s)));}
export function loopBounds(line,offset,duration){return {from:Math.max(0,start(line)-offset-.25),to:Math.min(duration,end(line)-offset+.3)}}
