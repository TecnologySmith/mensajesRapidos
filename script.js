/* =======================================================
   HERRAMIENTAS LÍDER DE SOPORTE — LIZTO SOFTWARE
   Lógica general
   ======================================================= */

/* -------------------------------------------------------
   NAVEGACIÓN ENTRE SECCIONES
   ------------------------------------------------------- */
function mostrarSeccion(id) {
  document.querySelectorAll('.tool-section').forEach(sec => sec.classList.remove('active'));
  document.getElementById('seccion-' + id).classList.add('active');

  document.querySelectorAll('.nav-btn[data-section]').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.section === id);
  });

  // Cierra el menú móvil al elegir una sección
  document.getElementById('navLinks').classList.remove('open');
}

document.getElementById('hamburger').addEventListener('click', () => {
  document.getElementById('navLinks').classList.toggle('open');
});

/* -------------------------------------------------------
   NOTIFICACIÓN DE COPIADO (compartida por todas las secciones)
   ------------------------------------------------------- */
function mostrarNotificacionCopiado() {
  const notification = document.getElementById('copy-notification');
  notification.classList.add('visible');
  setTimeout(() => notification.classList.remove('visible'), 1800);
}

function copiarTexto(elementId) {
  const box = document.getElementById(elementId);
  if (!box.value || box.value.includes('Ingresa los datos')) return;
  box.select();
  document.execCommand('copy');
  mostrarNotificacionCopiado();
}

/* =========================================================
   SECCIÓN 1: MENSAJES DE SOPORTE
   ========================================================= */
const mensajes = {
  repcontingencia: "¿Cómo estás? Hablas con Yeison Hernandez del equipo de soporte de Lizto Software, me asignaron tu caso para poderte ayudar",
  daysMessage: "buenos días, ¿cómo estás? Hablas con Yeison Hernandez del equipo de soporte de Lizto Software. ",
  afternoonMessage: "buenas tardes, ¿cómo estás? Hablas con Yeison Hernandez del equipo de soporte de Lizto Software. ",
  pagoRealizadoMessage: "¿Cómo estás? Hablas con Yeison Hernandez del equipo de soporte de Lizto. Mil gracias por el pago. Ya puedes ingresar.",
  pagoGraciasMessage: "con mucho gusto, indícame el NIT del salón para solicitarlo al área contable.",
  solicitarLinkMessage: "¿Cómo estás? Hablas con Yeison Hernandez del equipo de soporte de Lizto. Mil disculpas, el sistema entró en suspensión automática al no detectar el pago. ¿Me puedes enviar el soporte de pago y el NIT para verificarlo con contabilidad?",
  despedidaMessage: "ha sido un gusto ayudarte. Si necesitas más ayuda, no dudes en contactarnos. ¡Te deseo un excelente día!",
  linkReunionMessage: "Al correo te acabamos de enviar el link de la reunión. ¿Me confirmas por favor si te llegó?",
  sinRespuesta: "Esperamos que la solución brindada haya resuelto tu caso. Cuando tengas un momento, ¿podrías confirmarnos si todo está en orden? Al no tener respuesta, procederemos a cerrar el ticket, pero si tienes otra consulta estaremos atentos para ayudarte.",
  linkPago: "puedes realizar el pago en este link:",
  reunionDudas: "Horarios martes y jueves  9am en clase grupal https://us06web.zoom.us/j/83345602567 martes y jueves  5pm https://us06web.zoom.us/j/83272928783?pwd=5oyn4FfSuZ7F5gPDakoUUqVqhTmKbT.1 ",
  dameunMomento: "dame un momento por favor, vamos a verificar.",
  algoMas: "con mucho gusto, ¿hay algo más en lo que te podamos colaborar?"
};

let mensajeActual = "";
let modifiers = { hola: false, momento: false, ayuda: false, gusto: false };

function toggleModifier(type) {
  modifiers[type] = !modifiers[type];
  const btnId = type === 'hola' ? 'holaBtn' :
                type === 'momento' ? 'dameMomentoBtn' :
                type === 'ayuda' ? 'comoAyudarBtn' : 'conGustoBtn';

  document.getElementById(btnId).classList.toggle('active', modifiers[type]);

  if (mensajeActual) actualizarMensajeActual();
}

function mostrarMensaje(id, evt) {
  mensajeActual = id;

  document.querySelectorAll('.chip-msg').forEach(b => b.classList.remove('active'));
  if (evt && evt.target) evt.target.classList.add('active');

  if (id === 'sinRespuesta') {
    modifiers.hola = false;
    document.getElementById('holaBtn').classList.remove('active');
  }
  actualizarMensajeActual();
}

