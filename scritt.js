const cartaoBtn = document.getElementById("cartao-btn");
const pixBtn = document.getElementById("pix-btn");
const cartaoForm = document.getElementById("cartao-form");
const pixMensagem = document.getElementById("pix-mensagem");
const pixNumero = document.getElementById("pix-numero");
const cartoes = document.getElementById("cartoeslist");

// Define as ações dos botões de pagamento
cartaoBtn.addEventListener("click", exibirCartaoForm);
pixBtn.addEventListener("click", exibirPixMensagem);

// Função para exibir o formulário de cartão de crédito e ocultar a mensagem do Pix
function exibirCartaoForm() {
  cartaoBtn.classList.add("active");
  pixBtn.classList.remove("active");
  cartaoForm.classList.remove("d-none");
  pixMensagem.classList.add("d-none");
  cartoes.classList.remove("d-none");
}

// Função para exibir a mensagem do Pix e ocultar o formulário de cartão de crédito
function exibirPixMensagem() {
  cartaoBtn.classList.remove("active");
  pixBtn.classList.add("active");
  cartaoForm.classList.add("d-none");
  pixMensagem.classList.remove("d-none");
  cartoes.classList.add("d-none");
  // Gera um número aleatório de 32 dígitos para o Pix
  const pix = Math.floor(Math.random() * 10 ** 32).toString().padStart(32, "0");
  pixNumero.textContent = pix;
}
var selectedRow = null

function onFormSubmit(e) {
	event.preventDefault();
        var formData = readFormData();
        if (selectedRow == null){
            insertNewRecord(formData);
		}
        else{
            updateRecord(formData);
		}
        resetForm();    
}
const modal = document.querySelector('.modal-container')
const tbody = document.querySelector('tbody')
const sNome = document.querySelector('#nome')
const sCpf = document.querySelector('#cpf')
const sRua = document.querySelector('#rua')
const sCidade = document.querySelector('#cidade')
const sEmail = document.querySelector('#email')
const sNCartao = document.querySelector('#NCartao')
const sCvv = document.querySelector('#cvv')
const sValidade = document.querySelector('#validade')
const btnSalvar = document.querySelector('#btnSalvar')

let itens
let id

function openModal(edit = false, index = 0) {
  if (edit) {
    sNome.value = itens[index].nome
    sCpf.value = itens[index].cpf
    sRua.value = itens[index].rua
    sCidade.value = itens[index].cidade
    sEmail.value = itens[index].email
    sNCartao.value = itens[index].NCartao
    sCvv.value = itens[index].cvv
    sValidade.value = itens[index].validade
    id = index
  } else {
    sNome.value = ''
    sCpf.value = ''
    sRua.value = ''
    sCidade.value = ''
    sEmail.value = ''
    sNCartao.value = ''
    sCvv.value = ''
    sValidade.value = ''
  }
  
}
function editItem(index) {
  openModal(true, index)
}
function deleteItem(index) {
  itens.splice(index, 1)
  setItensBD()
  loadItens()
}

function insertItem(item, index) {
  let tr = document.createElement('tr')

  tr.innerHTML = `
    <td>${item.nome}</td>
    <td>${item.cpf}</td>
    <td>${item.rua}</td>
    <td>${item.cidade}</td>
    <td>${item.email}</td>
    <td>${item.NCartao}</td>
    <td>${item.cvv}</td>
    <td>${item.validade}</td>
    <td class="acao">
      <button onclick="editItem(${index})"><i class='ml-2 mr-2 btn btn-warning' ></i></button>
    </td>
    <td class="acao">
      <button onclick="deleteItem(${index})"><i class='ml-2 mr-2 btn btn-danger'></i></button>
    </td>
    <td class="acao">
  <button onclick="deleteItem(${index}); alert('Pagamento efetuado com sucesso!');"><i class='ml-2 mr-2 btn btn-primary'></i></button>
    </td>
  `
  tbody.appendChild(tr)
}
btnSalvar.onclick = e => {
  if (sNome.value == '' || sValidade.value == '' || sCidade.value == '' || sCpf.value == ''|| sCvv.value == '' || sEmail.value == '' || sNCartao.value == '' || sRua.value == '') {
    return
  }
  e.preventDefault();

  if (id !== undefined) {
    itens[id].nome = sNome.value
    itens[id].cpf = sCpf.value
    itens[id].rua = sRua.value
    itens[id].cidade = sCidade.value
    itens[id].email = sEmail.value
    itens[id].NCartao = sNCartao.value
    itens[id].cvv= sCvv.value
    itens[id].validade = sValidade.value
  } else {
    itens.push({'nome': sNome.value, 'cpf': sCpf.value, 'rua': sRua.value, 'cidade': sCidade.value, 'email': sEmail.value, 'NCartao': sNCartao.value, 'cvv': sCvv.value, 'validade': sValidade.value})
  }

  setItensBD()

  modal.classList.remove('active')
  loadItens()
  id = undefined
}

function loadItens() {
  itens = getItensBD()
  tbody.innerHTML = ''
  itens.forEach((item, index) => {
    insertItem(item, index)
  })

}

const getItensBD = () => JSON.parse(localStorage.getItem('dbfunc')) ?? []
const setItensBD = () => localStorage.setItem('dbfunc', JSON.stringify(itens))

loadItens()
function validarCartao() {
    var cartao = document.getElementById("NCartao").value;
    var regexVisa = /^4[0-9]{12}(?:[0-9]{3})?$/;
    var regexMastercard = /^5[1-5][0-9]{14}$/;
    var regexAmex = /^3[47][0-9]{13}$/;
    var regexDiscover = /^6(?:011|5[0-9]{2})[0-9]{12}$/;
    
    if (regexVisa.test(cartao)) {
      document.getElementById("resultado").innerHTML = "Visa";
    } else if (regexMastercard.test(cartao)) {
      document.getElementById("resultado").innerHTML = "Mastercard";
    } else if (regexAmex.test(cartao)) {
      document.getElementById("resultado").innerHTML = "American Express";
    } else if (regexDiscover.test(cartao)) {
      document.getElementById("resultado").innerHTML = "Discover";
    } else {
      document.getElementById("resultado").innerHTML = "Cartão Inválido";
    }
  }
  let storedData = localStorage.getItem('itens');
  fetch('estruturadedados.json')
  .then(response => response.json())
  .then(data => {
    itens = data;
    let newItens = itens;

    if (storedData !== null) {
      let storedItens = JSON.parse(storedData);
      newItens = { ...storedItens, ...newItens };
    }

    localStorage.setItem('itens', JSON.stringify(newItens));
    setItensBD();
    loadItens();
  })
  .catch(error => console.error(error));