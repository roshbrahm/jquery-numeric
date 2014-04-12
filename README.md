 Author : Rosh Brahm<br/>
 email  : broshnikanta@gmail.com<br/>
 DESCRIPTION<br/>
 jquery.numeric.js<br/>
 A plugin for input value which restricts user to input decimal value only.<br/>
 It takes one or more than one argument in config which are explained below.<br/>
 This plugin is free to use and distribute.<br/>
 And anybody willing to upgrade or enhance the plugin are welcome.<br/>
 <b>Integer Only</b><br/>
 $("#elementId").numeric();<br/>
 <b>Negative </b><br/>
 $("#elementId").numeric({negative:true});<br/>
 <b>Limited Number input</b><br/>
 $("#elementId").numeric({limit:15});<br/>
 <b>Decimal</b><br/>
 $("#elementId").numeric({decimal:true});<br/>
 Config has three properties:<br/>
 1) limit : some int value.<br/>
 2) decimal : boolean. true: allows only decimal otherwise integer only.<br/>
 3) negative : boolean <br/>
