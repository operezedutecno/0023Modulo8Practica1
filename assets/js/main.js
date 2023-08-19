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
                            <img src="/public/img/icons/eliminar.png" class="enlace eliminar-usuario" data-id="${usuario.id}">
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

    
})