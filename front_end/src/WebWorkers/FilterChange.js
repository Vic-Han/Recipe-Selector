

removeFlagConcurrent = async(flagName, threadNum, numThreads, optimizedRecipeKeys, flagToInt, flags, copyArr) =>{
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
addFlagConcurrent = async(flagName, threadNum, numThreads, optimizedRecipeKeys, flagToInt,copyArr) =>{
    const intKey = flagToInt[flagName]
    for(let index = threadNum; index < copyArr.length; index += numThreads){
        copyArr[index] &= optimizedRecipeKeys[index].flagList[intKey]
    }
}