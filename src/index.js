import { DidomIframe } from './didomiframe';

let instance = new DidomIframe({
    "vendors": {
        "rr": {
            "pattern": "rrrrr"
        }
    },
    "design": {
        'overlay': {
            'backgroundColor': 'rgba(0,0,0,0.1)',
        },
        'button': {
            'backgroundColor': '#345690',
            'color': 'black'
        }
    },
    "didomi": {
        "test": "rrrr"
    }
});

console.log('yo');
