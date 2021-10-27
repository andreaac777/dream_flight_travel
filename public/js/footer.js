const createFooter = () => {
    let footer = document.querySelector('footer');

    footer.innerHTML = `
    <div id="footer">
		<div class="container">
			<div class="row row-bottom-padded-md">
				<div class="col-md-2 col-sm-2 col-xs-12 fh5co-footer-link">
					<h3><a href="about.html">Sobre nosotros</a></h3>
				</div>
				<div class="col-md-2 col-sm-2 col-xs-12 fh5co-footer-link">
					<h3><a href="legal.html">Términos y condiciones</a></h3>
				</div>
				<div class="col-md-2 col-sm-2 col-xs-12 fh5co-footer-link">
					<h3><a href="data.html">Política de datos</a></h3>
				</div>
				<div class="col-md-2 col-sm-2 col-xs-12 fh5co-footer-link">
					<h3>Accesos rápidos</h3>
					<ul>
						<li><a href="tourism.html">Categorías</a></li>
						<li><a href="services.html">Servicios</a></li>
						<li><a href="guides.html">Guías turísticos</a></li>
					</ul>
				</div>
				<div class="col-md-2 col-sm-2 col-xs-12 fh5co-footer-link">
					<h3>Atención al cliente</h3>
					<ul>
						<li><a href="contact.html">Contacto</a></li>
					</ul>
				</div>
				<div class="col-md-2 col-sm-2 col-xs-12 fh5co-footer-link">
					<h3>Portal del viajero</h3>
					<ul>
						<li><a href="registros.html">Registrarse</a></li>
						<li><a href="login.html">Iniciar Sesión</a></li>
					</ul>
				</div>
			</div>
			<div class="row">
				<div class="col-md-6 col-md-offset-3 text-center">
					<p class="fh5co-social-icons">
						<a href="#"><i class="icon-twitter2"></i></a>
						<a href="#"><i class="icon-facebook2"></i></a>
						<a href="#"><i class="icon-instagram"></i></a>
						<a href="#"><i class="icon-youtube"></i></a>
					</p>
					<p>Copyright 2016 Free Html5 Module. All Rights Reserved. <br>Made with <i class="icon-heart3"></i> by Dream & Flight.</p>
				</div>
			</div>
		</div>
	</div>
    `;
}

createFooter();