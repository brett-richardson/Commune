(function(a){a.fn.ajaxify=function(b){a.extend(Ajaxify.options,b||{});for(var c=0;c<this.length;c++){if(this[c].tagName.toLowerCase()=="a"){a(this[c]).bind("click",function(d){Ajaxify.process(d,this)})}else{if(this[c].tagName.toLowerCase()=="form"){a(this[c]).find("button[type=submit], input[type=submit], input[type=image]").each(function(d,f){a(f).click(function(e){a(this).before('<input type="hidden" name="'+a(this).attr("name")+'" value="'+a(this).val()+'"/>');if(a(this).attr("type")=="image"){a(this).before('<input type="hidden" name="'+a(this).attr("name")+'_y" value="'+(e.pageY-a(this).offset().top)+'"/>');a(this).before('<input type="hidden" name="'+a(this).attr("name")+'_x" value="'+(e.pageX-a(this).offset().left)+'"/>')}})});a(this[c]).bind("submit",function(d){Ajaxify.process(d,this)})}}}return this}})(jQuery);var Ajaxify={options:{append:"ajax=1",async:true,contentType:null,dataType:"html",type:null,update:null,url:null},serializeForm:function(a){r="";$(a).find("input[type!=submit][type!=button][type!=image], textarea, select").each(function(b,c){if($(c).attr("type")=="checkbox"||$(c).attr("type")=="radio"){if($(c).attr("checked")){r+=escape($(c).attr("name"))+"="+escape($(c).val())+"&"}}else{r+=escape($(c).attr("name"))+"="+escape($(c).val())+"&"}});return r},process:function(c,b){var a={};$.extend(a,this.options);if(b.tagName.toLowerCase()=="form"){a.url=(a.url)?this.appendToURL(a.url):this.appendToURL($(b).attr("action"));a.type=(a.type)?a.type:$(b).attr("method").toUpperCase();a.contentType=(a.contentType)?a.contentType:$(b).attr("enctype")||"application/x-www-form-urlencoded";a.data=this.serializeForm(b)}else{if(b.tagName.toLowerCase()=="a"){a.url=(a.url)?this.appendToURL(a.url):this.appendToURL($(b).attr("href"));a.type=(a.type)?a.type:"GET";a.contentType=(a.contentType)?a.contentType:"application/x-www-form-urlencoded"}else{return}}c.preventDefault();a.update=(a.update)?a.update:$(b).parent();a.success=function(d,e){$(a.update).html(d)};a.error=function(d,f,e){alert("Error processing data via AJAX:\n"+e+" ("+f+")")};$.ajax(a)},appendToURL:function(a){if(this.options.append){if(a.indexOf("#")!=-1){a=a.substr(0,a.indexOf("#"))}a+=(a.indexOf("?")==-1?"?"+this.options.append:"&"+this.options.append)}return a}};