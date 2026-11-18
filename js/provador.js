/*jslint browser: true, white: true, long: true, single: false, this: true */
/*global document */

function Avatar(nome) {
    "use strict";
    this.nome = nome;
    this.tomPele = "Clara";
    this.tipoCorpo = "medio";
    this.pecasVestidas = {
        acessorio: null,
        bottom: null,
        top: null
    };
}

Avatar.prototype.setTomPele = function (nomeTom) {
    "use strict";
    this.tomPele = nomeTom;
};

Avatar.prototype.setTipoCorpo = function (tipo) {
    "use strict";
    this.tipoCorpo = tipo;
};

Avatar.prototype.alternarPeca = function (tipo, nomePeca) {
    "use strict";
    if (this.pecasVestidas[tipo] === nomePeca) {
        this.pecasVestidas[tipo] = null;
    } else {
        this.pecasVestidas[tipo] = nomePeca;
    }
};

Avatar.prototype.limpar = function () {
    "use strict";
    this.pecasVestidas.top = null;
    this.pecasVestidas.bottom = null;
    this.pecasVestidas.acessorio = null;
};

Avatar.prototype.obterStatus = function () {
    "use strict";
    var nomeCorpo;
    var vestidas;
    var self = this;

    if (this.tipoCorpo === "magro") {
        nomeCorpo = "Fino";
    } else if (this.tipoCorpo === "curvo") {
        nomeCorpo = "Curvilíneo";
    } else {
        nomeCorpo = "Médio";
    }

    vestidas = Object.keys(this.pecasVestidas).map(function (chave) {
        return self.pecasVestidas[chave];
    }).filter(Boolean);

    if (vestidas.length === 0) {
        return "Avatar: Corpo " + nomeCorpo + " | Pele " + this.tomPele + " | Sem roupas";
    }
    return "Avatar: Corpo " + nomeCorpo + " | Pele " + this.tomPele + " | Vestindo: " + vestidas.join(", ");
};

var avatar = new Avatar("Modelo Y2K");

var svgsColecao = {
    acessorio: {
        chapeu: "<svg viewBox=\"0 0 200 380\"><path d=\"M55 45 Q100 25 145 45 Q100 60 55 45 Z\" fill=\"#f7f06d\" stroke=\"#000\" stroke-width=\"3\"/><path d=\"M72 40 C72 15 128 15 128 40 Z\" fill=\"#f7f06d\" stroke=\"#000\" stroke-width=\"3\"/></svg>"
    },
    bottom: {
        calca: "<svg viewBox=\"0 0 200 380\"><path d=\"M76 160 L124 160 L120 360 L102 360 L100 220 L98 220 L80 360 L76 360 Z\" fill=\"#4cd137\" stroke=\"#000\" stroke-width=\"3\"/></svg>",
        saia: "<svg viewBox=\"0 0 200 380\"><path d=\"M75 160 L125 160 L145 260 L55 260 Z\" fill=\"#c782e8\" stroke=\"#000\" stroke-width=\"3\"/></svg>"
    },
    top: {
        blusa: "<svg viewBox=\"0 0 200 380\"><path d=\"M70 85 L130 85 L122 160 L78 160 Z\" fill=\"#ff6b8b\" stroke=\"#000\" stroke-width=\"3\"/></svg>",
        vestido: "<svg viewBox=\"0 0 200 380\"><path d=\"M70 85 L130 85 L140 260 L60 260 Z\" fill=\"#00a8ff\" stroke=\"#000\" stroke-width=\"3\"/></svg>"
    }
};

