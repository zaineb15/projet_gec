import Echo from 'laravel-echo';
window.Pusher = require('pusher-js');

export const echo = new Echo({
    broadcaster: 'pusher',
    key: process.env.MIX_PUSHER_APP_KEY,
    cluster: process.env.MIX_PUSHER_APP_CLUSTER,
    encrypted: true,
    wsHost: window.location.hostname,
    wsPort: process.env.MIX_PUSHER_APP_PORT,
    disableStats: true, // Optionnel, désactive les statistiques pour réduire les requêtes HTTP
});
