function init() {

    var xAngle = 0,
        yAngle = 0,
        cube = document.getElementById('cube'),
        millisToSpin = 6200,
        prefixes = 'transform webkitTransform MozTransform'.split(' '),
        prefix,
        el = document.createElement('div');

    for (var i = 0, len = prefixes.length; i < len; i++) {
        if (typeof el.style[prefixes[i]] !== "undefined") {
            prefix = prefixes[i];
            break;
        }
    };

    var randomSpinCalc = function (spins) {
        // How many times to turn a complete face in one direction
        // times
        // How many spins at most to do in that direction
        return (Math.floor((Math.random() * 4) + 1) *
            Math.floor((Math.random() * spins) + 1));
    };

    var spinCube = function (spins, transition) {
        spins = spins || 0;
        xAngle += 90 * randomSpinCalc(spins);
        yAngle += 90 * randomSpinCalc(spins);

        if (transition) {
            cube.style.transition =
            "transform " + millisToSpin + "ms cubic-bezier(0, 1, 0.3, 0.98)";
        }

        cube.style[prefix] =
        "rotateX(" + xAngle + "deg) rotateY(" + yAngle + "deg)";
    };

    //start at random face
    spinCube();

    //Avoid cube flicker on page load, show only after initial spun
    cube.style.opacity = "1";

    cube.addEventListener('click', function () {
        spinCube(50, true);
    });

    document.addEventListener('keydown', function (e) {
        if (e.keyCode === 82) {
            e.preventDefault();
            spinCube(50, true);
        }
    }, false);

}

window.onload = init;