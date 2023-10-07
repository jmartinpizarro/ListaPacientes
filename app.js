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
        btnRemover.parentElement.parentElement.remove();
    }
}


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
    resetForm();
});

patientList.addEventListener("click", function(e){
    patientRemover(e.target);
});

