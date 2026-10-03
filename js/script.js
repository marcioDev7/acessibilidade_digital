const body=document.body;
const aviso=document.getElementById("aviso");
let tamanhoFonte=16;

function mostrarAviso(mensagem){
 aviso.textContent=mensagem; aviso.classList.add("mostrar");
 clearTimeout(window.timerAviso);
 window.timerAviso=setTimeout(()=>aviso.classList.remove("mostrar"),1800);
}
function atualizarBotao(id,ativo){
 const botao=document.getElementById(id);
 if(!botao)return;
 botao.classList.toggle("ativo",ativo);
 botao.setAttribute("aria-pressed",ativo?"true":"false");
}



document.getElementById("aumentarFonte").addEventListener("click",()=>{
 if(tamanhoFonte<30){tamanhoFonte+=2;document.documentElement.style.fontSize=tamanhoFonte+"px";mostrarAviso("Fonte aumentada.");}
 else mostrarAviso("O tamanho máximo foi atingido.");
});



document.getElementById("diminuirFonte").addEventListener("click",()=>{
 if(tamanhoFonte>10){tamanhoFonte-=2;document.documentElement.style.fontSize=tamanhoFonte+"px";mostrarAviso("Fonte diminuída.");}
 else mostrarAviso("O tamanho mínimo foi atingido.");
});



document.getElementById("altoContraste").addEventListener("click",()=>{
 body.classList.toggle("alto-contraste");const ativo=body.classList.contains("alto-contraste");atualizarBotao("altoContraste",ativo);mostrarAviso(ativo?"Alto contraste ativado.":"Alto contraste desativado.");
});



document.getElementById("modoEscuro").addEventListener("click",()=>{
 body.classList.toggle("modo-escuro");const ativo=body.classList.contains("modo-escuro");atualizarBotao("modoEscuro",ativo);mostrarAviso(ativo?"Modo escuro ativado.":"Modo escuro desativado.");
});



document.getElementById("escalaCinza").addEventListener("click",()=>{
 body.classList.toggle("escala-cinza");const ativo=body.classList.contains("escala-cinza");atualizarBotao("escalaCinza",ativo);mostrarAviso(ativo?"Escala de cinza ativada.":"Escala de cinza desativada.");
});



document.getElementById("espacamento").addEventListener("click",()=>{
 body.classList.toggle("espacamento");const ativo=body.classList.contains("espacamento");atualizarBotao("espacamento",ativo);mostrarAviso(ativo?"Espaçamento aumentado.":"Espaçamento normalizado.");
});



document.getElementById("lerTexto").addEventListener("click",()=>{
 if(!("speechSynthesis" in window)){mostrarAviso("Seu navegador não possui leitor de texto.");return;}
 if(window.speechSynthesis.speaking){window.speechSynthesis.cancel();document.getElementById("lerTexto").textContent="🔊 Ler texto";mostrarAviso("Leitura interrompida.");return;}
 const fala=new SpeechSynthesisUtterance(document.querySelector("main").innerText);
 fala.lang="pt-BR";fala.rate=.9;fala.pitch=1;
 fala.onstart=()=>{document.getElementById("lerTexto").textContent="⏹️ Parar leitura";mostrarAviso("Leitura iniciada.");};
 fala.onend=()=>document.getElementById("lerTexto").textContent="🔊 Ler texto";
 window.speechSynthesis.speak(fala);
});

document.getElementById("fonteDislexia").addEventListener("click",()=>{
 body.classList.toggle("fonte-dislexia");const ativo=body.classList.contains("fonte-dislexia");atualizarBotao("fonteDislexia",ativo);mostrarAviso(ativo?"Fonte de leitura facilitada ativada.":"Fonte desativada.");
});


document.getElementById("resetar").addEventListener("click",()=>{
 body.classList.remove("alto-contraste","modo-escuro","escala-cinza","espacamento","fonte-dislexia");
 tamanhoFonte=16;document.documentElement.style.fontSize="16px";
 ["altoContraste","modoEscuro","escalaCinza","espacamento","fonteDislexia"].forEach(id=>atualizarBotao(id,false));
 if("speechSynthesis" in window)window.speechSynthesis.cancel();
 document.getElementById("lerTexto").textContent="🔊 Ler texto";
 mostrarAviso("Configurações restauradas.");
});

document.getElementById("abrirPainel").addEventListener("click",()=>document.getElementById("painelAcessibilidade").classList.add("aberto"));
document.getElementById("fecharPainel").addEventListener("click",()=>document.getElementById("painelAcessibilidade").classList.remove("aberto"));
document.addEventListener("keydown",e=>{if(e.key==="Escape")document.getElementById("painelAcessibilidade").classList.remove("aberto")});