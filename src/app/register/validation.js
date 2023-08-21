export const validateName = (name) => {
    if (name.length < 0  ) {
        return alert("Você esqueceu de preencher o nome")                           ;
    } else {
        return "";
    }
};

export const validateAge = (age) => {
    if (age < 0 || age > 120) {
        return "Idade deve estar entre 0 e 120.";
    } else {
        return "";
    }
};
// Outras funções de validação podem ser adicionadas aqui
