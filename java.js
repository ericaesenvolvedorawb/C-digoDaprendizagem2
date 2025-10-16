// Elementos da DOM
const progressFill = document.getElementById('progressFill');
const rewardItems = document.querySelectorAll('.reward-item');
const activityItems = document.querySelectorAll('.activity-item');
const avatarItems = document.querySelectorAll('.avatar-item');
const missionItems = document.querySelectorAll('.mission-item');
const notification = document.getElementById('notification');

// Simular progresso
let progress = 60;
progressFill.style.width = `${progress}%`;

// Função para mostrar notificação
function showNotification(message) {
    notification.textContent = message;
    notification.classList.add('show');
    
    setTimeout(() => {
        notification.classList.remove('show');
    }, 3000);
}

// Adicionar interatividade às recompensas
rewardItems.forEach(item => {
    item.addEventListener('click', () => {
        const rewardName = item.getAttribute('data-reward');
        showNotification(`Recompensa "${rewardName}" resgatada!`);
        
        // Efeito visual de clique
        item.style.transform = 'scale(0.95)';
        setTimeout(() => {
            item.style.transform = '';
        }, 200);
    });
});

// Adicionar interatividade às atividades
activityItems.forEach(item => {
    item.addEventListener('click', () => {
        const activityName = item.getAttribute('data-activity');
        const status = item.querySelector('.activity-status');
        
        if (!status.classList.contains('locked')) {
            showNotification(`Atividade "${activityName}" iniciada!`);
            
            // Efeito visual de clique
            item.style.backgroundColor = 'rgba(76, 201, 240, 0.1)';
            setTimeout(() => {
                item.style.backgroundColor = '';
            }, 500);
        } else {
            showNotification(`Atividade "${activityName}" está bloqueada!`);
        }
    });
});

// Adicionar interatividade aos avatares
avatarItems.forEach(item => {
    item.addEventListener('click', () => {
        const avatarName = item.getAttribute('data-avatar');
        const status = item.querySelector('.avatar-status');
        
        if (!status.classList.contains('locked')) {
            showNotification(`Avatar "${avatarName}" selecionado!`);
            
            // Efeito visual de clique
            item.style.backgroundColor = 'rgba(76, 201, 240, 0.1)';
            setTimeout(() => {
                item.style.backgroundColor = '';
            }, 500);
        } else {
            showNotification(`Avatar "${avatarName}" está bloqueado!`);
        }
    });
});

// Adicionar interatividade às missões secretas
missionItems.forEach(item => {
    item.addEventListener('click', () => {
        const missionName = item.getAttribute('data-mission');
        showNotification(`Missão secreta "${missionName}" é um mistério!`);
        
        // Efeito visual de clique
        item.style.backgroundColor = 'rgba(76, 201, 240, 0.1)';
        setTimeout(() => {
            item.style.backgroundColor = '';
        }, 500);
    });
});

// Simular atualização de progresso
setInterval(() => {
    if (progress < 100) {
        progress += 1;
        progressFill.style.width = `${progress}%`;
        
        // Atualizar texto de progresso
        document.querySelector('.progress-value').textContent = `${progress}% completo`;
        
        // Verificar se algum avatar foi desbloqueado
        if (progress === 50) {
            const explorerAvatar = document.querySelector('[data-avatar="Explorador"]');
            const explorerStatus = explorerAvatar.querySelector('.avatar-status');
            explorerStatus.textContent = 'Desbloqueado!';
            explorerStatus.classList.remove('locked');
            explorerStatus.classList.add('completed');
            showNotification('Avatar Explorador desbloqueado!');
        }
        
        // Verificar se alcançou 100%
        if (progress === 100) {
            showNotification('Parabéns! Você completou todas as missões!');
        }
    }
}, 5000);