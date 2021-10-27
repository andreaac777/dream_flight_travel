window.onload = () => {
  if(sessionStorage.user){
      user = JSON.parse(sessionStorage.user);
      if(compareToken(user.authToken, user.email)){
          location.replace('/');
      }
  }
}

const loader = document.querySelector('.loader');

const submitBtn = document.querySelector('.submit-btn');
const username = document.querySelector('#name') || null;
const email = document.querySelector('#email');
const password = document.querySelector('#password');
const confirmPassword = document.querySelector('#confirm_password') || null;
const tac = document.querySelector('#terms-and-cond') || null;
const notification = document.querySelector('#notification') || null;

const regex = {
	user: /^[a-zA-Z0-9]{6,30}$/,
	mail: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  pass: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,}$/,
};

submitBtn.addEventListener('click', () => {
  if(username != null){
    if (!username.value.length){
      showAlert('Campo obligatorio');
    } else if (!regex.user.test(username.value)){
      showAlert('El nombre de usuario debe tener entre 4 y 30 caracteres alfanuméricos');
    } else if (!email.value.length){
      showAlert('Campo obligatorio');
    } else if (!regex.mail.test(email.value)){
      showAlert('Verifique que su correo electrónico tenga el formato: usuario@correo.com');
    } else if (!password.value.length){
      showAlert('Campo obligatorio');
    } else if (!regex.pass.test(password.value)){
      showAlert('La contraseña debe tener al menos una letra mayúscula, una letra minúscula, un número y una longitud mínima de 8 caracteres');
    } else if (!confirmPassword.value.length){
      showAlert('Campo obligatorio');
    } else if (password.value != confirmPassword.value){
      showAlert('Las contraseñas no coinciden');
    } else if (!tac.checked){
      showAlert('Debe aceptar los términos y condiciones');
    } else{
      loader.style.display = 'block';
      sendData('/registros', {
          name: username.value,
          email: email.value,
          password: password.value,
          confirmPassword: confirmPassword.value,
          tac: tac.checked,
          notification: notification.checked
      })
    }
  } else{
    if(!email.value.length || !password.value.length){
        showAlert('Complete todos los campos');
    } else{
      loader.style.display = 'block';
      sendData('/login', {
        email: email.value,
        password: password.value,
      }) 
    }
  }
})

const sendData = (path, data) => {
    fetch(path, {
        method: 'post',
        headers: new Headers({'Content-Type': 'application/json'}),
        body: JSON.stringify(data)
    }).then((res) => res.json())
    .then(response => {
        processData(response);
    })
}

const processData = (data) => {
    loader.style.display = null;
    if(data.alert){
        showAlert(data.alert);
    } else if(data.name){
      data.authToken = generateToken(data.email);
      sessionStorage.user = JSON.stringify(data);
      location.replace('/');
  }
}

const showAlert = (msg) => {
    let alertBox = document.querySelector('.alert-box');
    let alertMsg = document.querySelector('.alert-msg');
    alertMsg.innerHTML = msg;
    alertBox.classList.add('show');
    setTimeout(() => {
        alertBox.classList.remove('show');
    }, 5000);
}