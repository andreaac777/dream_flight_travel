const createNav = () => {
    let nav = document.querySelector('#fh5co-menu-wrap');

    nav.innerHTML = `
        <ul class="sf-menu" id="fh5co-primary-menu">
			<li><a href="about.html">Sobre nosotros</a></li>
			<li><a href="tourism.html" class="fh5co-sub-ddown">Categorías</a>
				<ul class="fh5co-sub-menu">
					<li><a href="t_eco.html">Turismo ecológico</a></li>
					<li><a href="t_gastro.html">Turismo gastronómico</a></li>
					<li><a href="t_histo.html">Turismo histórico</a></li>
					<li><a href="t_aventura.html">Turismo de aventura</a></li>
					<li><a href="t_art.html">Turismo artístico</a></li>
					<li><a href="t_business.html">Turismo de negocios</a></li>
				</ul>
			</li>
			<li><a href="services.html" class="fh5co-sub-ddown">Servicios</a>
				<ul class="fh5co-sub-menu">
					<li><a href="flight.html">Vuelos</a></li>
					<li><a href="hotel.html">Hoteles</a></li>
					<li><a href="autos.html">Automóviles</a></li>
					<li><a href="cruceros.html">Cruceros</a></li>
					<li><a href="motos.html">Motocicletas</a></li>
					<li><a href="bicicletas.html">Bicicletas</a></li>
					<li><a href="trenes.html">Trenes</a></li>
				</ul>
			</li>
			<li><a href="guides.html" class="fh5co-sub-ddown">Guías Turísticos</a>
				<ul class="fh5co-sub-menu">
					<li><a href="america.html">América</a></li>
					<li><a href="asia.html">Asia</a></li>
					<li><a href="europa.html">Europa</a></li>
					<li><a href="africa.html">África</a></li>
					<li><a href="oceania.html">Oceanía</a></li>
				</ul>
			</li>
			<li><a href="contact.html" class="lock">Contacto</a></li>
			<li><a href="registros.html" class="lock">Registrarse</a></li>
			<li>
				<a>
					<img src="images/user.png" id="user-img" class="lock" alt="">
					<div class="login-logout-popup hide">
						<p class="account-info">Perfil</p>
						<button class="btn-log" id="user-btn">Cerrar Sesión</button>
					</div>
				</a>
			</li>
		</ul>
    `;
}

createNav();

const userImageButton = document.querySelector('#user-img');
const userPop = document.querySelector('.login-logout-popup');
const popuptext = document.querySelector('.account-info');
const actionBtn = document.querySelector('#user-btn');

userImageButton.addEventListener('click', () => {
    userPop.classList.toggle('hide');
})

window.onload = () => {
    let user = JSON.parse(sessionStorage.user || null);
    if(user != null){
        popuptext.innerHTML = `${user.name}`;
        actionBtn.innerHTML = 'Cerrar Sesión';
        actionBtn.addEventListener('click', () =>{
            sessionStorage.clear();
            location.reload();
        })
    } else{
        popuptext.innerHTML = 'Perfil'; 
        actionBtn.innerHTML = 'Iniciar Sesión'; 
        actionBtn.addEventListener('click', () => {
            location.href = '/login';
        })
    }
}


