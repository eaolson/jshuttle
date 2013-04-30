jshuttle : A jQuery plugin for creating shuttle elements
========================================================

jshuttle is a jQuery plugin that binds the actions for moving items between two sides of a shuttle element. 

A shuttle element consists of two select elements and the user moves, or "shuttles" items from one to the other. It's an alternate way of creating a multiple select list where a user can clearly see which items have been selected. Also, the user doesn't have to worry about holding down a particular key to select multiple items.

This plugin doesn't create any elements itself, but rather binds actions to buttons.

Usage
-----

    jQuery.jshuttle( sourceElement, targetElement, [options] );

Options
-------

`add [null]`: a jQuery selector for the Add element(s)

`addAll [null]`: a jQuery selector for the Add All element(s)

`remove [null]`: a jQuery selector for the Remove element(s)

`removeAll [null]`: a jQuery selector for the Remove All element(s)

`moveOnDblClick [true]`: if true, double clicking an element in the shuttle will move it

`onshuttle [null]`: a callback function fired when a shuttle move happens

Example
-------

Create two select elements and some buttons to use:

    <select id="left" multiple="multiple" size="7" style="width: 200px">
        <option value="Guppy">Guppy</option>
        <option value="Trout">Trout</option>
        <option value="Shark">Shark</option>
    </select>

    <table>
        <tr><td><input id="btnAddAll" type="button" value="&gt;&gt;" ></td></tr>
        <tr><td><input id="btnAdd" type="button" value="&gt;" ></td></tr>
        <tr><td><input id="btnRemove" type="button" value="&lt;" ></td></tr>
        <tr><td><input id="btnRemoveAll" type="button" value="&lt;&lt;" ></td></tr>
    </table>

    <select id="right" multiple="multiple" size="7" style="width: 200px"></select>
    
Then, call the jshuttle function to bind them all together.

    <script type="text/javascript">
        $.jshuttle( "#left", "#right", {
            add: "#btnAdd", 
            remove: "#btnRemove",
            addAll: "#btnAddAll", 
            removeAll: "#btnRemoveAll" }
        );
    </script>

License
-------
MIT, see LICENSE

Author
------
Eric Olson, eaolson@gmail.com
