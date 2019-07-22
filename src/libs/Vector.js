export default {
  add (v1, v2) {
    return { x: v1.x + v2.x, y: v1.y + v2.y }
  },
  sub (v1, v2) {
    return { x: v1.x - v2.x, y: v1.y - v2.y }
  },
  mult (v, m) {
    return { x: v.x * m, y: v.y * m }
  },
  div (v, m) {
    return { x: v.x / m, y: v.y / m }
  },
  length (v) {
    return Math.sqrt(Math.pow(v.x, 2), Math.pow(v.y, 2))
  }
}
