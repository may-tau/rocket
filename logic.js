"use strict";

var elements = {};

function cacheElements() {
	elements.preview = {
		cone: document.querySelector('#cone'),
		compartments: document.querySelector('#compartments'),
		rocket_name: document.querySelector('#rocket_name'),
		engines: document.querySelector('#engines')
	};
	elements.inputs = {
		configurator: document.querySelector('#configurator'),
		compartments: document.querySelector('#input_compartments'),
		cones: document.querySelectorAll('#configurator .cone'),
		engines: document.querySelectorAll('#configurator .engine'),
		engines_count: document.querySelector('#input_engines_count')
	};
	elements.templates = {
		compartment: document.querySelector('TEMPLATE.compartment')
	};
}

function setEvents() {
	elements.inputs.compartments.addEventListener('input', handleCompartmentsChange);
	elements.inputs.cones.forEach(cone => cone.addEventListener('click', handleConeChange));
	elements.inputs.engines.forEach(engine => engine.addEventListener('click', handleEnginesChange));
	elements.inputs.engines_count.addEventListener('change', handleEnginesChange);
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
		elements.preview.engines.appendChild(document.importNode(active_engine, true));
	}
}

function initValues() {
	var input_compartments = document.querySelector('#input_compartments');
	input_compartments.nextElementSibling.value = input_compartments.value;
}

document.addEventListener('DOMContentLoaded', () => {
	cacheElements();
	initValues();
	setEvents();
});