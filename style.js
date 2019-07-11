// ==UserScript==
// @name         Trello CC
// @namespace    http://tampermonkey.net/
// @version      2.1
// @description  Script per colorare le colonne in Trello
// @author       MS
// @match        https://trello.com/*
// @grant        none
// ==/UserScript==
var colorsList;
var trInterval;
var colorsUrl = 'https://raw.githubusercontent.com/marcoscarcellac/trelloStyle/master/colorList.json';

(function () {
    'use strict';

    fetch(colorsUrl).then((response) => {
        response.json().then((data) => {
            colorsList = data;
        });
    })
        .catch((err) => { l(err) });

    let bLinks = document.querySelector('.Hfs3HipWTh7Sr-');
    bLinks.addEventListener('click', function () {
        trInterval = setInterval(colorizeTrello, 1000);
    })
    trInterval = setInterval(colorizeTrello, 1000);


})();

function l(log) {
    console.dir(log);
}

function colorizeTrello() {
    var listTitle = document.querySelectorAll(".js-list-name-input");
    let boardName = window.location.href.split('/')[window.location.href.split('/').length - 2];
    if (listTitle.length > 0) {
        listTitle.forEach(function (col) {
            var colName = col.innerHTML;
            let rgb, colorHex, etxText, colorMedia;
            let boardData = colorsList[boardName];
            let color = boardData.colors[colName];
            if (color) {
                if (color.split('#').length > 1) {
                    colorHex = color.split('#')[1];
                    rgb = [
                        parseInt(colorHex.substring(0, 2), 16),
                        parseInt(colorHex.substring(2, 4), 16),
                        parseInt(colorHex.substring(2, 4), 16)
                    ];
                } else {
                    rgb = color.split(",");
                }
                colorMedia = (parseInt(rgb[0]) + parseInt(rgb[1]) + parseInt(rgb[2])) / 3;
                if (colorMedia < 150) {
                    etxText = 'white';
                } else {
                    etxText = '#37383a';
                }
                col.parentNode.parentNode.querySelector('.js-add-a-card').style.color = etxText;
                col.parentNode.parentNode.querySelector('.js-add-another-card').style.color = etxText;
                col.parentNode.parentNode.querySelector('.icon-add').style.color = etxText;
                col.style.color = etxText;
                col.parentNode.parentNode.style.background = "rgba(" + rgb.join() + ")";
                if (boardData.background) {
                    let background = document.querySelector('#trello-root');
                    background.style.backgroundImage = 'url("' + boardData.background + '")';
                    background.style.backgroundSize = 'cover !important';
                }
            }
        });
        clearInterval(trInterval);
    }
}