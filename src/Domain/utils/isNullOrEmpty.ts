export function isNullOrEmpty(str){
    return (!!!str || /^\s*$/.test(str));
}