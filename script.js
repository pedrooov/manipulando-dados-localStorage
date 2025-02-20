// Carrega os produtos do localStorage ou inicia com array vazio
let products = JSON.parse(localStorage.getItem('products')) || [];

// Função para carregar os produtos
function loadProducts() {
    // Retornando o elemento HTML através da id
    const productList = document.getElementById('productList');
    
    // Esvaziando o elemento HTML
    productList.innerHTML = "";

    // Loop foreach para percorrer por toda array
    products.forEach((product, index) => {

        // Criando um elemento de lista
        const li = document.createElement('li');

        // Acessando por índice
        li.textContent = `Produto: ${product[0]} - R$${product[1]} (Quantidade: ${product[2]})`; 

        // Criando um botão de editar
        const editButton = document.createElement('button');
        editButton.textContent = "Editar";
        editButton.className = 'edit-button';
        editButton.onclick = () => editProduct(index);
        li.appendChild(editButton);

        // Criando um botão de remover
        const removeButton = document.createElement('button');
        removeButton.textContent = "Remover";
        removeButton.className = 'remove-button';
        removeButton.onclick = () => removeProduct(index);
        li.appendChild(removeButton);

        // Adicionando um elemento filho a um elemento pai
        productList.appendChild(li);
    });
}

// Função para limpar os produtos
function clearAllProducts() {
    products = [];
    localStorage.removeItem('products');
    loadProducts();
    alert("Todos os produtos foram excluídos!");
}

// Função para adicionar os produtos
function addProduct() {
    // Recebendo os dados dos inputs 
    const productInput = document.getElementById('productInput').value.trim();
    const priceInput = document.getElementById('priceInput').value.trim();
    const amountInput = document.getElementById('amountInput').value.trim();

    // Validação para verificar se os inputs são diferentes de preenchidos
    if (!productInput) {
        alert("Por favor, insira o nome do produto!");
        return;
    }
    if (!priceInput || priceInput <= 0) {
        alert("Por favor, insira um preço válido (maior que 0)!");
        return;
    }
    if (!amountInput || amountInput <= 0) {
        alert("Por favor, insira uma quantidade válida (maior que 0)!");
        return;
    }

    // Criando o array do novo produto
    const newProduct = [
        productInput,
        parseFloat(priceInput).toFixed(2),
        parseInt(amountInput)
    ];

    // Enviando os dados dos produtos para o novo produto
    products.push(newProduct);

    //
    localStorage.setItem('products', JSON.stringify(products));

    // Limpa os inputs
    document.getElementById('productInput').value = '';
    document.getElementById('priceInput').value = '';
    document.getElementById('amountInput').value = '';

    loadProducts();
    alert("Produto adicionado com sucesso!");
}

// Função de remover produto
function removeProduct(index) {
    products.splice(index, 1); // Remove e reorganiza o índice de uma aray
    localStorage.setItem('products', JSON.stringify(products)); // Atualizando o localStorage
    loadProducts(); 
    alert("Produto removido com sucesso!");
}

function editProduct(index) {
    const product = products[index];
    const productList = document.getElementById('productList');
    const li = productList.children[index];

    // Cria os inputs para edição
    const nameInput = document.createElement('input');
    nameInput.type = 'text';
    nameInput.value = product[0]; // Nome no índice 0

    const priceInput = document.createElement('input');
    priceInput.type = 'number';
    priceInput.value = product[1]; // Preço no índice 1
    priceInput.step = "0.01";

    const amountInput = document.createElement('input');
    amountInput.type = 'number';
    amountInput.value = product[2]; // Quantidade no índice 2

    const saveButton = document.createElement('button');
    saveButton.textContent = "Salvar";
    saveButton.onclick = () => saveProduct(index, nameInput.value, priceInput.value, amountInput.value);

    li.innerHTML = "";
    li.appendChild(nameInput);
    li.appendChild(priceInput);
    li.appendChild(amountInput);
    li.appendChild(saveButton);
}

function saveProduct(index, name, price, amount) {
    name = name.trim();
    price = parseFloat(price);
    amount = parseInt(amount);

    // Validação as condições 
    if (!name) {
        alert("O nome do produto é obrigatório!");
        return;
    }
    if (!price || price <= 0) {
        alert("Por favor, insira um preço válido (maior que 0)!");
        return;
    }
    if (!amount || amount <= 0) {
        alert("Por favor, insira uma quantidade válida (maior que 0)!");
        return;
    }

    // Atualiza o array no índice correto
    products[index] = [name, price.toFixed(2), amount];
    localStorage.setItem('products', JSON.stringify(products));
    loadProducts();
    alert("Produto atualizado com sucesso!");
}

// Carrega os produtos ao iniciar a página
window.onload = loadProducts;