/*
* Author : Rosh Brahm
* email  : broshnikanta@gmail.com
* DESCRIPTION
* jquery.numeric.js
* A plugin for input value which restricts user to input decimal value only.
* It has an option to embed Numeric Pad inline.
* This plugin is free to use and distribute.
* And anybody willing to upgrade or enhance the plugin are welcome.
*/
(function($) {
    $.fn.numeric = function(config, callback){
		config = config || {};
        var embedNumpad=config.numpad;
        if(embedNumpad==undefined){
            embedNumpad=false;
        }
        var numpadId=$(this).attr("id");
        if(embedNumpad){
			var keypad="<br/><div class='numericKeypad'>";
            keypad+="<div><span style='font-size:8px;text-align:center;color:#fff;'>rNumPad v.1.0</span>"
            keypad+="<span class='togglePad_"+numpadId+" circle' title='Toggle Numpad.'style='float:right;cursor:pointer;color:#fff;'>-</span>";
            keypad+="</div>"
            keypad+="<div id='numpadContent_"+numpadId+"'>";
			keypad+="<div class='row'>";
			keypad+="<span class='"+numpadId+"_key big-key key' id='"+numpadId+"_backspace'>Backspace</span>";
			keypad+="</div>";
			keypad+="<div class='row'>";
			keypad+="<span class='"+numpadId+"_key key' id='"+numpadId+"_7'>7</span>";
			keypad+="<span class='"+numpadId+"_key key' id='"+numpadId+"_8'>8</span>";
			keypad+="<span class='"+numpadId+"_key key' id='"+numpadId+"_9'>9</span>";
			keypad+="</div>";
			keypad+="<div class='row'>";
			keypad+="<span class='"+numpadId+"_key key' id='"+numpadId+"_4'>4</span>";
			keypad+="<span class='"+numpadId+"_key key' id='"+numpadId+"_5'>5</span>";
			keypad+="<span class='"+numpadId+"_key key' id='"+numpadId+"_6'>6</span>";
			keypad+="</div>";
			keypad+="<div class='row'>";
			keypad+="<span class='"+numpadId+"_key key' id='"+numpadId+"_1'>1</span>";
			keypad+="<span class='"+numpadId+"_key key' id='"+numpadId+"_2'>2</span>";
			keypad+="<span class='"+numpadId+"_key key' id='"+numpadId+"_3'>3</span>";
			keypad+="</div>";
			keypad+="<div class='row'>";
			keypad+="<span class='"+numpadId+"_key key' id='"+numpadId+"_0'>0</span>";
			keypad+="<span class='"+numpadId+"_key key' id='"+numpadId+"_dot'>.</span>";
			keypad+="<span class='"+numpadId+"_key key' id='"+numpadId+"_minus'>-</span>";
			keypad+="</div>";
			keypad+="<div class='row'>";
			keypad+="<span class='"+numpadId+"_key key' id='"+numpadId+"_left'>&#8592;</span>";
			keypad+="<span class='"+numpadId+"_key key' id='"+numpadId+"_right'>&#8594;</span>";
			keypad+="</div>";
			keypad+="<div class='row'>";
			keypad+="<span class='"+numpadId+"_key big-key key' id='"+numpadId+"_clear'>Clear All</span>";
			keypad+="</div>";
			keypad+="</div>";
            keypad+="</div>";
			$(this).after(keypad);
            $("."+numpadId+"_key").click(function(){
                var max_len=config.limit;  
                var targetId=$(this).attr("id").split("_")[0];
                var id=$(this).attr("id").split("_")[1];
                if(id=="backspace"){
					backspace(targetId);
				}
				if(id=="clear"){
					clearData(targetId)
				}
				if(id=="left"){
					left(targetId);
				}
				if(id=="right"){
					right(targetId);
				}
				if(id=="dot"){
					setDot(targetId,max_len);
				}
				if(id=="minus"){
					negate($(this).text(),targetId,max_len);
				}
				if(!isNaN(id)){
					setNum($(this).text(),targetId,max_len);
				}

			});
            $(".togglePad_"+numpadId).click(function(){
                $("#numpadContent_"+numpadId).toggle();
                if($(this).html()=="-"){
                    $(this).html("+");
                }
                else{
                    $(this).html("-")
                }
            })

		}
        this.data("limit",config.limit);
		this.data("negative",config.negative);
		this.data("decimal",config.decimal);
		$(this).keypress($.fn.numeric.keypress);


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
	function setNum(val,targetId,maxLen){
	    var elem = document.getElementById(targetId);
	    var caretPosition=caret(elem);
        var result = elem.value.splice( caretPosition, 0, val );
        if(maxLen==undefined){
            elem.value=result;    
        }
	    else if(result.length<=maxLen-1){
	        elem.value=result;
	    }
	    setCaretPosition(targetId, caretPosition+1);
	}
    function negate(val,targetId,maxLen){
        var elem = document.getElementById(targetId);
        console.log(targetId)
        var caretPosition=caret(elem);
        if(caretPosition==0){
            if(answer.value.charAt(0)!="-"){
                if(maxLen==undefined){
                    elem.value = val+elem.value;   
                }
                else if(answer.value.length <=maxLen-1){
                    elem.value = val+elem.value;
                }
                setCaretPosition(targetId, caretPosition+1);
            }
        }
        caretPosition=caret(elem);
        setCaretPosition(targetId, caretPosition);
    }
    function setDot(targetId,maxLen){
        var elem = document.getElementById(targetId);
        var caretPosition=caret(elem);
        if(elem.value.indexOf(".") == -1){
            var result = elem.value.splice( caretPosition, 0, "." );
            if(maxLen==undefined){
                elem.value=result;
            }
            else if(result.length <=maxLen){
                elem.value=result;
            }
        }    
        setCaretPosition(targetId, caretPosition+1)
    }
    function backspace(targetId){
        var elem = document.getElementById(targetId);
        var caretPosition=caret(elem);
        elem.value = elem.value.replaceAt(caretPosition-1,"");
        setCaretPosition(targetId, caretPosition-1)
    }
    function left(targetId){
        var elem = document.getElementById(targetId);
        var caretPosition=caret(elem);
        setCaretPosition(targetId, caretPosition-1)
    }
    function right(targetId){
        var elem = document.getElementById(targetId);
        var caretPosition=caret(elem);
        setCaretPosition(targetId, caretPosition+1)
    }
    function clearData(targetId){
        var elem = document.getElementById(targetId);
        elem.value="";
        setCaretPosition(targetId,0)
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

    function  setCaretPosition(elemId, caretPos) {
        var elem = document.getElementById(elemId);
        if(elem != null) {
            if(elem.createTextRange) {
                var range = elem.createTextRange();
                range.move('character', caretPos);
                range.select();
            }
            else {
                if(elem.selectionStart) {
                    elem.focus();
                    elem.setSelectionRange(caretPos, caretPos);
                }
                else{
                    elem.focus();
                    elem.setSelectionRange(caretPos, caretPos);
                }

            }
        }
    }

    String.prototype.splice = function( idx, rem, s ) {
        return (this.slice(0,idx) + s + this.slice(idx + Math.abs(rem)));
    };
    String.prototype.replaceAt=function(index, character) {
        return this.substring(0, index) + character + this.substring(index+ 1);
    };
    String.prototype.splitAt=function(index){
        return this.substring(0, index) + "." + this.substring(index);    
    };

})(jQuery);
