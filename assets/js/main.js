$(() => {
    const listarUsuarios = () => {
        fetch("http://localhost:3000/usuarios").then(resp => resp.json()).then(resp => {
            $("#listado-usuarios tbody").html("")
            resp.data.map(usuario => {
                $("#listado-usuarios tbody").append(`
                    <tr>
                        <td>${usuario.id}</td>
                        <td>${usuario.usuario}</td>
                        <td>${usuario.createdAt}</td>
                        <td>${usuario.updatedAt}</td>
                        <td>
                            <img src="/public/img/icons/edit.png" class="enlace actualizar-usuario" data-id="${usuario.id}" data-bs-toggle="modal" data-bs-target="#modal-actualizar-usuario">
                            <img src="/public/img/icons/eliminar.png" class="enlace eliminar-usuario ms-2" data-id="${usuario.id}">
                        </td>
                    </tr>
                `)
            })
        })
    }
    listarUsuarios();

    $(document).on("click", ".eliminar-usuario", function() {
        const id = $(this).data("id")
        
        Swal.fire({
          title: 'Confirmación',
          icon: 'info',
          text: '¿Desea eliminar este usuario?',
          showCloseButton: true,
          showCancelButton: true,
          focusConfirm: false,
          confirmButtonText:'Aceptar',
          cancelButtonText:'Cancelar',
        
        }).then(resp => {
            if(resp.isConfirmed) {
                fetch(`/usuarios/${id}`, { method: 'DELETE'}).then(resp => {
                    if(resp.status !== 200) {
                        throw "Ocurrió un error eliminando usuario"
                    }
                    Swal.fire({
                        icon: 'success',
                        title: 'Éxito',
                        text: 'Usuario eliminado con éxito',
                        showConfirmButton: true,
                        confirmButtonText: 'Ok'
                      })
                }).catch(error => {
                    Swal.fire({
                        title: 'Error!',
                        text: 'Ocurrió un error eliminando el usuario',
                        icon: 'error',
                        confirmButtonText: 'Ok'
                    })
                }).finally(() => {
                    listarUsuarios();
                })
            }
        })
    })

    $(document).on("click",".actualizar-usuario", function() {
        const id = $(this).data("id")
        fetch(`/usuarios/${id}`).then(resp => {
            return resp.json()
        }).then(response => {
            // $("#modal-actualizar-usuario").show();
            $("#txt-usuario").val(response.data.usuario)
            $("#txt-id").val(response.data.id)
        }).catch(error => {
            Swal.fire({
                title: 'Error!',
                text: 'Ocurrió un error consultado datos de usuario',
                icon: 'error',
                confirmButtonText: 'Ok'
            })
        })
    })

    $(document).on("submit", "#formulario-actualizacion", function(event) {
        event.preventDefault()
        const id = $("#txt-id").val();
        const payload = {
            usuario: $("#txt-usuario").val(),
            contrasena: $("#txt-contrasena").val()
        }
        fetch(`/usuarios/${id}`, {
            method: 'PUT',
            body: JSON.stringify(payload),
            headers: {"Content-type": "application/json; charset=UTF-8"}
        }).then(resp => {
            Swal.fire({
                icon: 'success',
                title: 'Éxito',
                text: 'Usuario actualizado con éxito',
                showConfirmButton: true,
                confirmButtonText: 'Ok'
            })
            $("#modal-btn-close").trigger('click');
            listarUsuarios();
        }).catch(error => {
            Swal.fire({
                title: 'Error!',
                text: 'Ocurrió un error actualizando los datos de usuario',
                icon: 'error',
                confirmButtonText: 'Ok'
            })
        })
    })
})