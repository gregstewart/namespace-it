function NSI(ns, obj) {
    'use strict';

    if (typeof ns === 'undefined') {
        throw('Namespace is required');
    }

    var nameSpaceObject = window,
        nsArray = ns.split('.'),
        tempNS;

    for (var i = 0; i < nsArray.length - 1; i++) {
        tempNS = nsArray[i];
        if (typeof nameSpaceObject[tempNS] === 'undefined') {
            nameSpaceObject[tempNS] = {};
        }
        nameSpaceObject = nameSpaceObject[tempNS];

    }

    if (obj) {
        nameSpaceObject[nsArray[i]] = obj;
    } else {
        nameSpaceObject[nsArray[i]] = {};
    }

    return nameSpaceObject;
}