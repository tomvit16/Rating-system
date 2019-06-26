    class Cinema {
        constructor(name, raiting) {
            this.raiting = raiting || 0;
            this.dataId = Cinema.instances++;
            this.name = name;
            this.htmlname = `<div><p class= par${this.dataId + 1} data-raiting = ${this.raiting} data-item = ${this.dataId + 1}> ${name}  <span>
        <i name="1" class="fa fa-star"></i>
        <i name="2" class="fa fa-star"></i>
        <i name="3" class="fa fa-star"></i>
        <i name="4" class="fa fa-star"></i>
        <i name="5" class="fa fa-star"></i>
        </span></p></div>`;
            this.newhtmlpar = ` <p class= par${this.dataId + 1} data-raiting = ${this.raiting} data-item = ${this.dataId + 1}> ${name}  <span>
        <i name="1" class="fa fa-star"></i>
        <i name="2" class="fa fa-star"></i>
        <i name="3" class="fa fa-star"></i>
        <i name="4" class="fa fa-star"></i>
        <i name="5" class="fa fa-star"></i>
        </span></p>`;
        }

    }

    //append new film
    document.getElementById('click1').addEventListener('click', addChildren);

    function addChildren() {
        let valINput = document.getElementById("input1").value;
        //chek for spaces
        if (valINput.trim().length > 0) {   
        
        let newChildren = new Cinema(valINput);
        let elemP = document.createElement("div");
        elemP.innerHTML = newChildren.newhtmlpar;
        let fatherNode = document.getElementById('mainContent');
        fatherNode.appendChild(elemP);
        let starAddEvent = elemP.children[0].children[0].children;

        for (let i = 0; i < starAddEvent.length; i++) {
            starAddEvent[i].addEventListener('mouseenter', goldStar);
            starAddEvent[i].addEventListener('mouseleave', blackStar);
            starAddEvent[i].addEventListener('click', goldStarSelected);
        }

        let localStorageNewFilm = JSON.stringify(newChildren);
        let dataNameLocal = "Object" + (newChildren.dataId + 1);

        localStorage.setItem(dataNameLocal, localStorageNewFilm);
    }
        }
        ;


    //main films
    Cinema.instances = 0;

    const cinema1 = new Cinema('The Godfather', localStorage.getItem('1'));
    const cinema2 = new Cinema('The Shawshank', localStorage.getItem('2'));
    const cinema3 = new Cinema('The Dark Knight', localStorage.getItem('3'));
    const cinema4 = new Cinema('12 Angry Men', localStorage.getItem('4'));
    const cinema5 = new Cinema('Schindler`s List', localStorage.getItem('5'));
    const cinema6 = new Cinema('The Lord of the Rings', localStorage.getItem('6'));


    let listFilms = document.getElementsByClassName('content')[0];

    listFilms.innerHTML = (cinema1.htmlname + cinema2.htmlname + cinema3.htmlname + cinema4.htmlname + cinema5.htmlname + cinema6.htmlname);

    const star = Array.from(document.getElementsByClassName('fa'));

    function goldStar(e) {
        let selectedStar = +this.getAttribute('name');
        let selectedPa = Array.from(e.path[1].children);
        for (let i = 0; i < selectedStar; i++) {
            selectedPa[i].classList.add('goldStar');
        };
    };

    function goldStarSelected(e) {

        let selectedStar = +this.getAttribute('name');
        let selectedPa = Array.from(e.path[1].children);
        e.path[2].setAttribute('data-raiting', selectedStar);
        for (let i = 0; i < 5; i++) {
            selectedPa[i].classList.remove('goldStarSelected');
        };
        for (let i = 0; i < selectedStar; i++) {
            selectedPa[i].classList.add('goldStarSelected');
        };
        mySort();
        mySortName();
        saveDataRaiting(e);
    };

    function blackStar(e) {
        let selectedStar = +this.getAttribute('name');
        let selectedPa = Array.from(e.path[1].children);
        for (let i = 0; i < selectedStar; i++) {
            selectedPa[i].classList.remove('goldStar');
        };
    };

    function starsFocus() {
        star.forEach(function (e) {
            e.addEventListener('mouseenter', goldStar);
        });
    };
    starsFocus();

    function starsNoFocus() {
        star.forEach(function (e) {
            e.addEventListener('mouseleave', blackStar);
        });
    };
    starsNoFocus();

    function starsSelected() {
        star.forEach(function (e) {
            e.addEventListener('click', goldStarSelected);
        });

    };
    starsSelected();

    //sort
    function mySort() {

        let nav = document.querySelector('.content');
        for (let i = 0; i < nav.children.length; i++) {
            for (let j = i; j < nav.children.length; j++) {
                if (+nav.children[i].children[0].getAttribute('data-raiting') < +nav.children[j].children[0].getAttribute('data-raiting')) {
                    replacedNode = nav.replaceChild(nav.children[j], nav.children[i]);
                    insertAfter(replacedNode, nav.children[i]);
                }
            }
        }
    }

    function mySortName() {
        let nav = document.querySelector('.content');
        for (let i = 0; i < nav.children.length; i++) {
            for (let j = i; j < nav.children.length; j++) {
                if (+nav.children[i].children[0].getAttribute('data-raiting') == +nav.children[j].children[0].getAttribute('data-raiting')) {
                    if (nav.children[i].children[0].textContent > nav.children[j].children[0].textContent) {
                        replacedNode = nav.replaceChild(nav.children[j], nav.children[i]);
                        insertAfter(replacedNode, nav.children[i]);
                    }
                }
            }
        }
    }

    function insertAfter(elem, refElem) {
        return refElem.parentNode.insertBefore(elem, refElem.nextSibling);
    }

    // save key
    function saveDataRaiting(e) {
        const nameLocal = e.path[2].dataset.item;
        const paramLocal = e.path[2].dataset.raiting;
        localStorage.setItem(nameLocal, paramLocal);

    };

    // starsFromLocalStorage

    window.onload = newItemInStorage(), starsFromStorage(), mySort(), mySortName();

    function starsFromStorage() {
        const contentChildrens = document.querySelectorAll('.content')[0].children;
        for (let i = 0; i < contentChildrens.length; i++) {
            let serialRait = +contentChildrens[i].children[0].getAttribute('data-raiting');
            let serialChildren = contentChildrens[i].children[0].children[0];
            for (let j = 0; j < serialRait; j++) {
                serialChildren.children[j].classList.add('goldStarSelected');
            }
        }
    };


    function newItemInStorage() {

        for (let i = 0; i < localStorage.length; i++) {
            let storageKey = localStorage.getItem("Object" + ([i + 7]));
            if (storageKey != null) {

                let objectByStorage = JSON.parse(storageKey);
                let keyOrSTRg = (objectByStorage.dataId + 1);
                let valkeyOrSTRg = localStorage.getItem(keyOrSTRg);
                if (valkeyOrSTRg != null) {
                    objectByStorage.raiting = valkeyOrSTRg;
                }

                let elemDivNew = document.createElement("div");

                elemDivNew.innerHTML = objectByStorage.newhtmlpar;

                let fatherNode = document.getElementById('mainContent');

                fatherNode.appendChild(elemDivNew);
                let starAddEvent = elemDivNew.children[0].children[0].children;

                let elemBySTRgNew = document.querySelector(`[data-item="${keyOrSTRg}"]`);
                elemBySTRgNew.setAttribute('data-raiting', valkeyOrSTRg);

                for (let j = 0; j < starAddEvent.length; j++) {
                    starAddEvent[j].addEventListener('mouseenter', goldStar);
                    starAddEvent[j].addEventListener('mouseleave', blackStar);
                    starAddEvent[j].addEventListener('click', goldStarSelected);
                }
            }
        }
    };
