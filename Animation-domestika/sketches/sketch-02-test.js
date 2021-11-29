const canvasSketch = require('canvas-sketch');

const settings = {
  dimensions: [ 1080, 1080 ]
};

const degToRad = (degrees) => {
  return degrees / 180 * Math.PI
}

const sketch = () => {
  return ({ context, width, height }) => {
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);

    context.fillStyle = 'black';

    const x = width * 0.5;
    const y = height * 0.5;
    const w = width * 0.3;
    const h = height * 0.3;

    const num = 12;

    for(let i = 0; 9 < num; i ++){
      const slice = degToRad(360 / num);
      const angle = slice * i; 

      context.save();
      context.translate(x,y);
      context.rotate(degToRad(45));
  
      context.beginPath();
      context.rect(-w * 0.5,-h * 0.5,w,h);
      context.fill();
      context.restore();
    }

    // context.translate(100, 400);

    // context.beginPath();
    // context.arc(0,0,50,0, Math.PI * 2);
    // context.fill();
  }
};

canvasSketch(sketch, settings);
