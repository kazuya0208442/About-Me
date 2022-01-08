// コールバック関数と監視したい要素を入力すれば、intersecttionobserverが発動する。
class ScrollObserver {
    constructor(els, cb, options) {
        this.els = document.querySelectorAll(els);
        const defaultOptions = {
            root: null,
            once: true
        };
        this.cb = cb;
        this.options = Object.assign(defaultOptions, options);
        this.once = this.options.once;
        this._init();
    }
    _init() {
        const callback = function (entries, observer) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // 画面内に入ってきたら、cbにdomを渡す。trueも。
                    this.cb(entry.target, true);
                    if(this.once) {
                        observer.unobserve(entry.target);
                    }
                } else {
                    this.cb(entry.target, false);
                }
            });
        };
        // IntersectionObserverはwindowのプロパティなので、bindが必要。これで、this -> scrollobserverを指す。
        this.io = new IntersectionObserver(callback.bind(this), this.options);

        // @see https://github.com/w3c/IntersectionObserver/tree/master/polyfill
        // 古いブラウザでも見れるようにするため、後方互換。１００ｍｓごとにスクロールを監視。
        this.io.POLL_INTERVAL = 100;
        
        // それぞれの要素を監視対象にする
        this.els.forEach(el => this.io.observe(el));
    }

    destroy() {
        this.io.disconnect();
    }
}