// Elementos da DOM
const profileBtn = document.getElementById('profileBtn');
const settingsBtn = document.getElementById('settingsBtn');
const profileModal = document.getElementById('profileModal');
const settingsModal = document.getElementById('settingsModal');
const closeModals = document.querySelectorAll('.close-modal');
const navBtns = document.querySelectorAll('.nav-btn');
const activityBtns = document.querySelectorAll('.activity-btn');
const avatarOptions = document.querySelectorAll('.avatar-option');
const toggleSwitches = document.querySelectorAll('.toggle-switch');
const playerAvatar = document.getElementById('playerAvatar');

// Estado da aplicação
const appState = {
    currentPage: 'home',
    settings: {
        music: true,
        sfx: true,
        hints: false,
        vibration: true,
        colorMode: true,
        animations: true
    },
    profile: {
        avatar: '🐻',
        name: 'Joãozinho',
        level: 5,
        xp: 70
    }
};

// Inicialização
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    setupEventListeners();
    loadUserPreferences();
});

function initializeApp() {
    // Aplicar configurações salvas
    applySettings();
    
    // Atualizar interface com dados do perfil
    updateProfileDisplay();
    
    // Adicionar efeitos visuais iniciais
    createFloatingElements();
}

function setupEventListeners() {
    // Botões do header
    profileBtn.addEventListener('click', openProfileModal);
    settingsBtn.addEventListener('click', openSettingsModal