export interface poolOptions {
  args?:any[];
  amount?:number;
}

export default class ObjPool<T>{
  constructor(object:T, options?:poolOptions);
  alloc():T;
  free(object:T):void;
  generate(amount:number):void;
  clear():void;
  length:number;
}
