var classificationZoom =
  '<div class="classification-zoom-window">\
		<div class="close-area">\
			<button class="classification-close-btn">\
				<span id="classification-file-name"></span>\
				<img src="../resources/imgs/annotti_trash.png" alt="close">\
			</button>\
		</div>\
		<div class="classification-canvas" id="tab-image">\
		  <canvas id="img-canvas" style="max-width: 100%; max-height: 100%;"></canvas>\
		</div>\
		<div class="classification-label-form">\
			<div class="bottom-menu" id="bottom-menu">\
				<div class="bottom-buttons" id="bottom-buttons-classification">\
					<button id="zoom-in-button"><img src="../resources/imgs/annotti_zoomin.png" alt="zoom in"></button>\
					<button id="zoom-out-button"><img src="../resources/imgs/annotti_zoomout.png" alt="zoom out"></button>\
					<button id="back-to-original-button"><img src="../resources/imgs/annotti_fullsize.png" alt="fullsize"></button>\
				</div>\
			</div>\
  	</div>\
  </div>';

module.exports = { classificationZoom };
