const validaterMap = {
    "cronValidater":{"validater":validateCronExpression,"message":"时间表达式错误"}
}

function validateCronExpression(cronExpression){
   return true; 
}
export default function getValidater(validaterName){
    return validaterMap[validaterName];
}