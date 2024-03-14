import MessageView from "./MessageView";
import dateFormat from "dateformat";

export default class Controller {
  constructor(container) {
    this.container = container
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
    console.log(data)
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
        console.log('err', err);
        this.showInputCoordsForm()
      })
    }
  }


  showInputCoordsForm() {
    this.container.querySelector('.absoluteContainer').style.display = 'block';
    const formEl = this.container.querySelector('.addGeolocationForm')
    formEl.addEventListener('submit', this.getCoordsFromForm.bind(this));
    formEl.addEventListener('reset',() => {
      this.container.querySelector('.absoluteContainer').style.display = 'none';
    })

  }

  getCoordsFromForm(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    console.log('data', data)
  }

}
