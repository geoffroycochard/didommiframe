export class Overlay {
    constructor(width, height) {
        this.html = `
            <div class="di-consent-overlay-text" style="width:${width}; height="${height}">
                Viewing this video may result in cookies being placed by the vendor of the video platform to which you will be directed.
                Given the refusal of the deposit of cookies that you have expressed, in order to respect your choice, we have blocked the playback of this video.
                If you want to continue and play the video, you must give us your consent by clicking on the button below.
            </div>
            <a class="di-consent-overlay-accept-button">I accept - Launch the video</div>
        `
        let node = document.createElement('div');
        node.classList.add('di-consent-overlay');
        node.innerHTML += this.html;
        return node;
    }
}