export default class MessageView {
  constructor(container) {
    this.container = container;
  }

  drawMessage(data) {
    const {msg, created,coords} = data;

    const msgWRP = document.createElement('div');
    msgWRP.classList.add('msgWRP');

    const dateAndTimeEl = document.createElement('span');
    dateAndTimeEl.classList.add('dateAndTime','info');
    dateAndTimeEl.textContent = created;

    msgWRP.appendChild(dateAndTimeEl);

    const msgEl = document.createElement('span');
    msgEl.classList.add('msgContain');
    msgEl.textContent = msg;

    msgWRP.appendChild(msgEl);

    const coordsEl = document.createElement('span');
    coordsEl.classList.add('coords','info');
    coordsEl.textContent = coords;

    msgWRP.appendChild(coordsEl);

    this.container.appendChild(msgWRP)
  }

}
