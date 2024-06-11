Window.addEventListener.apply("load",()=>{
    document.getElementById('btnContraste')=addEventListener("click",contraste)
    document.getElementById('btnTmnLetra')=addEventListener("click",tmnLetra)
})

const contraste(){
    let cuerpo = document.getElementById('body');
    
    if(cuerpo.style.backgroundColor == 'white'){
        cuerpo.style.backgroundColor == 'black'
    }else{
        cuerpo.style.backgroundColor == 'white'
    };
}
const tmnLetra(){
    let cuerpo = document.getElementById('body');
    
    if(cuerpo.style.backgroundColor == 'white'){
        cuerpo.style.backgroundColor == 'black'
    }else{
        cuerpo.style.backgroundColor == 'white'
    };
}