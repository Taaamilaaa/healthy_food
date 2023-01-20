import { refs } from './refs.js';
const imgPath = [
    './images/about_1.png',
    './images/about_2.png',
    './images/dishes_1.png',
    './images/dishes_2.png',
    './images/dishes_3.png',
    './images/dishes_5.png',
    './images/dishes_6.png',
];

refs.sliderForwardBtn.addEventListener('click', nextImg);
refs.sliderBackBtn.addEventListener('click', nextImg);

function nextImg(e) {
    const oldImgFirst = stringConversion(refs.sliderCont_1);
    const oldImgSecond = stringConversion(refs.sliderCont_2);

    let nextImgIndexFirst = imgSorter(oldImgFirst, e);
    let nextImgIndexSecond = imgSorter(oldImgSecond, e);

    const newImgFirst = imgPath[nextImgIndexFirst];
    const newImgSecond = imgPath[nextImgIndexSecond];

    refs.sliderCont_1.style.backgroundImage = `url('${newImgFirst}')`; //переписуємо в стилі url
    refs.sliderCont_2.style.backgroundImage = `url('${newImgSecond}')`;
}

function stringConversion(prop) {
    const presentImgUrl = getComputedStyle(prop).backgroundImage; //знаходимо url малюнка фону що є зараз
    const arrayFromPath = presentImgUrl.split('/'); //перетворюємо його на массив
    const dirtyOldImg = arrayFromPath.splice(-1, 1).toString().split(''); //отримуємо назву малюнка з крайніми символами
    dirtyOldImg.splice(-2, 2); //прибираємо зайві символи
    const oldImg = dirtyOldImg.join(''); //об'єднуємо масив в строку і отримуємо чисту назву

    return oldImg;
}

function imgSorter(prop, e) {
    let nextImgIndex = 0;

    imgPath.forEach((el, index) => {
        if (el.includes(prop)) {
            nextImgIndex = e.currentTarget.className.includes('slider-btn__right')
                ? index + 1
                : index - 1;
        }

        if (nextImgIndex > imgPath.length - 1 || nextImgIndex < 0) {
            nextImgIndex = e.currentTarget.className.includes('slider-btn__right') ? 0 : 6;
        }
    });

    return nextImgIndex;
}
