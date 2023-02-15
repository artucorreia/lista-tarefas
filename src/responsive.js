// torna o site um
// pocuo mais responsivo

const responsive = div => {
    switch (widthViewport) {
        case 0:
            div.style.textAlign = 'justify';
            break;
        case 1:
            div.style.textAlign = 'center';
            break;
        case 2:
            div.style.textAlign = 'right';
            break;
    }
};

// "responsividade" 0=gg 1=m 2=pp
let widthViewport = 0;
;(() => {
    if (window.screen.width <= 550) {
        widthViewport = 2;
    } else if (window.screen.width <= 640) {
        widthViewport = 1;
    }
})();

export default responsive;