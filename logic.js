"use strict";

var elements = {};

function cacheElements() {
	elements.preview = {
		rocket: document.querySelector('#rocket'),
		cone: document.querySelector('#cone'),
		compartments: document.querySelector('#compartments'),
		engines: document.querySelector('#engines'),
		tag: document.querySelector('#tag')
	};
	elements.inputs = {
		configurator: document.querySelector('#configurator'),
		compartments: document.querySelector('#input_compartments'),
		cones: document.querySelectorAll('#configurator .cone'),
		engines: document.querySelectorAll('#configurator .engine'),
		engines_count: document.querySelector('#input_engines_count'),
		tag: document.querySelector('#input_tag'),
		tag_color: document.querySelector('#input_tag_color'),
		tag_scale: document.querySelector('#input_tag_scale')
	};
	elements.templates = {
		compartment: document.querySelector('TEMPLATE.compartment'),
		burn: document.querySelector('TEMPLATE.burn')
	};
	elements.curtain = document.querySelector('#curtain');
}

function setEvents() {
	elements.inputs.compartments.addEventListener('input', handleCompartmentsChange);
	elements.inputs.cones.forEach(cone => cone.addEventListener('click', handleConeChange));
	elements.inputs.engines.forEach(engine => engine.addEventListener('click', handleEnginesChange));
	elements.inputs.engines_count.addEventListener('change', handleEnginesChange);
	elements.inputs.tag.addEventListener('input', handleTagChange);
	elements.inputs.tag_color.addEventListener('input', handleTagColorChange);
	elements.inputs.tag_scale.addEventListener('input', handleTagScaleChange);
	document.querySelector('#igniter').addEventListener('click', ignite);
	elements.curtain.addEventListener('transitionend', () => elements.preview.rocket.classList.add('ignite'));
	elements.preview.rocket.addEventListener('animationend', () => elements.curtain.classList.add('postlaunch'));
}

function handleCompartmentsChange() {
	elements.inputs.compartments.nextElementSibling.value = elements.inputs.compartments.value;
	var avail_compartments_count = elements.preview.compartments.querySelectorAll('SVG').length;
	while (avail_compartments_count != elements.inputs.compartments.value) {
		if (avail_compartments_count < elements.inputs.compartments.value) {
			elements.preview.compartments.appendChild(document.importNode(elements.templates.compartment.content, true));
			avail_compartments_count++;
		} else {
			elements.preview.compartments.querySelector('SVG').remove();
			avail_compartments_count--;
		}
	}
}

function handleConeChange() { /*jshint validthis:true */
	var active_cone = elements.inputs.configurator.querySelector('.cone.active');
	if (active_cone) {
		active_cone.classList.remove('active');
	}
	this.classList.add('active');
	elements.preview.cone.innerHTML = this.innerHTML;
}

function handleEnginesChange() { /*jshint validthis:true */
	var active_engine = elements.inputs.configurator.querySelector('.engine.active');
	elements.preview.engines.innerHTML = '';
	if (this.classList.contains('engine')) {
		if (active_engine) {
			active_engine.classList.remove('active');
		}
		this.classList.add('active');
		active_engine = this;
	}
	for (let i = +elements.inputs.engines_count.value; i-- > 0;) {
		let engine = document.importNode(active_engine, true);
		engine.firstElementChild.appendChild(document.importNode(elements.templates.burn.content.querySelector('path'), true));
		elements.preview.engines.appendChild(engine);
	}
}

function handleTagChange() { /*jshint validthis:true */
	elements.preview.tag.innerText = this.value.split('').join('\n');
}

function handleTagColorChange() { /*jshint validthis:true */
	elements.preview.tag.style.color = this.value;
}

function handleTagScaleChange() { /*jshint validthis:true */
	elements.preview.tag.style.transform = 'scaleX(' + this.value + ')';
}

function ignite() {
	if (!elements.preview.cone.childElementCount) {
		window.alert('Can\'t fly without a nose!');
		return;
	}
	if (!elements.preview.compartments.querySelector('SVG')) {
		window.alert('No body, no party!');
		return;
	}
	if (!elements.preview.engines.childElementCount) {
		window.alert('No can do without engines! Obviously.');
		return;
	}
	elements.curtain.classList.add('up');
}

function initValues() {
	elements.inputs.compartments.nextElementSibling.value = elements.inputs.compartments.value;
	elements.preview.tag.style.color = elements.inputs.tag_color.value;
	elements.preview.tag.style.transform = 'scaleX(' + elements.inputs.tag_scale.value + ')';
}

document.addEventListener('DOMContentLoaded', () => {
	cacheElements();
	initValues();
	setEvents();
});