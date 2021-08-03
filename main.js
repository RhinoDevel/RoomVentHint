
// (c) Marcel Timm, RhinoDevel, 2021

(function() // IIFE
{
    'use strict';

    var f = {}, // Functions
        v = {}; // Variables

    f.obj = {};
    f.ele = {};
    f.ele.tbl = {};
    f.ele.input = {};
    f.str = {};

    f.obj.isObj = function(obj)
    {
        return typeof obj === 'object' && obj !== null && !Array.isArray(obj);
    };
    f.obj.forEach = function(obj, func)
    {
        var key = null;

        for(key in obj)
        {
            if(obj.hasOwnProperty(key))
            {
                func(obj[key], key, obj);
            }
        }
        return obj;
    };
    f.obj.setKeysAndValues = function(objDest, objSrc)
    {
        f.obj.forEach(
            objSrc,
            function(val, key)
            {
                objDest[key] = val;
            });
    };

    f.str.isStr = function(str)
    {
        return typeof str === 'string';
    };
    f.str.isNonEmpty = function(str)
    {
        return f.str.isStr(str) && str.length > 0;
    };
    f.str.isNonWhiteSpace = function(str)
    {
        return f.str.isStr(str) && str.trim().length > 0;
    };

    f.ele.applyStyles = function(ele, styles)
    {
        if(!f.obj.isObj(styles))
        {
            return;
        }
        f.obj.setKeysAndValues(ele.style, styles);
    };
    f.ele.createDiv = function(styles, html, id)
    {
        var retVal = document.createElement('DIV');

        f.ele.applyStyles(retVal, styles);

        if(f.str.isNonWhiteSpace(html))
        {
            retVal.innerHTML = html;
        }

        if(f.str.isNonWhiteSpace(id))
        {
            retVal.id = id;
        }

        return retVal;
    };

    f.ele.tbl.createHtml = function(rows)
    {
        var retVal = '<table>';

        rows.forEach(
            function(cols)
            {
                retVal += '<tr>';
                cols.forEach(
                    function(col, index)
                    {
                        retVal += '<td style="' + (index % 2 == 0 ? 'background-color: lightblue;' : 'background-color: darkturquoise;') + '">';
                        retVal += col;
                        retVal += '</td>';
                    });
                retVal += '</tr>';
            });
        retVal += '</table>';

        return retVal;
    };

    f.ele.input.createHtml = function(val, type, id)
    {
        var retVal = '<input type="' + type
            + '" id="' + id
            + '" value="' + String(val) + '"';

        if(type === 'number')
        {
            retVal += ' step="any"';
        }

        retVal += ' />';

        return retVal;
    };

    f.createEles = function()
    {
        var style = {
                title: {'font-weight': 'bolder'},
                topTitle: { 'font-weight': 'bold' },
                val: { 'text-align': 'right' },
                count: { 'text-align': 'right' },
                copyright: {'font-style': 'italic', 'font-size': 'small'}
            },
            mainEle = f.ele.createDiv(),
            titleEle = f.ele.createDiv(style.title, document.title),
            tableEle = f.ele.createDiv(
                null,
                f.ele.tbl.createHtml([
                    [
                        f.ele.createDiv(style.topTitle, 'Title').outerHTML,
                        f.ele.createDiv(style.topTitle, 'Value').outerHTML,
                        f.ele.createDiv(style.topTitle, 'Unit').outerHTML,
                        f.ele.createDiv(style.topTitle, 'Description').outerHTML,
                    ],

                    [
                        'RH inside 1',
                        f.ele.input.createHtml(0, 'number', 'val_rhinside1'),
                        '%',
                        'Measured relative humidity inside the room.'
                    ],

                    [
                        'T inside',
                        f.ele.input.createHtml(0, 'number', 'val_tinside'),
                        '\u00B0C',
                        'Measured temperature inside the room.'
                    ],

                    [
                        'RH outside',
                        f.ele.input.createHtml(0, 'number', 'val_rhoutside'),
                        '%',
                        'Measured relative humidity outside of the room.'
                    ],

                    [
                        'T outside',
                        f.ele.input.createHtml(0, 'number', 'val_toutside'),
                        '\u00B0C',
                        'Measured temperature outside of the room.'
                    ],

                    [
                        'RH precision',
                        f.ele.input.createHtml(0, 'number', 'val_rhprecision'),
                        '%',
                        'Precision of the hygrometers in use.'
                    ],

                    [
                        'T precision',
                        f.ele.input.createHtml(0, 'number', 'val_tprecision'),
                        '\u00B0C',
                        'Precision of the thermometers in use.'
                    ],

                    [
                        'RH inside 1 use',
                        f.ele.createDiv(style.val, null, 'val_rhinside1use').outerHTML,
                        '%',
                        'Measured relative humidity inside the room with applied precision.'
                    ],

                    [
                        'T inside use',
                        f.ele.createDiv(style.val, null, 'val_tinsideuse').outerHTML,
                        '\u00B0C',
                        'Measured temperature inside the room with applied precision.'
                    ],

                    [
                        'RH outside use',
                        f.ele.createDiv(style.val, null, 'val_rhoutsideuse').outerHTML,
                        '%',
                        'Measured relative humidity outside of the room with applied precision.'
                    ],

                    [
                        'T outside use',
                        f.ele.createDiv(style.val, null, 'val_toutsideuse').outerHTML,
                        '\u00B0C',
                        'Measured temperature outside of the room with applied precision.'
                    ],
                    
                    [
                        'P sat outside',
                        f.ele.createDiv(style.val, null, 'val_psatoutside').outerHTML,
                        'N / m\u00B2',
                        'Saturation vapor pressure outside of the room (for relative humidity being 100%).'
                    ],

                    [
                        'P outside',
                        f.ele.createDiv(style.val, null, 'val_poutside').outerHTML,
                        'N / m\u00B2',
                        'Vapor pressure outside of the room (at actual relative humidity).'
                    ],
                    
                    [
                        'T outside K',
                        f.ele.createDiv(style.val, null, 'val_toutsidek').outerHTML,
                        'K',
                        'Temperature to use for outside of the room in Kelvin.'
                    ],
                    
                    [
                        'AH',
                        f.ele.createDiv(style.val, null, 'val_ah').outerHTML,
                        'mol / m\u00B3',
                        'Absolute humidity (outside of the room).'
                    ],

                    [
                        'T inside K',
                        f.ele.createDiv(style.val, null, 'val_tinsidek').outerHTML,
                        'K',
                        'Temperature to use for inside the room in Kelvin.'
                    ],

                    [
                        'P inside',
                        f.ele.createDiv(style.val, null, 'val_pinside').outerHTML,
                        'N / m\u00B2',
                        'Vapor pressure inside the room (at absolute humidity).'
                    ],

                    [
                        'P sat inside',
                        f.ele.createDiv(style.val, null, 'val_psatinside').outerHTML,
                        'N / m\u00B2',
                        'Saturation vapor pressure inside the room (at room\'s temperature).'
                    ],

                    [
                        'RH inside 2',
                        f.ele.createDiv(style.val, null, 'val_rhinside2').outerHTML,
                        '%',
                        'Relative humidity inside the room (at room\'s temperature and absolute humidity).'
                    ],

                    [
                        'Hint',
                        f.ele.createDiv(style.val, null, 'val_hint').outerHTML,
                        '',
                        'Is ventilation possible without increasing the room\'s (relative) humidity?'
                    ]
                ])),
            copyrightEle = f.ele.createDiv(
                style.copyright,
                '2021'
                + ', '
                + '<a href="http://rhinodevel.com/" title="RhinoDevel website">'
                +   '(c) Marcel Timm, RhinoDevel'
                + '</a>');

        mainEle.appendChild(titleEle);
        mainEle.appendChild(tableEle);
        mainEle.appendChild(copyrightEle);
        document.body.appendChild(mainEle);
    };
    f.configureEles = function()
    {
        v.ele = {};

        v.ele.rhinside1 = {};
        //
        v.ele.rhinside1.val = document.getElementById('val_rhinside1');
        v.ele.rhinside1.val.value = String(85);

        v.ele.tinside = {};
        //
        v.ele.tinside.val = document.getElementById('val_tinside');
        v.ele.tinside.val.value = String(20);

        v.ele.rhoutside = {};
        //
        v.ele.rhoutside.val = document.getElementById('val_rhoutside');
        v.ele.rhoutside.val.value = String(50);

        v.ele.toutside = {};
        //
        v.ele.toutside.val = document.getElementById('val_toutside');
        v.ele.toutside.val.value = String(25);

        v.ele.rhprecision = {};
        //
        v.ele.rhprecision.val = document.getElementById('val_rhprecision');
        v.ele.rhprecision.val.value = String(2);

        v.ele.tprecision = {};
        //
        v.ele.tprecision.val = document.getElementById('val_tprecision');
        v.ele.tprecision.val.value = String(1);

        v.ele.rhinside1use = {};
        //
        v.ele.rhinside1use.val = document.getElementById('val_rhinside1use');

        v.ele.tinsideuse = {};
        //
        v.ele.tinsideuse.val = document.getElementById('val_tinsideuse');

        v.ele.rhoutsideuse = {};
        //
        v.ele.rhoutsideuse.val = document.getElementById('val_rhoutsideuse');

        v.ele.toutsideuse = {};
        //
        v.ele.toutsideuse.val = document.getElementById('val_toutsideuse');

        v.ele.psatoutside = {};
        //
        v.ele.psatoutside.val = document.getElementById('val_psatoutside');

        v.ele.poutside = {};
        //
        v.ele.poutside.val = document.getElementById('val_poutside');

        v.ele.toutsidek = {};
        //
        v.ele.toutsidek.val = document.getElementById('val_toutsidek');

        v.ele.ah = {};
        //
        v.ele.ah.val = document.getElementById('val_ah');
        
        v.ele.tinsidek = {};
        //
        v.ele.tinsidek.val = document.getElementById('val_tinsidek');
        
        v.ele.pinside = {};
        //
        v.ele.pinside.val = document.getElementById('val_pinside');
        
        v.ele.psatinside = {};
        //
        v.ele.psatinside.val = document.getElementById('val_psatinside');
        
        v.ele.rhinside2 = {};
        //
        v.ele.rhinside2.val = document.getElementById('val_rhinside2');
        
        v.ele.hint = {};
        //
        v.ele.hint.val = document.getElementById('val_hint');
    };
    f.calc = function()
    {
        // (volume is implicitly set to 1 square meter)
        var r = 8.314472, // J / (mol * K)
            rhinside1 = parseFloat(v.ele.rhinside1.val.value),
            tinside = parseFloat(v.ele.tinside.val.value),
            rhoutside = parseFloat(v.ele.rhoutside.val.value),
            toutside = parseFloat(v.ele.toutside.val.value),
            rhprecision = parseFloat(v.ele.rhprecision.val.value),
            tprecision = parseFloat(v.ele.tprecision.val.value),
            rhinside1use = rhinside1 - rhprecision,
            tinsideuse = tinside - tprecision,
            rhoutsideuse = rhoutside + rhprecision,
            toutsideuse = toutside + tprecision,
            psatoutside = 6.112 * Math.exp(17.67 * toutsideuse / (toutsideuse + 243.5)) * 100.0,
            poutside = psatoutside * rhoutsideuse / 100.0,
            toutsidek = toutsideuse + 273.15,
            ah = poutside / (r * toutsidek),
            tinsidek = tinsideuse + 273.15,
            pinside = ah * r * tinsidek,
            psatinside = 6.112 * Math.exp(17.67 * tinsideuse / (tinsideuse + 243.5)) * 100.0,
            rhinside2 = 100.0 * pinside / psatinside,
            hint = rhinside2 <= rhinside1 ? 'YES' : 'NO';
        
        v.ele.rhinside1use.val.textContent = String(rhinside1use.toFixed(4));
        v.ele.tinsideuse.val.textContent = String(tinsideuse.toFixed(4));
        v.ele.rhoutsideuse.val.textContent = String(rhoutsideuse.toFixed(4));
        v.ele.toutsideuse.val.textContent = String(toutsideuse.toFixed(4));

        v.ele.psatoutside.val.textContent = String(psatoutside.toFixed(4));
        v.ele.poutside.val.textContent = String(poutside.toFixed(4));
        v.ele.toutsidek.val.textContent = String(toutsidek.toFixed(4));
        v.ele.ah.val.textContent = String(ah.toFixed(4));
        v.ele.tinsidek.val.textContent = String(tinsidek.toFixed(4));
        v.ele.pinside.val.textContent = String(pinside.toFixed(4));
        v.ele.psatinside.val.textContent = String(psatinside.toFixed(4));
        v.ele.rhinside2.val.textContent = String(rhinside2.toFixed(4));

        v.ele.hint.val.textContent = hint;
    };
    f.configureEvents = function()
    {
        var eles = [
            v.ele.rhinside1.val,
            v.ele.tinside.val,
            v.ele.rhoutside.val,
            v.ele.toutside.val,
            v.ele.rhprecision.val,
            v.ele.tprecision.val
        ];

        eles.forEach(
            function(ele)
            {
                ele.addEventListener('blur', f.calc);
            });
    }

    document.title = 'Room Ventilation Hint';
    f.createEles();
    f.configureEles();
    f.calc();
    f.configureEvents();
}());
