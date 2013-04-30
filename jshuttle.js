/*
 * Project: jshuttle
 * 
 * Description:
 * The "glue" that creates a shuttle widget from two select elements. This
 * provides the actions that move selection options between the selects. It
 * does not create any HTML elements.
 *
 * Author: 
 * Eric Olson (eaolson@gmail.com)
 *
 * License:
 * Copyright (c) 2013, Eric Olson
 * Permission is hereby granted, free of charge, to any person obtaining a 
 * copy of this software and associated documentation files (the 
 * "Software"), to deal in the Software without restriction, including 
 * without limitation the rights to use, copy, modify, merge, publish, 
 * distribute, sublicense, and/or sell copies of the Software, and to 
 * permit persons to whom the Software is furnished to do so, subject to 
 * the following conditions: 
 * 
 * The above copyright notice and this permission notice shall be included 
 * in all copies or substantial portions of the Software. 
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS 
 * OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF 
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. 
 * IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY 
 * CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, 
 * TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE 
 * SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE. 
 */
 
 ;(function( $, window, document, undefined ){
    $.jshuttle = function( src, trg, options ){
        // var jqSrc = $( src );
        // var jqTrg = $( trg );
        var settings = $.extend({
            'add'            : null,
            'addAll'         : null,
            'remove'         : null,
            'removeAll'      : null,
            'moveOnDblClick' : true,
            'onshuttle'      : function () {}
        }, options );
        
        // Move only the selected elements from one select to another.
        // Returns a jQuery object containing the moved elements.
        // Private.
        function moveSelectElem( oFrom, oTo ){
            return $( ":selected", $( oFrom )).detach().appendTo( $( oTo ));
        }
        
        // Move all elements from one select to another.
        // Returns a jQuery object containing the moved elements.
        // Private.
        function moveAllElem( oFrom, oTo ){
            return $( oFrom ).children().detach().appendTo( $( oTo ));
        }
        
        // Bind the double click event to move the selected elements.
        // Whether to move on the double click event is optional.
        if( settings[ 'moveOnDblClick' ]){
            $( document ).delegate( src, "dblclick.shuttle",
                function(){
                    var jqElements;
                    moveSelectElem( src, trg );
                    settings[ 'onshuttle' ].call( $, jqElements, 'add' );
                }
            );
            
            $( document ).delegate( trg, "dblclick.shuttle",
                function(){
                    var jqElements;
                    moveSelectElem( trg, src );
                    settings[ 'onshuttle' ].call( $, jqElements, 'remove' );
                }
            );
        }
        
        // Add the selected elements and fire the onshuttle callback.
        if( settings[ "add" ] ){
            $( document ).delegate( settings[ "add" ], "click.shuttle", 
                function(){
                    var jqElements;
                    jqElements = moveSelectElem( src, trg );
                    settings[ 'onshuttle' ].call( $, jqElements, 'add' );
            });
        }
        
        // Remove the selected elements and fire the onshuttle callback.
        if( settings[ "remove" ] ){
            $( document ).delegate( settings[ 'remove' ], "click.shuttle", 
                function(){
                    var jqElements;
                    jqElements = moveSelectElem( trg, src );
                    settings[ 'onshuttle' ].call( $, jqElements, 'remove' );
                }
            );
        }
        
        // Add all the elements and fire the onshuttle callback.
        if( settings[ "addAll" ] ){
            $( document ).delegate( settings[ 'addAll' ], "click.shuttle", 
                function(){
                    var jqElements;
                    jqElements = moveAllElem( src, trg );
                    settings[ 'onshuttle' ].call( $, jqElements, 'add' );
                }
            );
        }
        
        // Remove all the elements and fire the onshuttle callback.
        if( settings[ "removeAll" ] ){
            $( document ).delegate( settings[ 'removeAll' ], "click.shuttle", 
                function( ){
                    var jqElements;
                    jqElements = moveAllElem( trg, src );
                    settings[ 'onshuttle' ].call( $, jqElements, 'remove' );
                }
            );
        }
        
        // Return the jQuery object.
        return this;
    };
})( jQuery, window, document );