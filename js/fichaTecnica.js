let zipContent = null; // Variable global para almacenar el contenido del ZIP

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('btnfileFichaTecnica').addEventListener('click', function() {
        document.getElementById('fileFichaTecnica').click();
    });

    document.getElementById('fileFichaTecnica').addEventListener('change', handleFileUpload);

    document.getElementById('btnDescargarFichaTecnica').addEventListener('click', function() {
        if (!document.getElementById('fileFichaTecnica').files[0]) {
            alert('Por favor, selecciona un archivo primero.');
            return;
        }

        if (!zipContent) {
            alert('El archivo aún está procesándose. Por favor, espera.');
            return;
        }

        // Utiliza la variable global zipContent para iniciar la descarga
        saveAs(zipContent, "archivo.zip");
    });
});

function handleFileUpload() {
    const file = document.getElementById('fileFichaTecnica').files[0];
    if (!file) {
        alert('No se ha seleccionado ningún archivo.');
        return;
    }

    updateProgressBar(0); // Inicia la barra de progreso en 0%
    zipContent = null; // Resetea el contenido del ZIP

    const reader = new FileReader();
    reader.onload = function(loadEvent) {
        const base64 = loadEvent.target.result;
        const zip = new JSZip();
        zip.file(file.name, base64.split('base64,')[1], {base64: true});
//ajx
//if
//true
//falso
        zip.generateAsync({type:"blob"}, function(metadata) {
            // Actualiza la barra de progreso con el porcentaje real del proceso
            updateProgressBar(metadata.percent);
        }).then(function(content) {
            zipContent = content; // Almacena el contenido del ZIP en la variable global
            updateProgressBar(100); // Asegura que la barra de progreso muestre 100%
        });
    };
    reader.readAsDataURL(file);
}

function updateProgressBar(percent) {
    const progressBar = document.getElementById('progressBar');
    progressBar.style.width = percent + '%';
    // Actualiza el texto dentro de la barra de progreso
    if (percent > 0 && percent < 100) {
        progressBar.textContent = 'Cargando...';
    } else if (percent >= 100) {
        progressBar.textContent = 'Completado';
    } else {
        progressBar.textContent = ''; // Limpia el texto si la barra está en 0%
    }
}