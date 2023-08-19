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
        if(confirm("¿Seguro que desea eliminar este usuario?")) {
            fetch(`/usuarios/${id}`, { method: 'DELETE'}).then(resp => {
                alert("Usuario eliminado con éxito");
            }).catch(error => {
                alert("Ocurrió un error eliminando el usuario")
            }).finally(() => {
                listarUsuarios();
            })
        }
    })
})