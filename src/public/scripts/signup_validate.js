const inputs = document.querySelectorAll('#signup-form .input--fw');
const form = document.getElementById('signup-form');

const regEx = {
    first_names: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, //Solo se permiten, letras, espacios y acentos
    last_name: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, //Solo se permiten, letras, espacios y acentos
    mail: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
    identification: /^\d{7,14}$/, // 6 a 14 numeros.
    password: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&/%])[A-Za-z\d@$!%*#?&/%]{8,}$/ // Mínimo 8 dígitos, con una letra, un número y un caracter especial
};

const fields = {
    user_first_name: false, 
    user_last_name: false, 
    user_email: false, 
    user_identification_document: false, 
    user_password: false
}

const validateForm = (e) => {
    switch (e.target.name) {
        case 'user_first_name':
            validateField(regEx.first_names, e.target, e.target.name); 
            break;

        case 'user_last_name':
            validateField(regEx.last_name, e.target, e.target.name); 
            break;

        case 'user_identification_document':
            validateField(regEx.identification, e.target, e.target.name); 
            break;

        case 'user_email':
            validateField(regEx.mail, e.target, e.target.name); 
            break;

        case 'user_password':
            validateField(regEx.password, e.target, e.target.name); 
            break;
    }
};

const validateField = (regEx, input, field) => { 
    if(regEx.test(input.value)){
        //Si es correcto
        fields[field] = true; 
        document.getElementById(`${field}-group`).classList.remove('form-group--incorrect'); 
        document.getElementById(`${field}-group`).classList.add('form-group--correct'); 
        document.querySelector(`#${field}-group .form-group__error-message`).classList.remove('form-group__error-message--active'); 
    }else{
        fields[field] = false; 
        document.getElementById(`${field}-group`).classList.remove('form-group--correct'); 
        document.getElementById(`${field}-group`).classList.add('form-group--incorrect'); 
        document.querySelector(`#${field}-group .form-group__error-message`).classList.add('form-group__error-message--active'); 
    }
}

inputs.forEach((input) => {
    input.addEventListener('keyup', validateForm);
    input.addEventListener('blur', validateForm);
});

form.addEventListener('submit', (e) => {
    //Verificar que todos los campos sean correctos
    console.log(fields); 
    if(fields.user_first_name && fields.user_last_name && fields.user_email && fields.user_identification_document && fields.user_password){
        this.submit(); 
    }else{
        e.preventDefault(); 
        document.querySelector('.form__error-message').classList.add('form-group__error-message--active');
        
        setTimeout(() => {
            document.querySelector('.form__error-message').classList.remove('form-group__error-message--active');
        }, 5000);
    }
});

