export default class ObjPool{
  constructor(ctor, options = {amout: 1, args: []}){
    this.ctor = ctor;
    this._objects = [];
    this.args = options.args || [];
    this._amount = options.amount || 1;

    this.objInit = "init";
    this.objReset = "reset";
    this.generate(options.amount || 1);
  }

  _createObj(){
    let obj;
    if(this.args.length === 0){
      obj = new this.ctor();
    }else{
      try{
        obj = new (Function.prototype.bind.apply(this.ctor, ([null]).concat(this.args)))();
      }catch(e){
        obj = _newObj(this.ctor, this.args);
      }
    }

    return obj;
  }

  alloc(){
    if(this._objects.length === 0){
      this.generate(this._amount);
    }
    let obj = this._objects.pop();
    if(obj[this.objInit])obj[this.objInit]();
    return obj;
  }

  free(obj){
    if(obj[this.objReset])obj[this.objReset]();
    this._objects.unshift(obj);
  }

  clear(){
    this._objects.length = 0;
  }

  generate(amount){
    for(let i = 0; i < amount; i++){
      this._objects.push(this._createObj());
    }
  }

  get length(){return this._objects.length}
}

//safari fix
function _newObj(obj, args){
  let ev = "Function('obj',";
  let fn = "\"return new obj(";

  for(let i = 0; i < args.length; i++){
      ev += "'a"+i+"',";
      fn += "a"+i;
      if(i !== args.length-1){
          fn += ",";
      }
  }

  fn += ")\"";
  ev += fn + ")";

  return (eval(ev)).apply(this, ([obj]).concat(args));
}
