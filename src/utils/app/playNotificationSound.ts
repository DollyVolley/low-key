const notificationSound = require('@/assets/sounds/notification.mp3')

export function playNotificationSound(): void {
    var audio = new Audio(notificationSound.default);
    audio.play();
}