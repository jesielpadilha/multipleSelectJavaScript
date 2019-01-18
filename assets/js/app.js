"use strict";

var listNames = [{ Name: "John", Id: 1 }, { Name: "Petter", Id: 2 }, { Name: "Mary", Id: 3 }, { Name: "Philip", Id: 4 }];
var tbNames = document.querySelector('#tbNames').getElementsByTagName('tbody')[0];
var tabela;
var listNamesSelected = [];

function showModalNewRegister() {
    $('#modalNewRegister').modal('show');
}

function addName() {
    const name = document.querySelector('#name');
    const novoId = listNames.length + 1;

    listNames.push({ Name: name.value, Id: novoId });
    tabela.destroy();
    gerarTabela();

    $('#modalNewRegister').modal('hide');
}

function gerarTabela() {
    tabela = $("#tbNames").DataTable({
        data: listNames,
        columns: [
            {
                "render": function (data, type, full, meta) {
                    return '<input type="checkbox" name="checkName" id="nameChecked-' + full.Id + '" value="' + full.Id + '">';
                }
            },
            { title: "Id", data: "Id" },
            { title: "Name", data: "Name" }
        ]
    });

    var elementsArray = document.querySelectorAll("input[name='checkName']");

    elementsArray.forEach(function (elem) {
        elem.addEventListener("change", function () {
            const checkbox = $(this)[0];
            if (checkbox.checked) {
                if (!listNamesSelected.includes(checkbox.value)) {

                    var objSelected = listNames.filter(obj => {
                        return obj.Id == checkbox.value;
                    });

                    listNamesSelected.push(objSelected[0]);
                }
            } else {
                const indexItem = listNamesSelected.map(function (e) { return e.Id; }).indexOf(checkbox.value);
                listNamesSelected.splice(indexItem, 1);
            }
        });
    });

    listNamesSelected.forEach(function(item){
        //settar como "checked" os itens contidos na lista
    });
}
gerarTabela();

function fillMultipleSelect() {
    $('#modalListNames').modal('hide');
    const multipleSelect = document.querySelector('#selectedNames');

    multipleSelect.options.length = 0;

    listNamesSelected.forEach(function (item) {
        var option = document.createElement("option");
        option.value = item.Id;
        option.text = item.Name;
        multipleSelect.add(option);
    });

    console.log(listNamesSelected);
}
fillMultipleSelect();