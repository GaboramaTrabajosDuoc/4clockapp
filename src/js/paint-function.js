// js/my-paint-function.js

registerPaint('my-paint-function', class {
    paint(context, geometry, properties) {
      context.fillStyle = 'gray';
      context.fillRect(0, 0, geometry.width, geometry.height);
    }
  });