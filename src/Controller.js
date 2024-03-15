import MessageView from "./MessageView";
import dateFormat from "dateformat";
import checkCoordsType from "./checkCoordsType";

export default class Controller {
  constructor(container) {
    this.container = container;
  }

  init() {
    if (!this.container) {
      console.log('DOM Error');
      return
    }
    this.bindToDOM()
    this.getCoords()
  }

  bindToDOM() {
    document.querySelector('.msgContainerWRP').style.display = 'inline-flex';
    const formSend = document.querySelector('.sendMsgForm')
    formSend.style.display = 'inline-flex';
    formSend.addEventListener('submit', this.sendMsg.bind(this))
  }

  sendMsg(e) {
    e.preventDefault()
    const data = Object.fromEntries(new FormData(e.target));

    const created = new Date().toISOString();
    data.created = dateFormat(created, 'dd.mm.yy  HH:MM');
    data.coords = this.coordsView;
    const msg = new MessageView(document.querySelector('.messageContainer'));
    msg.drawMessage(data);
    e.target.reset()
  }

  getCoords() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(data => {
        this.coords = {latitude: data.coords.latitude, longitude: data.coords.longitude};
        this.coordsView = `[${data.coords.latitude}, ${data.coords.longitude}]`
      }, err => {
        console.log(err)
        this.showInputCoordsForm()
      })
    }
  }


  showInputCoordsForm() {
    this.container.querySelector('.absoluteContainer').style.display = 'block';
    const formEl = this.container.querySelector('.addGeolocationForm');
    const inputEl = formEl.querySelector('.coordsInput');
    inputEl.onchange = () => {
      const {validate, msg} = checkCoordsType(inputEl.value);
      console.log('validate', {validate, msg})
      if (!validate) {
        inputEl.setCustomValidity(msg)
      }
    }

    formEl.addEventListener('submit', this.getCoordsFromForm.bind(this));
  }


  getCoordsFromForm(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    this.coords = data;
    this.coordsView = this.getCoordsView(data.coords);
    e.target.reset();
    this.container.querySelector('.absoluteContainer').style.display = 'none';
  }

  getCoordsView(coords) {
    coords.trim();
    if (coords.startsWith('[')) coords = coords.slice(1, coords.length);
    if (coords.endsWith(']')) coords = coords.slice(0, coords.length - 1);
    const commasIndex = coords.indexOf(',');
    if (coords[commasIndex + 1] !== ' ') {
      coords = coords.replace(',', ', ')
    }

    return `[${coords}]`
  }
}
