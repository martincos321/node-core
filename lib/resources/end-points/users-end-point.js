/**
 *
 * @type {{all: string, detail: string}}
 */
var coreConfig = require('../../config/core-config');

exports.users = {
    /*
     * Llamadas por ajax del header
     */
    login: { method: 'post', path: '/users/:action(login)$' },
    fblogin: { method: 'post', path: '/users/:action(fblogin)$' },
    logout: { method: 'get', path: '/users/logout$' },
    token: { method: 'post', path: '/users/:action(token)$' },
    currentUser: { method: 'post', path: '/users/me' },
    friendRequest: { method: 'get', path: '/users/me/friendships/incoming' },
    messages: { method: 'get', path: '/users/me/messages/incoming' },
    recommendations: { method: 'get', path: '/users/me/recommendations/incoming' },
    notifications: { method: 'get', path: '/users/me/notifications/incoming' },
    counters: { method: 'get', path: '/users/me/counters' },
    deleteNotification: { method: 'delete', path: '/users/me/:type/:notificationId' },

    /*
     * Registro - Login - Recupero de contraseña
     */
    publicLogin: { method: 'get', path: coreConfig.users.basePath + '/users/login?uh=:uh' },
    publicFacebookLogin: {
        method: 'get',
        path: coreConfig.users.basePath + '/users/fblogin?access_token=:access_token'
    },
    /* -- Registro -- */
    signup: { method: 'get', path: '/usuarios/registro' },
    signupProcess: { method: 'post', path: '/users/signupProcess' },

    /* -- Activación desde mail de registro -- */
    activation: { method: 'get', path: '/users/activation/:accessToken'}, // -> redirect to /username?welcome=new

    /* -- Recupero de contraseña -- */
    recovery: { method: 'get', path: '/usuarios/recuperar' },
    recoveryProcess: { method: 'post', path: '/users/recoverProcess' },

    /* -- Blanqueo de clave -- */
    resetPassword: { method: 'get', path: '/usuarios/recuperar/:accessToken'},
    resetPasswordProcess: { method: 'post', path: '/users/resetPasswordProcess'},

    /* -- Bienvenido -- */
	welcome: { method: 'get', path: '/usuarios/bienvenido' },

    /* -- Volver a enviar email de recupero -- */
    resendConfirmation: { method: 'get', path: '/usuarios/reenviar' },
    resendConfirmationProcess: { method: 'post', path: '/users/resendConfirmationProcess' },

    /* -- Modificar email de recupero -- */
    updateConfirmationEmail: { method: 'get', path: '/usuarios/modificar-email-confirmacion' },
    updateConfirmationEmailProcess: { method: 'post', path: '/users/updateConfirmationEmailProcess' },

    /* -- Email enviado! -- */
    emailSended: { method: 'get', path: '/usuarios/email-enviado' },

    /* -- Local user api -- */
    publicCurrentUser: { method: 'get', path: coreConfig.users.basePath + '/users/me?uh=:uh' },
    publicCounters: {
        method: 'get',
        path: coreConfig.users.basePath + '/users/me/counters?friendsDate=:friendsDate&notificationDate=:notificationDate&recommendationDate=:recommendationDate&messagesDate=:messagesDate&id=:userId&uh=:uh'
    },

    /*
     * Viajeros API v3 endpoints
     */
    apiLogin: { method: 'post', path: coreConfig.api.basePath + '/oauth2/token' },
    apiLogout: { method: 'post', path: coreConfig.api.basePath + '/users/me/logout' },
    apiFbLogin: { method: 'post', path: coreConfig.api.basePath + '/oauth2/token/facebook?access_token=:accessToken' },
    apiSignUp: {method: 'post', path: coreConfig.api.basePath + '/users'},
    apiRecover: {method: 'post', path: coreConfig.api.basePath + '/users/recover'},
    apiConfirmPassword: {method: 'post', path: coreConfig.api.basePath + '/users/recover/activate'},
    /*
     * TODO -- Validar que un token no esté vencido ni utilizado
     * apiValidateToken: {method: 'post', path: coreConfig.api.basePath + '/validateToken'},
     */
    apiRefresh: { method: 'post', path: coreConfig.api.basePath + '/oauth2/token/refresh?refresh_token=:refreshToken' },
    apiUser: { method: 'get', path: coreConfig.api.basePath + '/users/:fromId' },
    apiFriendRequest: {
        method: 'get',
        path: coreConfig.api.basePath + '/users/me/friendships/incoming?limit=:limit&offset=:offset&created_at_read=:created_at_read'
    },
    apiMessages: {
        method: 'get',
        path: coreConfig.api.basePath + '/users/me/messages/incoming?limit=:limit&offset=:offset&created_at_read=:created_at_read'
    },
    apiRecommendations: {
        method: 'get',
        path: coreConfig.api.basePath + '/users/me/recommendations/incoming?limit=:limit&offset=:offset&created_at_read=:created_at_read'
    },
    apiNotifications: {
        method: 'get',
        path: coreConfig.api.basePath + '/users/me/notifications?limit=:limit&offset=:offset&created_at_read=:created_at_read'
    },
    apiDeleteFriendships: { method: 'delete', path: coreConfig.api.basePath + '/users/me/friendships/:notificationId' },
    apiDeleteMessages: { method: 'delete', path: coreConfig.api.basePath + '/users/me/messages/:notificationId' },
    apiDeleteRecommendations: {
        method: 'delete',
        path: coreConfig.api.basePath + '/users/me/recommendations/:notificationId'
    },
    apiDeleteNotifications: {
        method: 'delete',
        path: coreConfig.api.basePath + '/users/me/notifications/:notificationId'
    },

    /* --- Viajeros PHP Login service --- */
    phpLogin: { method: 'post', path: coreConfig.viajeros.basePath + '/services/login' }

};