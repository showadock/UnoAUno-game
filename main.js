/*
 * X= espacio inhabilitado
 * A= Ficha azul
 * V= Vacío
 */

let tablero = [
    ["X","X","A", "A", "A", "X", "X"],
    ["X","X","A", "A", "A", "X", "X"],
    ["A","A","A", "A", "A", "A", "A"],
    ["A","A","A", "V", "A", "A", "A"],
    ["A","A","A", "A", "A", "A", "A"],
    ["X","X","A", "A", "A", "X", "X"],
    ["X","X","A", "A", "A", "X", "X"],
];

const tableroOriginal = [
    ["X","X","A", "A", "A", "X", "X"],
    ["X","X","A", "A", "A", "X", "X"],
    ["A","A","A", "A", "A", "A", "A"],
    ["A","A","A", "V", "A", "A", "A"],
    ["A","A","A", "A", "A", "A", "A"],
    ["X","X","A", "A", "A", "X", "X"],
    ["X","X","A", "A", "A", "X", "X"],
];

let cantidadFichas = 32;

const dibujarTablero = () => {
    let tabla = document.getElementById('tablero-datos');
    let nuevaFila = "";

    // Limpiamos el html
    limpiarHTML();

    for (let filas = 0; filas < tablero.length; filas++) {
         nuevaFila = document.createElement('tr');
        for (let columna = 0; columna < tablero[filas].length; columna++) {
            if(tablero[filas][columna] == "X"){
                nuevaFila.innerHTML += `<td> <button disabled class="desactivado"></button></td>`;
            }
            if(tablero[filas][columna] == "A"){
                nuevaFila.innerHTML += `<td> <button class="ficha" id="btn_ficha_${filas}_${columna}" onclick="verificarMovimiento(${filas}, ${columna})"></button></td>`;
            }

            if(tablero[filas][columna] == "V"){
                nuevaFila.innerHTML += `<td> <button class="libre" id="btn_ficha_${filas}_${columna}"></button></td>`;
            }
        }
        tabla.appendChild(nuevaFila);
    }
}

const verificarMovimiento = (f, c) => {
    // Recibimos fila y columna y chequeamos los lugares disponibles para moverse
    let norte               = false;
    let sur                 = false;
    let este                = false;
    let oeste               = false;
    let posiblesDestinos    = [];
   
    dibujarTablero();
    // Norte
    if (f-2 >= 0) {
        if(tablero[f-1][c] == "A" && tablero[f-2][c] == "V"){
            posiblesDestinos.push({"fila" : f-2, "columna" : c});
        }
    }

    // Sur
    if (f+2 < 7) {
        if(tablero[f+1][c] == "A" && tablero[f+2][c] == "V") {
            posiblesDestinos.push({"fila" : f+2, "columna" : c});
        }
    }

    // Este
    if(c+2 < 7){
        if(tablero[f][c+1] == "A" && tablero[f][c+2] == "V") {
            posiblesDestinos.push({"fila" : f, "columna" : c+2});
        }
    }
    
    // Oeste
    if(c-2 >= 0){
        if(tablero[f][c-1] == "A" && tablero[f][c-2] == "V") {
            posiblesDestinos.push({"fila" : f, "columna" : c-2});
        }
    }

    if(posiblesDestinos.length  == 0){
       alert("No hay movimientos disponibles");
    }
    else{
        //botones(false);
        activarBotonesMovimientosDisponibles({fila: f, columna:c},posiblesDestinos);
    }

}



const botones = (activar) => {
    const button = document.querySelectorAll('button');
    if(activar){
        button.forEach(element => {
            element.disabled = false;
        });
    }else{
        button.forEach(element => {
            element.disabled = true;
        });
    }
}


const activarBotonesMovimientosDisponibles = (origen, mov_disp) => {
    mov_disp.forEach(mov => {
        let btn = document.getElementById(`btn_ficha_${mov.fila}_${mov.columna}`);
        btn.innerText = "Mover aqui"
        btn.addEventListener('click', () => {
            moveTo(origen, {fila: mov.fila, columna: mov.columna})
        });
    });
}

const moveTo = (origen, destino) => {
    tablero[origen.fila][origen.columna] = "V";

    // Preguntamos hacia donde se mueve

    // Oeste
    if(destino.fila == origen.fila && destino.columna < origen.columna)
    {
        // Va hacia el este
        tablero[origen.fila][origen.columna-1] = "V";
    }

    // Norte
    if(destino.fila < origen.fila && destino.columna == origen.columna){
        // Va hacia el Norte
        tablero[origen.fila-1][origen.columna] = "V";
    }

    // Sur
    if(destino.fila > origen.fila && destino.columna == origen.columna){
        // Va hacia el Sur
        tablero[origen.fila+1][origen.columna] = "V";
    }

    // Este
    if(destino.fila == origen.fila && destino.columna > origen.columna){
        // Va hacia el Este
        tablero[origen.fila][origen.columna+1] = "V";
    }

    cantidadFichas--;

    console.log(cantidadFichas);
    tablero[destino.fila][destino.columna] = "A";
    dibujarTablero();
}

const limpiarHTML = () => {
    let tablita = document.getElementById('tablero-datos');
    tablita.innerText = ""; 
}

const volverAIntentar = () => {
    
    reset();
    dibujarTablero();
}


const reset = () => {
    tablero = [
        ["X","X","A", "A", "A", "X", "X"],
        ["X","X","A", "A", "A", "X", "X"],
        ["A","A","A", "A", "A", "A", "A"],
        ["A","A","A", "V", "A", "A", "A"],
        ["A","A","A", "A", "A", "A", "A"],
        ["X","X","A", "A", "A", "X", "X"],
        ["X","X","A", "A", "A", "X", "X"],
    ];
}
dibujarTablero();