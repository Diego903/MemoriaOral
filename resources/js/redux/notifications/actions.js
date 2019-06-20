import types from './const';

const actAddNotification = (notification) => ({
    type: types.ADD,
    notification
});

const actRemoveNotification = (notification_id) => ({
    type: types.REMOVE,
    notification_id
});

const actRemoveAllNotifications = () => ({
    type: types.REMOVE_ALL
});

export {actAddNotification, actRemoveNotification, actRemoveAllNotifications};