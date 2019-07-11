// ==UserScript==
// @name         Trello CC
// @namespace    http://tampermonkey.net/
// @version      2.1
// @description  Script per colorare le colonne in Trello
// @author       MS
// @match        https://trello.com/*
// @grant        none
// ==/UserScript==

var colorsList = {
    'mP6OY73O': {
        colors: {
            'Meeting': '66, 134, 244, 0.8',
            'Backlog': '242, 217, 31, 0.8',
            'To Do': '71, 188, 95, 0.8',
            'Monitoring': '214, 80, 70, 0.8',
            'Waiting For': '249, 247, 247, 0.8',
            'Done': '#283140'
        },
        title: 'IT Torino'
    },
    Cj5wHVCl: {
        colors: {
            'Proposte (To Do)': '242, 217, 31, 0.8',
            'In progress': '66, 134, 244, 0.8',
            'Done': '71, 188, 95, 0.8',
            'Waiting For': '249, 247, 247, 0.8',
            'Trash': '#283140'
        },
        title: 'Servant Leader Board'
    },
    QtvQm3B2: {
        colors: {
            'Backlog': '71, 188, 95, 0.8',
            'Definizione di business': '214, 80, 70, 0.8',
            'Design': '249, 247, 247, 0.8',
            'Valutazione IT (fattibilità)': '66, 134, 244, 0.8',
            'Stima HL IT': '242, 217, 31, 0.8',
            'Done': '#283140'
        },
        title: 'Feasibility Nuovo Sistema Cebi',
        background: 'https://images.unsplash.com/photo-1494278426567-8899eec9b8c6'
    }
};
var trInterval;
function l(log){
    console.dir(log);
}
function colorizeTrello(){
        var listTitle = document.querySelectorAll(".js-list-name-input");
        let boardName = window.location.href.split('/')[window.location.href.split('/').length - 2];
        if(listTitle.length > 0){
            listTitle.forEach(function(col){
                var colName = col.innerHTML;
                let rgb, colorHex, etxText, colorMedia;
                let boardData = colorsList[boardName];
                let color = boardData.colors[colName];
                if(color){
                    if(color.split('#').length > 1){
                        colorHex = color.split('#')[1];
                        rgb = [
                            parseInt(colorHex.substring(0,2),16),
                            parseInt(colorHex.substring(2,4),16),
                            parseInt(colorHex.substring(2,4),16)
                        ];
                    } else {
                        rgb = color.split(",");
                    }
                    colorMedia = (parseInt(rgb[0]) + parseInt(rgb[1]) + parseInt(rgb[2])) / 3;
                    if(colorMedia < 150){
                        etxText = 'white';
                    } else {
                        etxText = '#37383a';
                    }
                    col.parentNode.parentNode.querySelector('.js-add-a-card').style.color = etxText;
                    col.parentNode.parentNode.querySelector('.js-add-another-card').style.color = etxText;
                    col.parentNode.parentNode.querySelector('.icon-add').style.color = etxText;
                    col.style.color = etxText;
                    col.parentNode.parentNode.style.background = "rgba(" + rgb.join() + ")";
                    if(boardData.background){
                        let background = document.querySelector('#trello-root');
                        background.style.backgroundImage = 'url("' + boardData.background + '")';
                        background.style.backgroundSize = 'cover !important';
                    }
                }
            });
            clearInterval(trInterval);
        }
}
(function() {
    'use strict';
    let bLinks = document.querySelector('.Hfs3HipWTh7Sr-');
    bLinks.addEventListener('click', function(){
        trInterval = setInterval(colorizeTrello, 1000);
    })
    trInterval = setInterval(colorizeTrello, 1000);

    /*var xhReq = new XMLHttpRequest();
    xhReq.open("GET", "http://51.68.199.160/api/trelloColors.json", false);
    xhReq.send(null);
    var serverResponse = xhReq.responseText;
    l(serverResponse);*/

})();