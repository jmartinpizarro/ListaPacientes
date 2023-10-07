const  addBtn = document.querySelector(".add-btn");
const error = document.querySelector(".error");
const patientList = document.querySelector(".patientList");
var inputForm = [];

function checkAge(element){
    const esNumeroEntero = /^[0-9]+$/.test(element);
    if (esNumeroEntero) {
        return true
    } else {
        return false
    }
};

function patientCreator(){
    // generación de la información del paciente
    const li = document.createElement("li"),
    div = document.createElement("div"),
    h2 = document.createElement("h2"),
    h3 = document.createElement("h3"),
    h4 = document.createElement("h4"),
    p = document.createElement("p");
    btn = document.createElement("button");

    h2.innerHTML = inputForm[0] + " " + inputForm[1];
    h4.innerHTML = inputForm[2];
    h3.innerHTML = inputForm[3];
    p.innerHTML = inputForm[4];
    btn.innerHTML = "Eliminar Paciente";
    btn.classList.toggle("remove")

    div.appendChild(h2);
    div.appendChild(h4);
    div.appendChild(h3);
    div.appendChild(p);
    div.appendChild(btn);
    div.classList.toggle("patientInfo");
    li.appendChild(div);
    patientList.appendChild(li);
};

function resetForm() {
    var toChange = [
        document.querySelector("#patientName"),
        document.querySelector("#patientSurname"),
        document.querySelector("#age"),
        document.querySelector("#illness"),
        document.querySelector("#description")
    ];
    for (let i = 0; i < toChange.length; i++) {
        toChange[i].value = "";
    }
}

function patientRemover(button) {
    var btnRemover = button;
    if (btnRemover.classList.contains("remove")) {
        // Eliminar el paciente del DOM
        btnRemover.parentElement.parentElement.remove();

        // Buscar la posición del paciente en inputForm
        const patientIndex = patientList.indexOf(btnRemover.parentElement.parentElement);

        // Eliminar el paciente de inputForm
        if (patientIndex !== -1) {
            inputForm.splice(patientIndex, 1); // index desde el que borrar, elementos a borrar
        }
        // Guardar la versión actualizada de inputForm en el localStorage --> mucho más fácil que intentar modificar directamente el localStorage.
        saveToLocalStorage();
    }
}


//LOCAL STORAGE IMPLEMENTATION
function saveToLocalStorage() {
    localStorage.setItem("patientData", JSON.stringify(inputForm));
}

function loadFromLocalStorage() {
    const storedData = localStorage.getItem("patientData");
    if (storedData) {
        inputForm = JSON.parse(storedData);
        patientCreator();
    }
}


window.addEventListener("load", loadFromLocalStorage);

// creación y append del paciente a la lista
addBtn.addEventListener("click", function(){
    inputForm =[document.getElementById("patientName").value,
                document.getElementById("patientSurname").value, 
                document.getElementById("age").value, 
                document.getElementById("illness").value, 
                document.getElementById("description").value];

    // arreglamos el formulario
    for (var i = 0; i < inputForm.length; i++){
        if (inputForm[i] == ""){
            inputForm[i] = "No definido";
        };
    };
    const isAge = checkAge(inputForm[2])
    if (isAge == false){
        error.style.display = "block";
        return
    } else {
        error.style.display = "none";
    };

    patientCreator();
    saveToLocalStorage();
    resetForm();
});

patientList.addEventListener("click", function(e){
    patientRemover(e.target);
});

