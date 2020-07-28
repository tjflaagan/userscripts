// ==UserScript==
// @name         Autosave Grade Updates on D2L
// @namespace    https://sgzwach.com
// @version      0.3
// @description  Saves grade changes within D2L automatically when "Next student" is clicked in the dropbox.
// @author       Shawn
// @match        https://d2l.sdbor.edu/d2l/lms/dropbox/admin/mark/folder_user_mark.d2l*
// @grant        none
// @run-at       document-end
// ==/UserScript==

(function() {
    'use strict';

    // Function to click save if found
    // mostly because the anonymous functions they use to do so are a pain to deal with
    function clickSaveButton() {
        var buttons = $('.d2l-button'); // jquery is required within d2l - use their version to prevent breaking feedback box
        for (var i=0; i < buttons.length; i++)
            if (buttons[i].innerText == 'Save')
                buttons[i].click();
    }

    // find div with next student link and add eventListener to click the save button
    var divs = $('.dco_c');
    var done = false;
    for (var i=0; i < divs.length && !done; i++) {
        for (var c=0; c < divs[i].children.length && !done; c++) {
            if (divs[i].children[c].title == "Next Student") {
                divs[i].children[c].addEventListener("click", clickSaveButton); // modified after talking to Mike to just use next student button
                done = true;
            }
        }
    }

    // second pass at auto opening document
    var docs = $('.dfl');
    done = false;
    var link = null;
    for (i=0; i < docs.length && !done; i++)
    {
        link = docs[i].children[0];
        var ll = link.title.toLowerCase();
        if ((ll.endsWith("pdf") || ll.endsWith("docx") || ll.endsWith("doc") || ll.endsWith("rtf")) && link.href.startsWith("javascript"))
            done = true;
    }
    if (link != null)
        setTimeout(function() {link.click();}, 1250);

})();