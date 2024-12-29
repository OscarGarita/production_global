const textBox = document.getElementById("boxPid");
const total = document.getElementById("total");
let table = document.getElementById("table");

const btnEliminar = document.getElementById("btnEliminar");
const btnPrimary = document.getElementById("btnPrimary");
const btnSecondary = document.getElementById("btnSecondary");
const btnCcmod = document.getElementById("btnCcmod");
const btnQc = document.getElementById("btnQc");
const btnCbct = document.getElementById("btnCbct");
const btnCbctSecondary = document.getElementById("btnCbctSecondary");
const btnCbctCcmod = document.getElementById("btnCbctCcmod");
const bntClean = document.getElementById("btnClean");

const txtPrimary = "Primary";
const txtSecondary = "Secondary";
const txtCcmod = "CCMod";
const txtQc = "QC";
const txtCbct = "CBCT-Primary";
const txtCbctSecondary = "CBCT-Secondary";
const txtCbctCc = "CBCT-CCMod";

const primary = 4.56;
const secondary = 3.74;
const ccmod = 2.82;
const qc = 1.1;
const CbctPrimary = 6.86;
const CbctSecondary = 5.32;
const CbctCcmod = 4.11;

// Arrays para texto
const text = [
  txtPrimary,
  txtSecondary,
  txtCcmod,
  txtQc,
  txtCbct,
  txtCbctSecondary,
  txtCbctCc
];
// Arrays de números
const percentages = [
  primary,
  secondary,
  ccmod,
  qc,
  CbctPrimary,
  CbctSecondary,
  CbctCcmod
];

/* Eventos de los botones */


btnPrimary.addEventListener("click", function (event) {
  checkEmpty(event, text[0], percentages[0]);
});

btnSecondary.addEventListener("click", function (event) {
  checkEmpty(event, text[1], percentages[1]);
});

btnCcmod.addEventListener("click", function (event) {
  checkEmpty(event, text[2], percentages[2]);
});

btnQc.addEventListener("click", function (event) {
  checkEmpty(event, text[3], percentages[3]);
});

btnCbct.addEventListener("click", function (event) {
  checkEmpty(event, text[4], percentages[4]);
});

btnCbctSecondary.addEventListener("click", function (event) {
  checkEmpty(event, text[5], percentages[5]);
});

btnCbctCcmod.addEventListener("click", function (event) {
  checkEmpty(event, text[6], percentages[6]);
});

// Fin eventos

bntClean.addEventListener("click", function (event) {
  clearTable();
});

// Función para cargar todos los datos
loadData();

function checkEmpty(event, type, percentage) {
  if (textBox.value.trim() === '') {
    alert("The PID field must not be empty");

  } else {
    const pid = textBox.value;
    loadData();
    addTable(pid, type, percentage);
    loadData();
    clearTextBox();
  }
}

function removeCase(pid) {
  const confirmation = confirm("Are you sure you want to delete this item?");
  if (confirmation) {
    fetch(`eliminar.php?pid=${pid}`, {
      method: 'GET'
    })
      .then(response => response.text())
      .then(result => {
        console.log(result);
        // Elimina la fila del DOM
        document.querySelector(`a[href="index.php?pid=${pid}"]`).closest('tr').remove();
        loadData(); // Actualiza las métricas de la tabla
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }
}

function addTable(pid, type, percentage) {
  let row = table.insertRow(1);
  let c1 = row.insertCell(0);
  let c2 = row.insertCell(1);
  let c3 = row.insertCell(2);
  let c4 = row.insertCell(3);

  c1.innerText = pid;
  c2.innerText = type;
  c3.innerText = percentage;
  c4.innerHTML = `<a href="index.php?pid=${pid}" class="btnEliminar"><i class="fa-solid fa-trash"></i></a>`;

  // Agrega el evento de eliminar al botón recién creado
  c4.querySelector('.btnEliminar').addEventListener('click', function (event) {
    event.preventDefault();
    removeCase(pid);
  });

  // Datos que deseas enviar al servidor
  const data = {
    pid: pid,
    type: type,
    percentage: percentage
  };

  // Usa fetch para enviar los datos al servidor
  fetch('insertar.php', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: new URLSearchParams(data)
  })
    .then(response => response.text())
    .then(result => {
      console.log(result);
    })
    .catch(error => {
      console.error('Error:', error);
    });


}

function timeU() {
  let suma = 0;
  let cellData = 0;
  let totalS = 0;

  for (let i = 1; i < table.rows.length; i++) {
    cellData = table.rows[i].cells[2].textContent;
    suma += parseFloat(cellData);
    totalS = suma.toFixed(2);
  }

  total.textContent = totalS + '%';
}

function clearTextBox() {
  textBox.value = '';
}

function completions() {
  let primaryCompletion = document.getElementById('primaryCompletion');
  let secondaryCompletion = document.getElementById('SecondaryCompletion');
  let ccmodCompletion = document.getElementById('ccmodCompletion');
  let qcCompletion = document.getElementById('qcCompletion');
  let totalCompletion = document.getElementById('totalCompletion');

  let primary = 0;
  let secondary = 0;
  let ccmod = 0;
  let qc = 0;
  let total = 0;

  for (let i = 1; i < table.rows.length; i++) {
    if (table.rows[i].cells[1].innerText === txtPrimary || table.rows[i].cells[1].innerText === txtCbct) {
      primary++;
    } else if (table.rows[i].cells[1].textContent === txtSecondary || table.rows[i].cells[1].textContent === txtCbctSecondary) {
      secondary++;
    } else if (table.rows[i].cells[1].textContent === txtCcmod || table.rows[i].cells[1].textContent === txtCbctCc) {
      ccmod++;
    } else if (table.rows[i].cells[1].textContent === txtQc) {
      qc++;
    }
  }

  primaryCompletion.textContent = primary;
  secondaryCompletion.textContent = secondary;
  ccmodCompletion.textContent = ccmod;
  qcCompletion.textContent = qc;

  total = total + primary + secondary + ccmod + qc;
  totalCompletion.textContent = total;
}

function clearTable() {
  const result = confirm('¿Estás seguro de que deseas continuar?');
  if (result) {
    fetch('limpiarTabla.php', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
      .then(response => response.text())
      .then(result => {
        console.log(result); // Aquí puedes manejar la respuesta del servidor
      })
      .catch(error => {
        console.error('Error:', error);
      });

    recargar();
    console.log('El usuario hizo clic en OK.');
  } else {
    console.log('El usuario hizo clic en Cancelar.');
  }
}

function loadData() {
  timeU();
  completions();
}

function recargar() {
  console.log('recarga');
  location.reload();
}
