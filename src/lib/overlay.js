export class Overlay {
    constructor(vendor, iframe, design) {

        let container = document.createElement('div');
        container.classList.add('di-container', `di-container-${vendor.id}`)
        this._insertStyle(container, design.container)
        
        let overlay = document.createElement('div')
        overlay.classList.add('di-consent-overlay')
        this._insertStyle(overlay, design.overlay)
        
        let text = document.createElement('div')
        text.classList.add('di-consent-text')
        this._insertStyle(text, design.text)
        text.innerHTML = `<p style="margin-bottom: 30px">${vendor.text}</p>`; 

        let button = document.createElement('a')
        button.classList.add('di-consent-overlay-accept-button')
        this._insertStyle(button, design.button)
        button.innerText = vendor.button

        iframe.style.display = 'block'
        text.append(button)
        overlay.append(text)
        container.append(overlay,iframe);
        return container;
    }

    _insertStyle(dom, styles) {
        for (const [key, value] of Object.entries(styles)) {
            dom.style[key] = value
        }
    }
}