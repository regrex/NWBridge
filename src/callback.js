/**
 * Copyright (C) 2015 yanni4night.com
 * callback.js
 *
 * changelog
 * 2015-11-18[23:56:57]:revised
 *
 * @author yanni4night@gmail.com
 * @version 1.0.0
 * @since 1.0.0
 */

var callbacks = {};

var index = 0;

export function Callback(func) {
    var id = 'cb_' + (++index) + '_' + (Math.random() * 1e7 | 0);

    this.getId = () => {
        return id;
    };

    this.invoke = function (outputData) {
        var err = null;
        var ret;

        if (!outputData) {
            outputData = {};
            err = new Error('No data');
        } else if (0 !== +outputData.errNo) {
            err = new Error(outputData.errMsg || 'Unknown error');
        }
        ret = func.call(null, err, outputData.data);
        this.remove();
        return ret;
    };

    this.remove = () => {
        delete callbacks[id];
    };

    callbacks[id] = this;
};

Callback.findById = (id) => {
    return callbacks[id];
};