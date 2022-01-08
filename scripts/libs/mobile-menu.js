class MobileMenu {
  constructor() {
    // domを格納する箱を用意
    this.DOM = {};
    // ボタンを押したりするので、ボタンの要素を取得
    this.DOM.btn = document.querySelector(".mobile-menu__btn");
    this.DOM.cover = document.querySelector(".mobile-menu__cover");
    // #global-containerにmenu-openのクラスを付与して、下のcontainerを左にずらす。
    this.DOM.container = document.querySelector("#global-container");
    this.eventType = this._getEventType();
    this._addEvent();
  }

  // "touchstart" : "click"なのかを判断。スマホならtouchstart
  _getEventType() {
    const isTouchCapable =
      "ontouchstart" in window ||
      (window.DocumentTouch && document instanceof window.DocumentTouch) ||
      navigator.maxTouchPoints > 0 ||
      window.navigator.msMaxTouchPoints > 0;

    return isTouchCapable ? "touchstart" : "click";
  }

  // #global-containerにmenu-openのクラスを付与するところ
  _toggle() {
    this.DOM.container.classList.toggle("menu-open");
  }

  // イベントを登録する用のメソッド
  _addEvent() {
    // ボタンにクリックなら_toggle()を呼び出して、"menu-open"を付けたり消したりする。
    this.DOM.btn.addEventListener(this.eventType, this._toggle.bind(this));
    // カバーにクリックなら_toggle()を呼び出して、"menu-open"を付けたり消したりする。
    this.DOM.cover.addEventListener(this.eventType, this._toggle.bind(this));
  }
}

