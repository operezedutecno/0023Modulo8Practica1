$(() => {
    $(document).on("submit", "#formulario-registro", function(event){
        event.preventDefault()
        const payload = {
            usuario: $("#txt-usuario").val(),
            contrasena: $("#txt-contrasena").val()
        }
        fetch("/usuarios", {
            method: 'POST',
            body: JSON.stringify(payload),
            headers: {"Content-type": "application/json; charset=UTF-8"}
        }).then(resp => {
            window.location = "/"
        }).catch(error => {
            alert("Ocurrió un error registrando el usuario")
        })
    })
})