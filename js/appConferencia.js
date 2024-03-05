let contagem = 0;
contador.innerHTML = contagem;

const codigoBarra = document.getElementById('codBarraPrimary');
const codigos = document.getElementById('codBarra');
const diminuir = document.getElementById('diminuir');
const limpar = document.getElementById('limpar');
const referencia = document.getElementById('referencia');
const descricao = document.getElementById('descricao');

document.getElementById('number').focus();
document.getElementById('codBarra').onchange = function () {
    checked();
};

let usuarios = localStorage.getItem('usuarios');
let nomeLogado = document.getElementById('nomeUser');

nomeLogado.innerHTML = `Olá, ${usuarios}`

if (localStorage.getItem('token') == null) {
    alert('Login Obrigatório.');
    window.location.href = './index.html';
}

function sair() {
    localStorage.removeItem('token');
    localStorage.removeItem('usuarioLogado');
    localStorage.removeItem('usuarios');
    window.location.href = './index.html';
};

diminuir.addEventListener('click', function () {
    if (contagem >= 1) {
        contador.innerHTML = --contagem;
    } else {
        alert("Quantidade não pode ser menor que ZERO.");
    }
});

adiciona.addEventListener('click', function () {
    contador.innerHTML = ++contagem;
});

limpar.addEventListener('click', function () {
    var r = confirm("Clique em OK para limpar todos os campos!");
    if (r == true) {
        contador.innerHTML = contagem = 0;
        referencia.innerHTML = contagem = "";
        descricao.innerHTML = contagem = "";
        number.value = "";
        codigoBarra.value = "";
        codigos.value = "";
        document.getElementById('number').focus();
    }
});

function checked() {
    if (codigos.value == codigoBarra.value) {
        contador.innerHTML = ++contagem;
        codigos.value = codigos.value = "";
    } else {
        let x = document.getElementById('audio');
        x.play();
        codigos.value = "";
    }
};

function retorno() {
    fetch("/json/sb1.json").then((response) => {
        response.json().then((sb1) => {
            sb1.infos.map((peca) => {
                if (codigoBarra.value == peca.codBarras) {
                    referencia.innerHTML = peca.sku;
                    descricao.innerHTML = peca.descricao;
                    contador.innerHTML = ++contagem;
                }
            })
        })
    })
    document.getElementById('codBarra').focus();
};
function enter() {
    document.getElementById('codBarraPrimary').focus();
};

class Produto {

    constructor() {
        this.id = number.value;
        this.arrayProdutos = [];
    }

    salvar() {
        let produtos = this.lerDados();

        if (this.validaCampos(produtos)) {
            this.adicionar(produtos);
        };

        this.listaTabela();
        codigoBarra.value = "";
        codigos.value = "";
        contador.innerHTML = contagem = 0;
        referencia.innerHTML = contagem = "";
        descricao.innerHTML = contagem = "";
        number.value = "";

        document.getElementById('number').focus();
    };

    listaTabela() {
        let tbody = document.getElementById('tbody');
        tbody.innerHTML = '';

        //for (let i = 0; i < this.arrayProdutos.length; i++) {
        for (let i = this.arrayProdutos.length - 1; i >= 0; i--) {
            let tr = tbody.insertRow();

            let td_id = tr.insertCell();
            let td_sku = tr.insertCell();
            let td_qtde = tr.insertCell();
            let td_descricao = tr.insertCell();
            let td_conferente = tr.insertCell();
            let td_acoes = tr.insertCell();

            td_id.innerHTML = this.arrayProdutos[i].id;
            td_sku.innerHTML = this.arrayProdutos[i].referencia;
            td_qtde.innerHTML = this.arrayProdutos[i].contador;
            td_descricao.innerHTML = this.arrayProdutos[i].descricao;
            td_conferente.innerHTML = `${usuarios}`;

            td_id.classList.add('center');
            td_sku.classList.add('center');
            td_qtde.classList.add('center');
            td_acoes.classList.add('center');
            td_conferente.classList.add('center');

            let imgEdit = document.createElement('img');
            imgEdit.src = '_icon/editar.png';
            imgEdit.setAttribute("onclick", "produtos.editar(" + JSON.stringify(this.arrayProdutos[i]) + ")");

            td_acoes.appendChild(imgEdit);

            let imgDelet = document.createElement('img');
            imgDelet.src = '_icon/excluir.png';
            imgDelet.setAttribute("onclick", "produtos.deletar(" + this.arrayProdutos[i].id + ")");

            td_acoes.appendChild(imgDelet);
        }


    };

    adicionar(produtos) {
        this.arrayProdutos.push(produtos);
        this.id++;
    };

    editar(dados) {
        document.getElementById('number').value = dados.id;
        referencia.innerHTML = dados.referencia;
        descricao.innerHTML = dados.descricao;
        contador.innerHTML = dados.contador;
    }

    lerDados() {
        let produtos = {}

        produtos.id = document.getElementById('number').value;
        produtos.referencia = referencia.innerHTML;
        produtos.contador = contador.innerHTML;
        produtos.descricao = descricao.innerHTML;

        return produtos;
    };

    validaCampos(produtos) {
        let msg = '';

        if (produtos.referencia == '' && produtos.descricao == '') {
            msg += 'Campo não pode ser vazio \n';
        }
        if (msg != '') {
            alert(msg);
            return false
        }
        return true;
    };

    deletar(id) {
        if (confirm(`Excluir o Baú Nº ${id} ?`)) {
            let tbody = document.getElementById('tbody');

            for (let i = this.arrayProdutos.length - 1; i >= 0; i--) {
                if (this.arrayProdutos[i].id == id) {
                    this.arrayProdutos.splice(i, 1);
                    tbody.deleteRow(i);
                }
            };

        };
    };
};

var produtos = new Produto();

document.getElementById('exportCSV').addEventListener('click', function () {
    var table2excel = new Table2Excel();
    table2excel.export(document.getElementById('export'))
});

document.querySelector('*' && 'body').setAttribute("class", 'amd');