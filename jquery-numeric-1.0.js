/*
* Author : Rosh Brahm
* email  : broshnikanta@gmail.com
* DESCRIPTION
* jquery.decimal.js
* A plugin for input value which restricts user to input decimal value only.
* it allows decimal value only.
* it takes an argument in config which indicates the max-character length of the input
* in the given html, we have put the max-character length as 10.
* so it will restrict the user to input not more than 10 character.
* This plugin is free to use and distribute.
* And anybody willing to upgrade or enhance the plugin are welcome.
*/
(function($) {
	$.fn.numeric = function(config, callback){
		config = config || {};
		this.data("limit",config.limit);
		this.data("negative",config.negative);
		this.data("decimal",config.decimal);
		$(this).keypress($.fn.numeric.keypress)

	}
	$.fn.numeric.keypress = function(event){
		var limit = $.data(this,"limit");
		var limitLess=false;
		if(limit==undefined){
			limitLess=true;
		}
		var negative=$.data(this,"negative");
		if(negative==undefined){
			negative=false;
		}
		var decimal=$.data(this,"decimal");
		if(decimal==undefined){
			decimal=false;
		}
		var charCode = (event.which) ? event.which : event.keyCode;
    	var elem=document.getElementById($(this).attr("id"));
    	if (charCode == 45 ){
    		if(negative){
    		var caretPosition=caret(elem);
            if(caretPosition==0){
            	if($(this).val().charAt(0)!="-" ){
            		if(!limitLess){
        				if($(this).val() <=limit){
	                        $(this).val("-"+$(this).val());
	                    }
            		}            		
                }
                if($(this).val().indexOf("-")!=-1){
                	event.preventDefault();
                    return false;
                }
                
            }
            else{
            	event.preventDefault();
            }
            }
            else{
            	event.preventDefault();	
            }
            
        }
        if (charCode == 46){
        	if(!decimal){
        		event.preventDefault();
        	}
            if ($(this).val().indexOf('.') !=-1){
            	event.preventDefault();
                return false;
            }
            return true;
        }
        if (charCode != 45 && charCode != 46 && charCode > 31 && (charCode < 48 || charCode > 57)){
        	event.preventDefault();
            return false;
        }
        if(! limitLess && $(this).val().length>=limit){
        	event.preventDefault();
        	return true;
        }
        return true;		
	}
	function caret(node) {
	    if(node.selectionStart) {
	        return node.selectionStart;
	    }
	    else if(!document.selection) {
	        return 0;
	    }
	    //node.focus();
	    var c		= "\001";
	    var sel	= document.selection.createRange();
	    var txt	= sel.text;
	    var dul	= sel.duplicate();
	    var len	= 0;
	    try{ dul.moveToElementText(node); }catch(e) { return 0; }
	    sel.text	= txt + c;
	    len		= (dul.text.indexOf(c));
	    sel.moveStart('character',-1);
	    sel.text	= "";
	    return len;
	}
})(jQuery);
