const loader = document.querySelector('.loader');

const submitBtn = document.querySelector('.submit-btn');
const username = document.querySelector('#name')
const email = document.querySelector('#email');
const message = document.querySelector('#message');

submitBtn.addEventListener('click', () => {
    if (!username.value.length){
        showAlert('Campo obligatorio');
    } else if (!email.value.length){
        showAlert('Campo obligatorio');
    } else if (!message.value.length){
        showAlert('Campo obligatorio');
    } else{
        loader.style.display = 'block';
        sendData('/contacto', {
            name: username.value,
            email: email.value,
            message: message.value,
        })
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
        showSuccess('Su información ha sido registrada de manera exitosa');
        username.value = '';
        email.value = '';
        message.value = '';
    }
}

const showAlert = (msg) => {
    let alertBox = document.querySelector('.alert-box');
    let alertMsg = document.querySelector('.alert-msg');
    alertMsg.innerHTML = msg;
    alertBox.classList.add('show');
    setTimeout(() => {
        alertBox.classList.remove('show');
    }, 2000);
}

const showSuccess = (msg) => {
    let successBox = document.querySelector('.success-box');
    let successMsg = document.querySelector('.success-msg');
    successMsg.innerHTML = msg;
    successBox.classList.add('show');
    setTimeout(() => {
        successBox.classList.remove('show');
    }, 3000);
}