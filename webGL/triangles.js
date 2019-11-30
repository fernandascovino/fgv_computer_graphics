// Hello World! (WebGL)
// Feito por Fernanda Scovino (código adaptado do tutorial)
// Tutorial: https://www.youtube.com/watch?v=XNbtwyWh9HA

// Define o número de triângulos a serem desenhadosx
var n_triangulos = prompt("Quantos triângulos vamos desenhar (1 a 10)?", 1);
var n_triangulos = parseInt(n_triangulos)

if (n_triangulos > 10) {
    alert("Máximo de 10 triângulos!");
}


var canvas = document.createElement('canvas')
document.body.appendChild(canvas)

// Define tamanho do Canvas com a viewport
canvas.width = window.innerWidth
canvas.height = window.innerHeight

// Cria contexto
var gl = canvas.getContext('webgl')

// Muda a cor do fundo: as cores RGB estão no intervalo (0,1)
gl.clearColor(77/255, 115/255, 20/255, 1)
gl.clear(gl.COLOR_BUFFER_BIT)

// Define o shader dos vertices
var vertexShader = gl.createShader(gl.VERTEX_SHADER)
gl.shaderSource(vertexShader, `
    attribute vec2 position;
    void main() {
        gl_Position = vec4(position, 0.0, 1.0);
    } `
);
gl.compileShader(vertexShader)

// Define o shader dos fragmentos
var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER)
gl.shaderSource(fragmentShader, `
    precision highp float;
    uniform vec4 color;
    void main () {
        gl_FragColor = color;
    } `
)
gl.compileShader(fragmentShader)

// Cria o programa
var program = gl.createProgram()
gl.attachShader(program, vertexShader)
gl.attachShader(program, fragmentShader)
gl.linkProgram(program)

// Cria triângulo superior
var vertices = new Float32Array([
    0, 1,   
    -1/4, 1/2,
    1/4, 1/2
])

// Ajusta o número por terem vértices repetidos
var des_triangulos = n_triangulos
n_3 = Math.floor(des_triangulos / 3)

if (n_3 > 0){
    des_triangulos = des_triangulos + (n_3 - 1)*3
    if (n_triangulos % 3 != 0){
        des_triangulos += 1
        if (n_3 > 2){
            des_triangulos += 4
        }
    }
}

// Cria triângulos inferiores com os vértices do anterior
for (var i = 0; i < des_triangulos; i++){
    
    if (i % 3 != 0){
        j = 2*i
        // Define aresta inferior
        var bottom_y = vertices[j+1] - 1/2
            
        // Define a coordenada x dos vértices da aresta inferior
        var bottom_lx = vertices[j] - 1/4
        var bottom_rx = vertices[j] + 1/4

        // Adiciona o triângulo
        new_vertices = new Float32Array([
            vertices[j], vertices[j+1],
            bottom_lx, bottom_y,
            bottom_rx, bottom_y
        ])

        vertices = Float32Array.from([...vertices, ...new_vertices])
    }

}

// Associa a forma criada com o buffer
var buffer = gl.createBuffer()
gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW)

// Define os atributos da forma e passa à posição definida em vertexShader
gl.useProgram(program)
program.color = gl.getUniformLocation(program, 'color')
gl.uniform4fv(program.color, [165/255, 191/255, 107/255, 1.0])
program.position = gl.getAttribLocation(program, 'position')
gl.enableVertexAttribArray(program.position)
// Pontos em 2D
gl.vertexAttribPointer(program.position, 2, gl.FLOAT, false, 0, 0)

// Desenha os triangulos
gl.drawArrays(gl.TRIANGLES, 0, vertices.length / 2)