function personalizarMensaje(mensaje) {
  const nombre = document.getElementById('userInput').value.trim();
  let mensajeFinal = mensaje.charAt(0).toUpperCase() + mensaje.slice(1);
  const esMensajeExcluidoDeHola = mensaje.startsWith('Esperamos');

  if (nombre) {
    mensajeFinal = `${nombre}, ${mensajeFinal}`;
  }

  if (modifiers.hola && !esMensajeExcluidoDeHola) {
    if (nombre) {
      mensajeFinal = mensajeFinal.replace(`${nombre}, `, `Hola ${nombre}, `);
    } else {
      mensajeFinal = `Hola, ${mensajeFinal}`;
    }
  }

  let suffix = '';
  if (modifiers.gusto) suffix += (suffix ? ' con' : ' Con') + ' mucho gusto.';
  if (modifiers.momento) suffix += ' Dame un momento por favor.';
  if (modifiers.ayuda) suffix += (suffix ? ' ¿cómo' : ' ¿Cómo') + ' puedo ayudarte?';

  if (suffix.length > 0) {
    if (!mensajeFinal.trim().endsWith('.') && !mensajeFinal.trim().endsWith('!') && !mensajeFinal.trim().endsWith('?')) {
      mensajeFinal += '.';
    }
    mensajeFinal += suffix;
  }

  return mensajeFinal;
}

function actualizarMensajeActual() {
  if (!mensajeActual) return;
  const mensajeBase = mensajes[mensajeActual];
  document.getElementById('messageBox').value = personalizarMensaje(mensajeBase);
}

/* =========================================================
   SECCIÓN 2: AGENDAMIENTOS Y ENLACES
   ========================================================= */
const horarios = {
  yeison: { '9am': 'https://us06web.zoom.us/j/86553506923', '11am': 'https://us06web.zoom.us/j/84015173788', '3pm': 'https://us06web.zoom.us/j/86502199583', '5pm': 'https://us06web.zoom.us/j/89901352812' },
  paola: { '9am': 'https://us06web.zoom.us/j/84560427915', '12pm': 'https://us06web.zoom.us/j/87186962523', '4pm': 'https://us06web.zoom.us/j/81938853734' }
};

let agenteSeleccionado = '';
let linkSeleccionado = '';
let horaSeleccionada = '';

function seleccionarAgente(agente) {
  agenteSeleccionado = agente;
  linkSeleccionado = '';
  horaSeleccionada = '';

  document.getElementById('btnYeison').classList.remove('active');
  document.getElementById('btnPaola').classList.remove('active');
  document.getElementById(`btn${agente.charAt(0).toUpperCase() + agente.slice(1)}`).classList.add('active');

  const timesContainer = document.getElementById('agentTimes');
  timesContainer.innerHTML = '';
  const agentHorarios = horarios[agente];

  for (const hora in agentHorarios) {
    const btn = document.createElement('button');
    btn.className = 'chip time-btn';
    btn.textContent = hora;
    btn.onclick = (e) => {
      linkSeleccionado = agentHorarios[hora];
      horaSeleccionada = hora;
      document.querySelectorAll('.time-btn').forEach(b => b.classList.remove('active'));
      e.target.classList.add('active');
      actualizarAgendamiento();
    };
    timesContainer.appendChild(btn);
  }
  actualizarAgendamiento();
}

function formatFecha(fechaStr) {
  if (!fechaStr) return '';
  const fecha = new Date(fechaStr + 'T00:00:00');
  const opciones = { weekday: 'long', day: '2-digit', month: 'long' };
  let formateada = fecha.toLocaleDateString('es-ES', opciones);
  return formateada.charAt(0).toUpperCase() + formateada.slice(1);
}

function actualizarAgendamiento() {
  const datosCliente = document.getElementById('clienteData').value.trim();
  const fechaInput = document.getElementById('fechaAgendamiento').value;
  const outputBox = document.getElementById('agendamientoOutput');
  const confirmBox = document.getElementById('confirmacionOutput');

  const fechaTexto = formatFecha(fechaInput);

  if (datosCliente && linkSeleccionado) {
    outputBox.value = `${datosCliente} - únete a la reunión aquí: ${linkSeleccionado}`;
  } else {
    outputBox.value = 'Ingresa los datos del cliente y selecciona un agente y una hora.';
  }

  if (linkSeleccionado && horaSeleccionada && fechaInput) {
    confirmBox.value = `Te confirmo que ya hemos agendado tu reunión.
El día de la sesión te estaremos esperando en sala durante un máximo de 15 minutos ⏳.
Por favor recuerda ingresar puntualmente para que podamos aprovechar al máximo el espacio juntos 🙌.

Te comparto el link de acceso: ${linkSeleccionado}
${fechaTexto} a las ${horaSeleccionada}`;
  } else {
    confirmBox.value = 'Faltan datos (fecha u hora) para generar la confirmación.';
  }
}

/* =========================================================
   SECCIÓN 3: DIVIDIR ARCHIVOS DE EXCEL
   ========================================================= */
let originalRows = null;
let originalFileBase = 'archivo';
let generatedFiles = [];

