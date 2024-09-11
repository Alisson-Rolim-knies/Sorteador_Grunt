document.addEventListener('DOMContentLoaded', function() {
    // Quando o DOM (a estrutura HTML) é completamente carregado, executa o código dentro da função
    document.getElementById('form-sorteador').addEventListener('submit', function(event) {
        event.preventDefault(); // Impede o comportamento padrão do formulário (recarregar a página ao submeter)
        
        let numeroMaximo = document.getElementById('numero-maximo').value; // Obtém o valor do input com id "numero-maximo"
        numeroMaximo = parseInt(numeroMaximo); // Converte o valor obtido, que é uma string, em um número inteiro
        
        let numeroAleatorio = Math.random() * numeroMaximo; // Gera um número aleatório entre 0 e o valor de numeroMaximo
        let numeroRedondo = Math.floor(numeroAleatorio + 1); // Arredonda o número aleatório para o número inteiro mais próximo
        
        document.getElementById('resultado-valor').innerText = numeroRedondo; // Exibe o número arredondado no elemento com id "resultado-valor"
        document.querySelector('.resultado').style.display = 'block';
    });
});
