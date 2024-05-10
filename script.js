document.addEventListener('DOMContentLoaded', function () {
    const addBookBtn = document.getElementById('add-book-btn');
    const modal = document.getElementById('add-book-modal');
    const closeBtn = document.getElementsByClassName('close')[0];
    const addBookForm = document.getElementById('add-book-form');
    const bookList = document.getElementById('book-list');

    // Afficher le modal lors du clic sur le bouton "Ajouter un Livre"
    addBookBtn.addEventListener('click', () => {
        modal.style.display = 'block';
    });

    // Fermer le modal lors du clic sur le bouton de fermeture
    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    // Fermer le modal lors du clic en dehors de celui-ci
    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });

    // Ajouter un livre
    addBookForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const name = document.getElementById('name').value;
        const title = document.getElementById('title').value;
        const author = document.getElementById('author').value;
        const publishDate = document.getElementById('publish-date').value;

        // Créer une nouvelle ligne pour le livre
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${name}</td>
            <td>${title}</td>
            <td>${author}</td>
            <td>${publishDate}</td>
            <td><button class="edit-btn">Modifier</button></td>
            <td><button class="delete-btn">Supprimer</button></td>

        `;
        bookList.appendChild(row);

        // Sauvegarder les données dans le localStorage
        saveDataToLocalStorage();

        // Réinitialiser le formulaire et fermer le modal
        addBookForm.reset();
        modal.style.display = 'none';
    });




// Supprimer ou Modifier un livre
bookList.addEventListener('click', (event) => {
    if (event.target.classList.contains('delete-btn')) {
        event.target.parentElement.parentElement.remove();
        saveDataToLocalStorage();
    } else if (event.target.classList.contains('edit-btn')) {
        // Récupérer les détails du livre à modifier
        const currentRow = event.target.parentElement.parentElement;
        const name = currentRow.cells[0].textContent;
        const title = currentRow.cells[1].textContent;
        const author = currentRow.cells[2].textContent;
        const publishDate = currentRow.cells[3].textContent;

        // Pré-remplir le formulaire de modification avec les détails du livre
        document.getElementById('name').value = name;
        document.getElementById('title').value = title;
        document.getElementById('author').value = author;
        document.getElementById('publish-date').value = publishDate;

        // Afficher le modal de modification
        modal.style.display = 'block';

        // Modifier les détails du livre après soumission du formulaire de modification
        addBookForm.removeEventListener('submit', addBookFormSubmitHandler); // Supprimer l'ancien gestionnaire d'événements
        addBookForm.addEventListener('submit', editBookFormSubmitHandler); // Ajouter un nouveau gestionnaire d'événements
    }
});

// Gestionnaire d'événements pour soumission du formulaire de modification
function editBookFormSubmitHandler(event) {
    event.preventDefault();
    const name = document.getElementById('name').value;
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const publishDate = document.getElementById('publish-date').value;

    // Mettre à jour les détails du livre dans le tableau
    const editedRow = bookList.querySelector('tr.editing');
    editedRow.cells[0].textContent = name;
    editedRow.cells[1].textContent = title;
    editedRow.cells[2].textContent = author;
    editedRow.cells[3].textContent = publishDate;

    // Mettre à jour les données dans le localStorage
    saveDataToLocalStorage();

    // Réinitialiser le formulaire et fermer le modal
    addBookForm.reset();
    modal.style.display = 'none';

    // Rétablir le gestionnaire d'événements pour soumission du formulaire d'ajout
    addBookForm.removeEventListener('submit', editBookFormSubmitHandler);
    addBookForm.addEventListener('submit', addBookFormSubmitHandler);
}

// Fonction pour sauvegarder les données dans le localStorage
function saveDataToLocalStorage() {
    const bookRows = bookList.querySelectorAll('tr');
    const books = [];
    bookRows.forEach((row) => {
        const book = {
            name: row.cells[0].textContent,
            title: row.cells[1].textContent,
            author: row.cells[2].textContent,
            publishDate: row.cells[3].textContent
        };
        books.push(book);
    });
    localStorage.setItem('books', JSON.stringify(books));
}


    // Charger les données depuis le localStorage lors du chargement de la page
    loadDataFromLocalStorage();

    // Fonction pour sauvegarder les données dans le localStorage
    function saveDataToLocalStorage() {
        const bookRows = bookList.querySelectorAll('tr');
        const books = [];
        bookRows.forEach((row) => {
            const book = {
                name: row.cells[0].textContent,
                title: row.cells[1].textContent,
                author: row.cells[2].textContent,
                publishDate: row.cells[3].textContent
            };
            books.push(book);
        });
        localStorage.setItem('books', JSON.stringify(books));
    }

    // Fonction pour charger les données depuis le localStorage
    function loadDataFromLocalStorage() {
        const books = JSON.parse(localStorage.getItem('books'));
        if (books) {
            books.forEach((book) => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${book.name}</td>
                    <td>${book.title}</td>
                    <td>${book.author}</td>
                    <td>${book.publishDate}</td>
                    <td><button class="delete-btn btn- btn-warning">Supprimer</button></td>
                `;
                bookList.appendChild(row);
            });
        }
    }
});



