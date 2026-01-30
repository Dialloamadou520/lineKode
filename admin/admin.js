// ===== Admin Configuration =====
const ADMIN_CREDENTIALS = {
    username: 'admin',
    password: 'linekode2025'
};

// ===== Authentication =====
function login(event) {
    event.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const errorEl = document.getElementById('loginError');
    
    if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
        sessionStorage.setItem('adminLoggedIn', 'true');
        sessionStorage.setItem('adminUser', username);
        window.location.href = 'dashboard.html';
    } else {
        errorEl.classList.add('show');
        setTimeout(() => errorEl.classList.remove('show'), 3000);
    }
}

function checkAuth() {
    const isLoggedIn = sessionStorage.getItem('adminLoggedIn');
    if (!isLoggedIn) {
        window.location.href = 'login.html';
    }
}

function logout() {
    sessionStorage.removeItem('adminLoggedIn');
    sessionStorage.removeItem('adminUser');
    window.location.href = 'login.html';
}

// ===== Inscriptions Management =====
function getInscriptions() {
    const inscriptions = localStorage.getItem('linekode_inscriptions');
    return inscriptions ? JSON.parse(inscriptions) : [];
}

function saveInscriptions(inscriptions) {
    localStorage.setItem('linekode_inscriptions', JSON.stringify(inscriptions));
}

function addInscription(data) {
    const inscriptions = getInscriptions();
    const newInscription = {
        id: Date.now(),
        ...data,
        status: 'pending',
        date: new Date().toISOString()
    };
    inscriptions.unshift(newInscription);
    saveInscriptions(inscriptions);
    return newInscription;
}

function updateInscriptionStatus(id, status) {
    const inscriptions = getInscriptions();
    const index = inscriptions.findIndex(i => i.id === id);
    if (index !== -1) {
        inscriptions[index].status = status;
        saveInscriptions(inscriptions);
    }
    return inscriptions;
}

function deleteInscription(id) {
    let inscriptions = getInscriptions();
    inscriptions = inscriptions.filter(i => i.id !== id);
    saveInscriptions(inscriptions);
    return inscriptions;
}

// ===== Dashboard =====
function loadDashboard() {
    const inscriptions = getInscriptions();
    
    // Update stats
    document.getElementById('totalInscriptions').textContent = inscriptions.length;
    document.getElementById('pendingInscriptions').textContent = inscriptions.filter(i => i.status === 'pending').length;
    document.getElementById('approvedInscriptions').textContent = inscriptions.filter(i => i.status === 'approved').length;
    
    // Load table
    renderInscriptionsTable(inscriptions.slice(0, 10));
}

function loadInscriptions(status = 'all') {
    let inscriptions = getInscriptions();
    
    if (status !== 'all') {
        inscriptions = inscriptions.filter(i => i.status === status);
    }
    
    renderInscriptionsTable(inscriptions, true);
}

function renderInscriptionsTable(inscriptions, showDate = false) {
    const tbody = document.getElementById('inscriptionsTable');
    const emptyState = document.getElementById('emptyState');
    const tableContent = document.getElementById('tableContent');
    
    if (inscriptions.length === 0) {
        tableContent.style.display = 'none';
        emptyState.style.display = 'block';
        return;
    }
    
    tableContent.style.display = 'block';
    emptyState.style.display = 'none';
    
    tbody.innerHTML = inscriptions.map(inscription => {
        const statusClass = inscription.status;
        const statusText = {
            'pending': 'En attente',
            'approved': 'Approuvée',
            'rejected': 'Rejetée'
        }[inscription.status] || inscription.status;
        
        const formationText = {
            'frontend': 'Développement Web Frontend',
            'backend': 'Développement Web Backend'
        }[inscription.formation] || inscription.formation;
        
        const niveauText = {
            'debutant': 'Débutant',
            'intermediaire': 'Intermédiaire',
            'avance': 'Avancé'
        }[inscription.niveau] || inscription.niveau;
        
        const dateCol = showDate ? `<td>${formatDate(inscription.date)}</td>` : '';
        
        return `
            <tr data-id="${inscription.id}">
                ${dateCol}
                <td>${inscription.prenom} ${inscription.nom}</td>
                <td>${inscription.email}</td>
                <td>${inscription.telephone}</td>
                <td>${formationText}</td>
                <td>${niveauText}</td>
                <td><span class="status-badge ${statusClass}">${statusText}</span></td>
                <td>
                    ${inscription.status === 'pending' ? `
                        <button class="action-btn approve" onclick="approveInscription(${inscription.id})">
                            <i class="fas fa-check"></i>
                        </button>
                        <button class="action-btn reject" onclick="rejectInscription(${inscription.id})">
                            <i class="fas fa-times"></i>
                        </button>
                    ` : ''}
                    <button class="action-btn delete" onclick="removeInscription(${inscription.id})">
                        <i class="fas fa-trash"></i>
                    </button>
                </td>
            </tr>
        `;
    }).join('');
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    });
}

// ===== Actions =====
function approveInscription(id) {
    updateInscriptionStatus(id, 'approved');
    refreshCurrentPage();
}

function rejectInscription(id) {
    updateInscriptionStatus(id, 'rejected');
    refreshCurrentPage();
}

function removeInscription(id) {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette inscription ?')) {
        deleteInscription(id);
        refreshCurrentPage();
    }
}

function refreshCurrentPage() {
    if (window.location.pathname.includes('dashboard')) {
        loadDashboard();
    } else {
        loadInscriptions(currentFilter || 'all');
    }
}

// ===== Filtering =====
let currentFilter = 'all';

function filterByStatus(status) {
    currentFilter = status;
    
    // Update active button
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');
    
    loadInscriptions(status);
}

function filterTable() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const rows = document.querySelectorAll('#inscriptionsTable tr');
    
    rows.forEach(row => {
        const text = row.textContent.toLowerCase();
        row.style.display = text.includes(searchTerm) ? '' : 'none';
    });
}

// ===== Event Listeners =====
document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', login);
    }
});
