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
                    </tr>
                `)
            })
        })
    }
    listarUsuarios();
})