export default function(se){
  if (typeof se !== "undefined") {    
    se = se.substr(1);
    var arr = se.split("&"),
        obj = {}, 
        newarr = [];
    arr.map(function(v,i){
        newarr = v.split("=");
        if(typeof obj[newarr[0]] === "undefined"){
            obj[newarr[0]] = newarr[1];
        }
    });
    return obj;
} ;
}