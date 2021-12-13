import { Overlay } from './lib/overlay';
import { config  } from './lib/config';

export class DidomIframe {

    /**
     * 
     */
    constructor() {
        this.cookies = config;
        this.initializeEvents();
    }

    /**
     * 
     */
    initializeEvents() {
        let $this = this;
        document.addEventListener('DOMNodeInserted', function (e) {
            if(e.target.nodeName === 'IFRAME') {
                let vendor = $this.haveToConsentAndWhich(e.target);
                if (vendor) {
                    $this.block(vendor, e.target);
                }                 
            }
        })
        document.addEventListener('DOMContentLoaded', function (e) {
            let pattern = [];
            for (const key in $this.cookies) {
                pattern.push($this.cookies[key].pattern);
            }   
            let iframes = document.querySelectorAll(pattern.join(','));
            for (let i = 0; i < iframes.length; i++) {
                let vendor = $this.haveToConsentAndWhich(iframes[i]);
                if (vendor) {
                    $this.block(vendor, iframes[i]);
                }   
            }    
        })
    }

    /**
     * 
     * @param {*} iframe 
     * @returns 
     */
    haveToConsentAndWhich(iframe) {
        for (const key in this.cookies) {
            let regex = new RegExp(this.cookies[key].url);
            let res = regex.test(iframe.src);
            if (regex.test(iframe.src)) {
                return this.cookies[key];
            }
        }   
        return false
    }

    /**
     * 
     * @param {*} vendor 
     * @param {*} iframe 
     */
    block(vendor, iframe) {
        console.log(`block ${vendor.id}`)
        let iframeClone = iframe.cloneNode(); 
        iframeClone.src = '';
        iframeClone.dataset.src = iframe.src;
        let overlay = new Overlay(200,300);
        let newNode = document.createElement('div');
        newNode.classList.add('di-container',`di-container-${vendor.id}`);
        newNode.append(overlay, iframeClone); 
        iframe.after(newNode);
        iframe.remove();

        // Create the "didomiOnReady" listener
        window.didomiOnReady = window.didomiOnReady || [];
        window.didomiOnReady.push(function (Didomi) {

            // Subscribe to the vendor status : It triggers the listener each time the status is changed for this vendor.
            Didomi.getObservableOnUserConsentStatusForVendor(vendor.name)
            .subscribe(function (consentStatus) {
                // Check if the "consentStatus" is true (eg. the user agreed to the vendor & his purposes)
                if (consentStatus === true) {
                    // Get the youtube iframe with a 'data-src' attribute
                    let iframe = newNode.querySelector('iframe[data-src]');
                    // Get the 'data-src' value
                    let src = iframe.getAttribute('data-src');
                    // Set the 'data-src' value to the 'src' attribute
                    iframe.setAttribute('src', src);
                    // Hide the overlay
                    newNode.querySelector('.di-consent-overlay').style.display = 'none';
                }
            })
        });

        // An event listener is attached to each button element
        newNode.querySelectorAll('.di-consent-overlay-accept-button').forEach(function(button) {
            button.addEventListener('click', function() {
                // Get all the vendor purposes
                var purposes = Didomi.getVendorById(vendor.name).purposeIds;
                // Create a "transaction"...
                var transaction = Didomi.openTransaction();
                // ... enable the vendor
                transaction.enableVendor(vendor.name);
                // ... and all his purposes
                transaction.enablePurposes(...purposes);
                // update the new status using "commit"
                transaction.commit();
            })
        })
    } 

}