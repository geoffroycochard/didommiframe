import { Overlay } from './lib/overlay';
import defaults from './defaults';

export class DidomIframe {

    /**
     * 
     */
    constructor(options = {}) {
        // vendors
        this.vendors = defaults.vendors
        if (options.vendors !== undefined) {
            this.vendors = {...defaults.vendors, ...options.vendors}   
        }
        // design
        this.design = defaults.design
        if (options.design !== undefined) {
            this.design = {...defaults.design, ...options.design}   
        }
        // Didomi config
        this.didonfig = defaults.didonfig
        if (options.didonfig !== undefined) {
            this.didonfig = {...defaults.didonfig, ...options.didonfig}   
        }
        
        this.initializeEvents()
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
            for (const key in $this.vendors) {
                pattern.push($this.vendors[key].pattern);
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
        for (const key in this.vendors) {
            let regex = new RegExp(this.vendors[key].url);
            let res = regex.test(iframe.src);
            if (regex.test(iframe.src)) {
                return this.vendors[key];
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
        let  container = new Overlay(vendor,iframeClone,this.design);
        iframe.after(container);
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
                    let iframe = container.querySelector('iframe[data-src]');
                    // Get the 'data-src' value
                    let src = iframe.getAttribute('data-src');
                    // Set the 'data-src' value to the 'src' attribute
                    iframe.setAttribute('src', src);
                    // Hide the overlay
                    container.querySelector('.di-consent-overlay').style.display = 'none';
                }
            })
        });

        // An event listener is attached to each button element
        container.querySelectorAll('.di-consent-overlay-accept-button').forEach(function(button) {
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