document.addEventListener("DOMContentLoaded", function () {
    "use strict";
    var statusTexto = document.getElementById("descricaoLookStatus");
    var selectTipoCorpo = document.getElementById("selectTipoCorpo");
    var botoesPele = document.querySelectorAll(".btn-pele");
    var cardsClique = document.querySelectorAll(".card-item-clique");
    var btnLimparStage = document.getElementById("btnLimparStage");

    var camadaTop = document.getElementById("camadaTop");
    var camadaBottom = document.getElementById("camadaBottom");
    var camadaAcessorio = document.getElementById("camadaAcessorio");

    var parteTronco = document.getElementById("peleTronco");
    var partePernaEsq = document.getElementById("pelePernaEsq");
    var partePernaDir = document.getElementById("pelePernaDir");
    var partesPele = [
        document.getElementById("peleCabeca"),
        parteTronco,
        partePernaEsq,
        partePernaDir
    ];

    var feedGaleria = document.getElementById("feedGaleria");
    var btnSetaEsq = document.getElementById("btnSetaEsq");
    var btnSetaDir = document.getElementById("btnSetaDir");

    function atualizarStatusUI() {
        if (statusTexto) {
            statusTexto.textContent = avatar.obterStatus();
        }
    }

    if (selectTipoCorpo) {
        selectTipoCorpo.addEventListener("change", function () {
            var tipo = selectTipoCorpo.value;
            avatar.setTipoCorpo(tipo);

            if (tipo === "magro") {
                parteTronco.setAttribute("d", "M78 85 L122 85 L114 220 L86 220 Z");
                partePernaEsq.setAttribute("x", "84");
                partePernaEsq.setAttribute("width", "13");
                partePernaDir.setAttribute("x", "103");
                partePernaDir.setAttribute("width", "13");
            } else if (tipo === "curvo") {
                parteTronco.setAttribute("d", "M62 85 L138 85 C150 140 142 180 128 220 C108 230 92 230 72 220 C58 180 50 140 62 85 Z");
                partePernaEsq.setAttribute("x", "72");
                partePernaEsq.setAttribute("width", "22");
                partePernaDir.setAttribute("x", "106");
                partePernaDir.setAttribute("width", "22");
            } else {
                parteTronco.setAttribute("d", "M70 85 L130 85 L120 220 L80 220 Z");
                partePernaEsq.setAttribute("x", "78");
                partePernaEsq.setAttribute("width", "18");
                partePernaDir.setAttribute("x", "104");
                partePernaDir.setAttribute("width", "18");
            }
            atualizarStatusUI();
        });
    }

    botoesPele.forEach(function (btn) {
        btn.addEventListener("click", function () {
            var hexCor = btn.getAttribute("data-cor");
            var nomeTom = btn.getAttribute("data-nome");

            partesPele.forEach(function (parte) {
                if (parte) {
                    parte.setAttribute("fill", hexCor);
                }
            });

            avatar.setTomPele(nomeTom);
            atualizarStatusUI();
        });
    });

    cardsClique.forEach(function (card) {
        card.addEventListener("click", function () {
            var tipo = card.getAttribute("data-tipo");
            var id = card.getAttribute("data-id");
            var nome = card.getAttribute("data-nome");

            var camadaDestino = camadaTop;
            if (tipo === "bottom") {
                camadaDestino = camadaBottom;
            } else if (tipo === "acessorio") {
                camadaDestino = camadaAcessorio;
            }

            if (card.classList.contains("vestido")) {
                card.classList.remove("vestido");
                camadaDestino.innerHTML = "";
                avatar.alternarPeca(tipo, nome);
            } else {
                document.querySelectorAll(".card-item-clique[data-tipo=\"" + tipo + "\"]").forEach(function (c) {
                    c.classList.remove("vestido");
                });

                card.classList.add("vestido");
                camadaDestino.innerHTML = svgsColecao[tipo][id];
                avatar.alternarPeca(tipo, nome);
            }

            atualizarStatusUI();
        });
    });

    if (btnLimparStage) {
        btnLimparStage.addEventListener("click", function () {
            camadaTop.innerHTML = "";
            camadaBottom.innerHTML = "";
            camadaAcessorio.innerHTML = "";
            cardsClique.forEach(function (c) {
                c.classList.remove("vestido");
            });
            avatar.limpar();
            atualizarStatusUI();
        });
    }

    if (feedGaleria && btnSetaEsq && btnSetaDir) {
        btnSetaEsq.addEventListener("click", function () {
            feedGaleria.scrollBy({behavior: "smooth", left: -260});
        });

        btnSetaDir.addEventListener("click", function () {
            feedGaleria.scrollBy({behavior: "smooth", left: 260});
        });
    }
});