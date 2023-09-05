addDesiredIngredientConcurrent = (ingrName, threadNum, numThreads, optimizedRecipeKeys, copyArr) => {
    for(let index = threadNum; index < copyArr.length; index += numThreads){
        copyArr[index] &= optimizedRecipeKeys[index].ingredientList.has(ingrName)
    }
}
removeDesiredIngredientConcurrent = (ingrName, threadNum, numThreads, optimizedRecipeKeys, copyArr, targetIngrList) => {
    const newTargetIngrList = targetIngrList.filter(ingr => ingr!== ingrName);
    for(let index = threadNum; index < copyArr.length; index += numThreads){
        let hasAll = true
        newTargetIngrList.forEach(target => {
            hasAll &= optimizedRecipeKeys[index].ingredientList.has(target)
        })
        copyArr[index] |= hasAll
    }
}
addNonDesiredIngredientConcurrent = (ingrName, threadNum, threadNum, optimizedRecipeKeys, copyArr) => {
    for(let index = threadNum; index < copyArr.length; index += numThreads){
        copyArr[index] &= !(optimizedRecipeKeys[index].ingredientList.has(ingrName))
    }
}
removeNonDesiredIngredientConcurrent = (ingrName, threadNum, numThreads, optimizedRecipeKeys, copyArr, avoidedIngredientList) => {
    const newAvoidIngrList = avoidedIngredientList.filter(ingr => ingr!== ingrName);
    for(let index = threadNum; index < copyArr.length; index += numThreads){
        let hasAll = true
        newAvoidIngrList.forEach(target => {
            hasAll &= (!optimizedRecipeKeys[index].ingredientList.has(target))
        })
        copyArr[index] |= hasAll
    }
}
removeFlagConcurrent = (flagName, threadNum, numThreads, optimizedRecipeKeys, flagToInt, flags, copyArr) =>{
    const newFlags = flags.filter(item => item !== flagName)
    const flagIntKeys = newFlags.map(flag => flagToInt[flag])
    for(let index = threadNum; index < copyArr.length; index += numThreads){
        let hasAll = true
        flagIntKeys.forEach(intKey => {
            hasAll &= optimizedRecipeKeys[index].flagList[intKey]
        })
        copyArr[index] |= hasAll
    }
}
addFlagConcurrent = (flagName, threadNum, numThreads, optimizedRecipeKeys, flagToInt,copyArr) =>{
    const intKey = flagToInt[flagName]
    for(let index = threadNum; index < copyArr.length; index += numThreads){
        copyArr[index] &= optimizedRecipeKeys[index].flagList[intKey]
    }
}
onmessage = (e) => {
    if(e.command === "add target ingr"){
       addDesiredIngredientConcurrent(e.ingrName, e.threadNum, e.numThreads, e.optimizedRecipeKeys, e.copyArr)
    }
    else if(e.list === "add avoid ingr"){
       
    }
    else if(e.list === "add flag"){
       
    }
    else if(e.list === "remove avoid ingr"){
       
    }
    else if(e.list === "remove target ingr"){
       
    }
    else if(e.list === "remove flag"){
       
    }
    else if(e.list === "change prefix"){

    }
}