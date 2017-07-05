var ColorDisable="#A9A9A9",
  ColorActive="#555555",
  ColorPassive="#999999",
  ColorGreen="#669900",
  TestStr="www";

function toNum(a){
  str=new String(a);
  return 0<str.indexOf(",")?(new_str=str.split(","),res_str=new_str[0]+"."+new_str[1],1*res_str):1*a
}
function MinVal(a,b){
  return a<b?a:b
}
function MaxVal(a,b){
  return a>b?a:b
}
function GetNum(a,b,e){
  var d=toNum(a.value);
  d>1*e&&(d=e,a.value=d);
  d<1*b&&(d=b,a.value=d);
  return 1*d
}
function LimitNum(a,b,e,d){a>e&&(a=e,c[b].value=a);a<d&&(a=d,c[b].value=a);
  return a
}
function addOption(a,b,e,d,g){
  var f=document.createElement("option");
  f.appendChild(document.createTextNode(b));
  f.setAttribute("value",e);
  d?f.defaultSelected=!0:g&&(f.selected=!0);
  a.appendChild(f)
}
function FormatNumber(a){
  return 1E3<=1*a?(a+"").replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g,"$1&thinsp;"):a
};