const dropZone = document.getElementById('dropZone');
const fileInput = document.getElementById('fileInput');
const fileNameEl = document.getElementById('fileName');
const chunkSizeInput = document.getElementById('chunkSize');
const totalHint = document.getElementById('totalHint');
const processBtn = document.getElementById('processBtn');
const errorMsg = document.getElementById('errorMsg');
const summary = document.getElementById('summary');
const resultados = document.getElementById('resultados');
const resultList = document.getElementById('resultList');
const downloadAllBtn = document.getElementById('downloadAllBtn');

dropZone.addEventListener('click', () => fileInput.click());
dropZone.addEventListener('dragover', (e) => { e.preventDefault(); dropZone.classList.add('dragover'); });
dropZone.addEventListener('dragleave', () => dropZone.classList.remove('dragover'));
dropZone.addEventListener('drop', (e) => {
  e.preventDefault();
  dropZone.classList.remove('dragover');
  if (e.dataTransfer.files.length) {
    fileInput.files = e.dataTransfer.files;
    handleFile(e.dataTransfer.files[0]);
  }
});
fileInput.addEventListener('change', () => {
  if (fileInput.files.length) handleFile(fileInput.files[0]);
});

function showError(msg) {
  errorMsg.textContent = msg;
  errorMsg.classList.add('visible');
}
function clearError() {
  errorMsg.textContent = '';
  errorMsg.classList.remove('visible');
}

function handleFile(file) {
  clearError();
  resultados.classList.remove('visible');
  summary.classList.remove('visible');
  fileNameEl.textContent = file.name;
  originalFileBase = file.name.replace(/\.[^/.]+$/, '');

  const reader = new FileReader();
  reader.onload = (e) => {
    try {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: 'array' });
      const firstSheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[firstSheetName];
      const rows = XLSX.utils.sheet_to_json(sheet, { header: 1, defval: '' });

      if (!rows || rows.length < 2) {
        showError('El archivo no tiene datos suficientes (se necesita al menos encabezado + 1 registro).');
        originalRows = null;
        processBtn.disabled = true;
        return;
      }

      originalRows = rows;
      const totalRegistros = rows.length - 1;
      totalHint.textContent = `El archivo tiene ${totalRegistros} registros (sin contar el encabezado).`;
      processBtn.disabled = false;
    } catch (err) {
      showError('No se pudo leer el archivo. Verifica que sea un Excel válido.');
      console.error(err);
    }
  };
  reader.readAsArrayBuffer(file);
}

processBtn.addEventListener('click', () => {
  clearError();
  if (!originalRows) {
    showError('Primero sube un archivo Excel válido.');
    return;
  }
  const chunkSize = parseInt(chunkSizeInput.value, 10);
  if (!chunkSize || chunkSize < 1) {
    showError('Ingresa una cantidad válida de registros por archivo.');
    return;
  }

  const header = originalRows[0];
  const dataRows = originalRows.slice(1);
  const totalRegistros = dataRows.length;

  generatedFiles = [];
  resultList.innerHTML = '';

  const numArchivos = Math.ceil(totalRegistros / chunkSize);

  for (let i = 0; i < numArchivos; i++) {
    const start = i * chunkSize;
    const end = Math.min(start + chunkSize, totalRegistros);
    const chunk = dataRows.slice(start, end);
    const aoa = [header, ...chunk];

    const ws = XLSX.utils.aoa_to_sheet(aoa);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Datos');
    const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([wbout], { type: 'application/octet-stream' });

    const fileName = `${originalFileBase}_parte${i + 1}.xlsx`;
    generatedFiles.push({ name: fileName, blob: blob, count: chunk.length });
  }

  summary.textContent = `Se generaron ${numArchivos} archivo(s) a partir de ${totalRegistros} registros (${chunkSize} por archivo, el último puede tener menos).`;
  summary.classList.add('visible');

  generatedFiles.forEach(f => {
    const url = URL.createObjectURL(f.blob);
    const item = document.createElement('div');
    item.className = 'result-item';
    item.innerHTML = `
      <div class="info">
        <div>${f.name}</div>
        <div class="rows">${f.count} registros + encabezado</div>
      </div>
      <a href="${url}" download="${f.name}">Descargar</a>
    `;
    resultList.appendChild(item);
  });

  resultados.classList.add('visible');
});

downloadAllBtn.addEventListener('click', async () => {
  if (!generatedFiles.length) return;
  const zip = new JSZip();
  generatedFiles.forEach(f => zip.file(f.name, f.blob));
  const content = await zip.generateAsync({ type: 'blob' });
  const url = URL.createObjectURL(content);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${originalFileBase}_dividido.zip`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
});

/* -------------------------------------------------------
   ESTADO INICIAL
   ------------------------------------------------------- */
document.addEventListener('DOMContentLoaded', () => {
  seleccionarAgente('yeison');
});
