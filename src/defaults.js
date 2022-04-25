export default {
    "vendors": {
        "yt": { 
            "id": "yt",
            "name": "c:youtube", 
            "pattern": "iframe[src*=\"youtube\"]" ,
            "url": "youtube",
            "text": `La visualisation de cette vidéo peut entraîner l'installation de cookies par le fournisseur de la plate-forme vidéo vers laquelle vous serez dirigé.
            Compte tenu du refus du dépôt de cookies que vous avez exprimé, afin de respecter votre choix, nous avons bloqué la lecture de cette vidéo.
            Si vous souhaitez continuer et lire la vidéo, vous devez nous donner votre accord en cliquant sur le bouton ci-dessous.`,
            "button": "Accepter et lire la vidéo"
        },
        "ca": { 
            "id": "ca",
            "name": "c:calameo-RyejZgAH", 
            "pattern": "iframe[src*=\"calameo\"]" ,
            "url": "calameo",
            "text": `La visualisation de ce lecteur peut entraîner l'installation de cookies par le fournisseur de la plate-forme vidéo vers laquelle vous serez dirigé.
            Compte tenu du refus du dépôt de cookies que vous avez exprimé, afin de respecter votre choix, nous avons bloqué la lecture de cette vidéo.
            Si vous souhaitez continuer et lire la vidéo, vous devez nous donner votre accord en cliquant sur le bouton ci-dessous.`,
            "button": "Accepter et lire la publication"
        },
        "tw": { 
            "id": "tw",
            "name": "twitter", 
            "pattern": "iframe[src*=\"twitter\"]" ,
            "url": "twitter",
            "text": `La visualisation de ce twwet peut entraîner l'installation de cookies par le fournisseur de la plate-forme vidéo vers laquelle vous serez dirigé.
            Compte tenu du refus du dépôt de cookies que vous avez exprimé, afin de respecter votre choix, nous avons bloqué la lecture de cette vidéo.
            Si vous souhaitez continuer et lire la vidéo, vous devez nous donner votre accord en cliquant sur le bouton ci-dessous.`,
            "button": "Accepter et voir le tweet"
        }
    },
    "design": {
        'container': {
            'position': 'relative'
        },
        'overlay': {
            'position': 'absolute',
            'top': '0',
            'left': '0',
            'width': '100%',
            'height': '100%',
            'backgroundColor': 'black',
            'display': 'flex',
            'flexDirection': 'column',
            'justifyContent': 'center',
            'alignItems': 'center',
            'boxSizing': 'border-box',
            'padding': '0 20px',
            'color': 'white'
        },
        'text': {
            'width': '80%',
            'marginBottom': '20px',
            'textAlign': 'center'
        },
        'button': {
            'margin': '20px 0 0 0',
            'padding': '8px 10px',
            'backgroundColor': 'blue',
            'cursor': 'pointer'
        }
    },
    "didonfig": {}
}