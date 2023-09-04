export default class EventManager {
  constructor() {
    this.listeners = {
      addtoast: [],
    };
  }

  // inserir listener no evento
  on(event, listener) {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }
    this.listeners[event].push(listener);
  }

  //  emit o evento
  emit(event, payload) {
    if (!this.listeners[event]) {
      return;
    }

    this.listeners[event].forEach((listener) => {
      listener(payload);
    });
  }
}

const toastEventManager = new EventManager();

toastEventManager.on('addtoast', (payload) => {
  console.log('addtoast listener1', payload);
});
toastEventManager.on('addtoast', (payload) => {
  console.log('addtoast listener2', payload);
});

toastEventManager.emit('addtoast', { type: 'danger', text: 'Texto' });
console.log(toastEventManager);
