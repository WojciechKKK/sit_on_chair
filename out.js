/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


document.addEventListener('DOMContentLoaded', function () {

	//----------------- dodanie slidera
	var arrowLeft = document.querySelector('.triangle-left');
	var arrowRight = document.querySelector('.triangle-right');
	var listSlider = document.querySelector('ul.slider');
	var allLi = document.querySelectorAll('.slider li');
	var counter = 0;

	//usuwam style
	listSlider.style.listStyle = 'none';
	//ukrywam obazki
	for (var i = 0; i < allLi.length; i++) {
		var element = allLi[i];
		element.classList.add('unvisible');
	}
	//pokazuje pierwszy obraz
	allLi[counter].classList.add('visible');

	arrowLeft.addEventListener('click', function () {
		allLi[counter].classList.remove('visible');
		counter--;
		if (counter < 0) {
			counter = 6;
		}
		allLi[counter].classList.add('visible');
	});

	arrowRight.addEventListener('click', function () {
		allLi[counter].classList.remove('visible');
		counter++;
		if (counter > 6) {
			counter = 0;
		}
		allLi[counter].classList.add('visible');
	});

	//------------------ dodanie kalkulatora
	var rodzajFotela = document.querySelector('.panel_left .title');
	var rodzajFotelaValue = document.querySelector('.panel_right .title');
	var kolorFotela = rodzajFotela.nextElementSibling;
	var kolorFotelaValue = rodzajFotelaValue.nextElementSibling;
	var materialFotela = kolorFotela.nextElementSibling;
	var materialFotelaValue = kolorFotelaValue.nextElementSibling;
	var allUlList = document.querySelectorAll('.list_arrow');

	//tworze funkcje, która będzie wywoływana na każdej wysuwanej liście - 
	//w parametrach podaje (właściwa lista, miejscu wpisu wybranego produktu, miejscu wpisu ceny produktu, ceny produktów)
	function selectElement(dropDownList, finalPlace, finalPlaceValue, arrPrice) {
		dropDownList.addEventListener('click', function () {
			var ulList = this.parentElement.lastElementChild;
			//ukrywanie / wysuwanie listy
			if (ulList.style.display == 'block') {
				ulList.style.display = 'none';
			} else {
				ulList.style.display = 'block';

				var list = ulList.querySelectorAll('li');
				for (var i = 0; i < list.length; i++) {
					var listEl = list[i];
					listEl.addEventListener('click', function () {
						//pobieram id porzebne do pobierania cen z tabliocy
						var idNumber = this.dataset.id;
						this.parentElement.style.display = 'none';
						finalPlace.innerText = this.innerText;
						finalPlaceValue.innerText = arrPrice[idNumber];
						//addTransport(50);
						sumPrice();
					});
				}
			}
		});
	}

	//dodanie transportu
	function addTransport(priceToTransport) {
		var checkTransport = document.querySelector('#transport');
		checkTransport.addEventListener('click', function () {
			var chooseTransport = document.querySelector('.panel_left .transport');
			var chooseTransportValue = document.querySelector('.panel_right .transport');
			if (this.checked == true) {
				chooseTransport.innerText = 'Transport';
				chooseTransportValue.innerText = priceToTransport;
			} else {
				chooseTransport.innerText = '';
				chooseTransportValue.innerText = '';
			}
			sumPrice();
		});
	};

	//obliczanie i wstawianie ceny końcowej
	function sumPrice() {
		var allSum = document.querySelector('.sum strong');
		var allValue = document.querySelector('.panel_right').children;
		var total = 0;

		for (var i = 0; i < allValue.length; i++) {
			var elementPrice = allValue[i];
			if (elementPrice.innerText == '') {
				//brak ceny
			} else {
				var priceProduct = parseInt(elementPrice.innerText);
				total += priceProduct;
			}
		}
		allSum.innerText = total;
	}

	//wywołuje funkcje ustawiając wybrane przez siebie parametry(ceny):
	addTransport(50); //funkcja z ceną za transport
	selectElement(allUlList[0], rodzajFotela, rodzajFotelaValue, [150, 250, 350]); //funkcja z ceną za kolejne RODZAJE foteli
	selectElement(allUlList[1], kolorFotela, kolorFotelaValue, [85, 60, 45]); //funkcja z ceną za kolejne KOLORY foteli
	selectElement(allUlList[2], materialFotela, materialFotelaValue, [40, 20]); //funkcja z ceną za kolejne MATERIALY foteli
});

/***/ })
/******/ ]);