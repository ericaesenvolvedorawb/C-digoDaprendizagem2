// Elementos da DOM
const profileBtn = document.getElementById('profileBtn');
const settingsBtn = document.getElementById('settingsBtn');
const profileModal = document.getElementById('profileModal');
const settingsModal = document.getElementById('settingsModal');
const closeModals = document.querySelectorAll('.close-modal');
const navItems = document.querySelectorAll('.nav-item');
const activityCards = document.querySelectorAll('.activity-card');
const toggleSwitches = document.querySelectorAll('.toggle-switch');

// Inicialização
document.addEventListener('DOMContentLoaded', function() {
    // Adicionar efeitos de sombra e animação nos cards
    initializeCards();
    
    // Inicializar modais
    initializeModals();
    
    // Inicializar navegação
    initializeNavigation();
    
    // Inicializar toggle switches
    initializeToggleSwitches();
});

// Inicializar cards com animações
function initializeCards() {
    activityCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
        
        // Adicionar clique nos cards de atividade
        card.addEventListener('click', function() {
            const subject = this.getAttribute('data-subject');
            launchActivity(subject);
        });
    });
}

// Inicializar modais
function initializeModals() {
    // Abrir modal de perfil
    profileBtn.addEventListener('click', function() {
        profileModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    });

    // Abrir modal de configurações
    settingsBtn.addEventListener('click', function() {
        settingsModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    });

    // Fechar modais
    closeModals.forEach(closeBtn => {
        closeBtn.addEventListener('click', function() {
            const modal = this.closest('.modal');
            modal.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    });

    // Fechar modal clicando fora
    [profileModal, settingsModal].forEach(modal => {
        modal.addEventListener('click', function(e) {
            if (e.target === this) {
                this.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });
    });
}

// Inicializar navegação inferior
function initializeNavigation() {
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            // Remover classe active de todos os itens
            navItems.forEach(navItem => {
                navItem.classList.remove('active');
            });
            
            // Adicionar classe active ao item clicado
            this.classList.add('active');
            
            // Navegar para a página correspondente
            const page = this.getAttribute('data-page');
            navigateToPage(page);
        });
    });
}

// Inicializar toggle switches
function initializeToggleSwitches() {
    toggleSwitches.forEach(toggle => {
        toggle.addEventListener('click', function() {
            this.classList.toggle('active');
            
            // Em um app real, aqui salvaríamos a preferência
            const settingName = this.parentElement.querySelector('span').textContent;
            const isActive = this.classList.contains('active');
            
            console.log(`Configuração "${settingName}" ${isActive ? 'ativada' : 'desativada'}`);
        });
    });
}

// Navegar para página
function navigateToPage(page) {
    console.log(`Navegando para: ${page}`);
    
    switch(page) {
        case 'home':
            // Já estamos na home
            break;
        case 'achievements':
            showNotification('Abrindo Conquistas...');
            // Em um app real, carregaríamos a página de conquistas
            break;
        case 'resources':
            showNotification('Abrindo Recursos...');
            // Em um app real, carregaríamos a página de recursos
            break;
        case 'parents':
            showNotification('Abrindo Área dos Pais...');
            // Em um app real, carregaríamos a área dos pais
            break;
    }
}

// Lançar atividade educacional
function launchActivity(subject) {
    const activities = {
        'portugues': {
            title: 'Português',
            message: 'Vamos aprender letras e palavras! 📚'
        },
        'matematica': {
            title: 'Matemática',
            message: 'Hora de brincar com números! 🔢'
        },
        'jogos': {
            title: 'Jogos',
            message: 'Vamos nos divertir aprendendo! 🎮'
        },
        'desafios': {
            title: 'Desafios',
            message: 'Missões especiais esperam por você! 🏆'
        }
    };
    
    const activity = activities[subject];
    if (activity) {
        showNotification(`${activity.message}`);
        
        // Animação especial no card clicado
        const clickedCard = document.querySelector(`[data-subject="${subject}"]`);
        clickedCard.style.animation = 'pulse 0.5s ease';
        
        setTimeout(() => {
            clickedCard.style.animation = '';
        }, 500);
        
        // Simular carregamento da atividade
        setTimeout(() => {
            // Em um app real, aqui carregaríamos a atividade
            console.log(`Iniciando atividade: ${activity.title}`);
        }, 1000);
    }
}

// Mostrar notificação
function showNotification(message) {
    // Criar elemento de notificação
    const notification = document.createElement('div');
    notification.className = 'notification-toast';
    notification.innerHTML = `
        <div class="notification-content">
            <span>${message}</span>
        </div>
    `;
    
    // Adicionar estilos dinamicamente
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        left: 50%;
        transform: translateX(-50%) translateY(-100px);
        background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
        color: white;
        padding: 15px 25px;
        border-radius: 25px;
        box-shadow: 0 5px 20px rgba(0, 0, 0, 0.2);
        z-index: 1001;
        opacity: 0;
        transition: all 0.3s ease;
        font-weight: bold;
        text-align: center;
        max-width: 80%;
    `;
    
    document.body.appendChild(notification);
    
    // Animação de entrada
    setTimeout(() => {
        notification.style.opacity = '1';
        notification.style.transform = 'translateX(-50%) translateY(0)';
    }, 100);
    
    // Remover após 3 segundos
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(-50%) translateY(-100px)';
        
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Adicionar estilos CSS dinâmicos para animações
const dynamicStyles = `
    @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.05); }
        100% { transform: scale(1); }
    }
    
    .notification-toast {
        animation: slideIn 0.3s ease;
    }
    
    @keyframes slideIn {
        from {
            opacity: 0;
            transform: translateX(-50%) translateY(-100px);
        }
        to {
            opacity: 1;
            transform: translateX(-50%) translateY(0);
        }
    }
`;

const styleSheet = document.createElement('style');
styleSheet.textContent = dynamicStyles;
document.head.appendChild(styleSheet);

// Simular progresso das atividades (apenas demonstração)
setInterval(() => {
    const progressBars = document.querySelectorAll('.progress-fill');
    progressBars.forEach(bar => {
        const currentWidth = parseInt(bar.style.width);
        if (currentWidth < 100) {
            const newWidth = Math.min(currentWidth + 1, 100);
            bar.style.width = `${newWidth}%`;
            
            // Atualizar texto de progresso
            const progressText = bar.parentElement.nextElementSibling;
            if (progressText && progressText.classList.contains('progress-text')) {
                progressText.textContent = `${newWidth}% completo`;
            }
        }
    });
}, 10000); // Atualiza a cada 10 segundos

// Efeitos de sombra dinâmica nos cards
document.addEventListener('mousemove', function(e) {
    const cards = document.querySelectorAll('.activity-card');
    cards.forEach(card => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const angleX = (y - centerY) / 25;
        const angleY = (centerX - x) / 25;
        
        card.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg)`;
    });
});

// Resetar transformação quando o mouse sair
document.addEventListener('mouseleave', function() {
    const cards = document.querySelectorAll('.activity-card');
    cards.forEach(card => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
    });
});