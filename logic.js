"use strict";

var elements = {};

function cacheElements() {
	elements.preview = {
		compartments: document.querySelector('#compartments'),
		rocket_name: document.querySelector('#rocket_name')
	};
	elements.inputs = {
		compartments: document.querySelector('#input_compartments')
	};
	elements.templates = {
		compartment: document.querySelector('TEMPLATE.compartment')
	};
}

function setEvents() {
	elements.inputs.compartments.addEventListener('input', () => {
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
	});
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