    const table = document.getElementById('imageTable'); // Séléctionne la balise pour y integrer le code générer par le javascript
    const imagePointInterrogation = 'assets/images/question-mark.webp'; // Image du point d'interrogation

    //Tableau des cartes avec un identifiant et le liens de l'image
    let tableauCarte = new Map([
        [1, ['penguin', 'assets/images/penguin.webp']],
        [2, ['penguin', 'assets/images/penguin.webp']],
        [3, ['kangourou', 'assets/images/kangourou.webp']],
        [4, ['kangourou', 'assets/images/kangourou.webp']],
        [5, ['baleine', 'assets/images/baleine.webp']],
        [6, ['baleine', 'assets/images/baleine.webp']],
        [7, ['bouledoguefr', 'assets/images/bouledoguefr.webp']],
        [8, ['bouledoguefr', 'assets/images/bouledoguefr.webp']],
        [9, ['girafe', 'assets/images/girafe.webp']],
        [10, ['girafe', 'assets/images/girafe.webp']],
        [11, ['perroquet', 'assets/images/perroquet.webp']],
        [12, ['perroquet', 'assets/images/perroquet.webp']]
    ]);

    // Mélanger les clés de la Map
    let tableauMelange = Array.from(tableauCarte.keys()).sort(() => Math.random() - 0.5);

    // Gestion du comportement des cartes
    let carteUn = null;
    let carteDeux = null;
    let stopClick = false; // Empêcher le clic multiple

    // Création de la grille html
    for (let row = 0; row < 3; row++) { // Création des lignes
        const tr = document.createElement('tr');
        for (let col = 0; col < 4; col++) {  //Création des colonnes
            if (tableauMelange.length === 0) break;

            const td = document.createElement('td');
            const card = document.createElement('div');
            card.classList.add('card');
            const front = document.createElement('img');
            const back = document.createElement('img');

            const key = tableauMelange.pop(); // Prendre une clé mélangée
            const name = tableauCarte.get(key)[0]; // Nom de l'animal

            front.src = tableauCarte.get(key)[1]; 
            front.classList.add('front');
            back.src = imagePointInterrogation
    ;

            card.appendChild(front);
            card.appendChild(back);
            td.appendChild(card);
            tr.appendChild(td);

            card.dataset.name = name; // Stocker le nom de l'image

            card.addEventListener('click', handleCardClick);
        }
        table.appendChild(tr);
        if (tableauMelange.length === 0) break;
    }

    // Fonction gestion du clique
    function handleCardClick(event) {
        if (stopClick) return;
        const clickedCard = event.currentTarget;
        if (clickedCard === carteUn) return; // Empêcher le double-clic sur la même carte

        clickedCard.classList.add('flipped'); // CSS qui retourne la carte

        // Conditions qui enregistre le premier clic et attend le seconde clic
        if (!carteUn) {
            carteUn = clickedCard;
            return;
        }

        carteDeux = clickedCard;
        stopClick = true;

        // Conditions qui vérifie la correspondance des cartes avec les noms du tableau
        if (carteUn.dataset.name === carteDeux.dataset.name) {
            disableCards();
        } else {
            unflipCards();
        }
    }

    // Fonction qui désactive les cartes en CSS qui correspondent
    function disableCards() {
        carteUn.removeEventListener('click', handleCardClick);
        carteDeux.removeEventListener('click', handleCardClick);
        resetBoard();
    }

    // Fonction qui retourne en CSS les cartes qui ne correspondent pas
    function unflipCards() {
        setTimeout(() => {
            carteUn.classList.remove('flipped');
            carteDeux.classList.remove('flipped');
            resetBoard();
        }, 1000);
    }

    // Fonction qui réinitialise le retournement des cartes
    function resetBoard() {
        [carteUn, carteDeux, stopClick] = [null, null, false];
    }
