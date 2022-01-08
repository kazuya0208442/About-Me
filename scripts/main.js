// domが生成されたことを保証
document.addEventListener('DOMContentLoaded', function () {

    // ヒーロースライダー
    const hero = new HeroSlider('.swiper-container');
    hero.start();


    // テキストアニメーション
    // cbには、交差中のdomとtrue or falseが引数としてわたってくる。
    const cb = function (el, inview) {
        // 画面の中にいる場合
        if(inview) {
            const ta = new TweenTextAnimation(el);
            ta.animate();
        }
    }
    const so = new ScrollObserver('.tween-animate-title', cb);


    // カバースライドとフェイドイン
    const _inviewAnimation = function (el, inview) {
        if(inview) {
            el.classList.add('inview');
        } else {
            el.classList.remove('inview');
        }
    }
    const so2 = new ScrollObserver('.cover-slide', _inviewAnimation);
    const so4 = new ScrollObserver('.appear', _inviewAnimation);


    // ヘッダーの追跡
    const _navAnimation = function (el, inview) {
        if(inview) {
            header.classList.remove('triggered');
        } else {
            header.classList.add('triggered');
        }
    }
    const header = document.querySelector('.header')
    const so3 = new ScrollObserver('.nav-trigger', _navAnimation, {once: false});
    

    // モバイルメニュー
    new MobileMenu();

});

