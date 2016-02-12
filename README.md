obj-pool
======================

ObjPool allow you to recycle or allocate objects in a pool easily. When you need an instance of your object, the pool will return you one of them, or a new instance if it's empty.

## Installation
### Node.js - Browserify - Webpack
```
npm install obj-pool
```

```js
  var ObjPool = require('obj-pool');
```

### Browsers
Add [obj-pool.js](https://github.com/Nazariglez/obj-pool/blob/master/build/obj-pool.js) to your HTML and ObjPool will be added to `window`

```js
  //window.ObjPool
  if(ObjPool)console.log('Cool!');
```

## Usage
### Basic
```js
  //Creating the pool of MyEntity
  var pool = new ObjPool(MyEntity);

  //getting an instance of MyEntity
  var entity = pool.alloc();
  /* do something with entity */

  //put back the entity instance in the pool
  pool.free(entity);
```

### Creating an object with arguments
If your object needs some params you can use `{args:[]}` option as second param.

```js
  var audioPool = new ObjPool(Audio, {args: ['./assets/audio.mp3']});
```

### Allocating some instances
Use `{amount: N}``
```js
  var pool = new ObjPool(MyEntity, {amount: 100});
```

### Extra
You can use some functions to `init` and `reset` your objects.

```js
  function MyEntity(){

  }

  MyEntity.prototype.constructor = MyEntity;

  MyEntity.prototype.init = function(){
    //Do something to initialize me when I go out of my pool
  }

  MyEntity.prototype.reset = function(){
    //Do something with me when I return to my pool
  }

  var pool = new ObjPool(MyEntity);
  var entity = pool.alloc(); //This fire MyEntity.init();
  pool.free(entity); //This fire MyEntity.reset();
```

If you need other function's names to `init` and `reset`, you can change the value of `objInit`and `objReset`:

```js
  var pool = new ObjPool(MyEntity);
  pool.objInit = 'initialize'; //Looks for MyEntity.initialize() instead of MyEntity.init();
  pool.objReset = 'resetMe'; //Looks for MyEntity.resetMe() instead of MyEntity.reset();
```

## API
### ObjPool
#### constructor(object [,options])
Pass the objects to create, and the options (Optional) with the amount and object arguments. `{args: [arg1, arg2, ...], amount: 100}'
#### .alloc()
Return an object to use it and remove it from the pool.
#### .free()
Put back an object into the pool to reuse it.
#### .generate(amount)
Create a N numbers of the object and add to the objects list.
#### .clear()
Erase all the object from the objects list.
#### .length - (Read only)
Return the objects list length
