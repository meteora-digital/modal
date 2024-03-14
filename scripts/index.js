export default class ModalController {
  constructor(options = {}) {
    this.active = false;
    this.timeout = null;

    this.eventListeners = [];

    // User settings / defaults 
    this.settings = {
      className: 'modal',
      allowClose: true,
      removeFromDOM: true,
    }

    // Simple object assign
    for (let key in this.settings) {
      if (this.settings.hasOwnProperty(key) && options.hasOwnProperty(key)) this.settings[key] = options[key];
    }

    this.template = {
      container: document.createElement('div'),
      wrapper: document.createElement('div'),
      content: document.createElement('div'),
    }

    // Give each item in the template a classname
    for (let key in this.template) this.template[key].className = (key == 'container') ? this.settings.className : `${this.settings.className}__${key}`;

    // Build our modal
    this.template.wrapper.appendChild(this.template.content);
    this.template.container.appendChild(this.template.wrapper);
    // Hide it
    this.template.container.style.display = 'none';

    if (this.settings.allowClose) {
      window.addEventListener('keydown', (e) => {
        if (this.active && e.code == 'Escape') this.close();
      });

      for (let key in this.template) {
        this.template[key].addEventListener('click', (e) => {
          if (this.active && e.target === this.template[key]) this.close();
        });
      }
    }

    if (!this.settings.removeFromDOM) {
      document.body.appendChild(this.template.container);
    }
  }

  append(html) {
    if (!Array.isArray(html)) html = [html];

    html.forEach((element) => {
      if (typeof element == 'string') this.template.content.innerHTML += element;
      // if we passed in html element
      else if (typeof element == 'object' && element.nodeType) this.template.content.appendChild(element);
      // Tell us we messed up
      else console.warn('This is not valid html or an html element!', element);
    });

    this.callback('append');
  }

  empty() {
    // Remove all html from the content
    this.template.content.innerHTML = '';
    this.callback('empty');
  }

  open() {
    if (this.active == false) {
      // Cancel other events
      clearTimeout(this.timeout);

      this.timeout = setTimeout(() => {
        if (this.settings.removeFromDOM) {
          // Add it to the DOM
          document.body.appendChild(this.template.container);
        }

        // Show it with css
        this.template.container.style.display = 'block';
        this.timeout = setTimeout(() => {
          // Set it to active
          this.active = true;
          // Add an active class
          this.template.container.classList.add(`${this.settings.className}--active`);
          // Callback function
          this.callback('open');
        }, 100);
      }, 100);
    }
  }

  close() {
    if (this.active) {
      // Cancel other events
      clearTimeout(this.timeout);

      this.timeout = setTimeout(() => {
        // Hide it
        this.template.container.classList.remove(`${this.settings.className}--active`)
        // Remove it
        this.timeout = setTimeout(() => {
          // No longer active`
          this.active = false;
          // Hide it with css
          this.template.container.style.display = 'none';

          if (this.settings.removeFromDOM) {
            // Remove the element
            document.body.removeChild(this.template.container);
          }

          // Callback function
          this.callback('close');
        }, 300);
      }, 100);
    }
  }

  on(event = '', func = false) {
    // If we passed in an event and a function and we weren't stupid
    if (event != '' && this[event] && event != 'on' && event != 'callback' && func && typeof func === 'function') {
      // make a new callback function
      this.eventListeners.push({
        event: event,
        callback: func,
      });
    }
  }

  callback(event = '') {
    this.eventListeners.filter((listener) => listener.event == event).forEach((listener) => listener.callback());
  }
}