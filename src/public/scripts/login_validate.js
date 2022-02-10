const inputs = document.querySelectorAll('#login-form .input--fw');
const form = document.getElementById('login-form');

const regEx = {
    mail: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
    password: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&/])[A-Za-z\d@$!%*#?&/]{8,}$/ // Mínimo 8 dígitos, con una letra, un número y un caracter especial
};

const fields = {
    user_email: false, 
    user_password: false
}

const validateForm = (e) => {
    switch (e.target.name) {
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
    if(fields.user_email && fields.user_password){
        this.submit(); 
    }else{
        e.preventDefault(); 
        document.querySelector('.form__error-message').classList.add('form-group__error-message--active');
        
        setTimeout(() => {
            document.querySelector('.form__error-message').classList.remove('form-group__error-message--active');
        }, 5000);
    }
});

