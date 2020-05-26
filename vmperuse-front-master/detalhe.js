var templateFoto = '<img src="{{IMAGEMFOTO}}" style="width:180px;height:180px">';
var templateBio = '<h3> {{NOME}} </h3> <hr> <p> RACF: {{RACF}}</p> ' +
    ' <p> SETOR: {{SETOR}}</p>' +
    ' <p> TELEFONE: {{TELEFONE}}</p>';
var templateSolicitacao = '<div class="row">' +
    '<div class="col-12"> Solicitação: {{NUM}} </div>' +
    '<div class="col-12"> {{DATA}} - {{OBSERVACOES}} </div>' +
    '</div>';
var templateItem = '<div class="row">' +
    '<div class="col-12> Itens solicitados: {{ITENS}} </div>' +
    '</div>'

function recuperaDetalhe() {

    var parametro = window.location.search;

    var id = parametro.substr(4);

    console.log("Número da solicitação = " + id);

    fetch("http://localhost:8080/solicitacoes/" + id)
        .then(res => res.json())
        .catch(err => alert("pedido não encontrado"));

    var userSTR = localStorage.getItem("VMuser");
    console.log(userSTR);

    if (!userSTR) {
        window.location = "index.html";  // se não existir info do usuario, ele não tá logado, logo mando pro index
    }
    usuario = JSON.parse(userSTR);
    item = JSON.parse(userSTR)


    document.getElementById("foto").innerHTML = templateFoto.replace("{{IMAGEMFOTO}}", usuario.linkFoto);
    document.getElementById("personal").innerHTML = templateBio.replace("{{NOME}}", usuario.nome)
        .replace("{{RACF}}", usuario.racf)
        .replace("{{SETOR}}", usuario.setor)
        .replace("{{TELEFONE}}", usuario.telefone);

    var todosPedidos = "";
    var todosItens = "";
    var completo = "";

    todosPedidos = todosPedidos + templateSolicitacao.replace("{{DATA}}", usuario.pedidos[id - 1].data)
        .replace("{{OBSERVACOES}}", usuario.pedidos[id - 1].observacoes)
        .replace("{{NUM}}", usuario.pedidos[id - 1].numSolicitacao)

    for (i=0; i <= usuario.length; i++) {
        todosItens = todosItens + templateItem.replace("{{ITENS}}", item.software[i])
    }

    completo = todosPedidos + todosItens

    document.getElementById("detalhes").innerHTML = completo;

}

function logout() {
    localStorage.removeItem("VMuser");
    window.location = "index.html";
}