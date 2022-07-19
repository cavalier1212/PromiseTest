const promiseSetTimeout = (status) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (status) {
                resolve('promise success')
            } else {
                reject('promise failed')
            }
        }, 0);// 0 秒依然會被放進等待序列
    })
}

// async await promise
// async await 需加 try catch 否則 reject 會拋error
async function promiseTest() {
    try {
        // 同步執行
        const result1 = await promiseSetTimeout(true);
        console.log('result1 = ', result1)
        console.log(1)
        console.log(2)
        const result2 = await promiseSetTimeout(false);
        console.log('result2 = ', result2)
        console.log(3) // await 有失敗不執行
    } catch (e) { // catch reject or error in try block
        console.log('reject try catch ', e);
    }
}
// console.log => 'result1 =  promise success' => 1 => 2 => 'reject try catch  promise failed'
// promiseTest();



// reject 需要 catch 否則error
// promiseSetTimeout(false).then(data=>{
//     console.log('YOYOYO')
// })
// .catch((e)=>{
//     console.log('reject catch ',e)
// })

// console.log => reject catch  promise failed


// 常見錯誤
function testFetch() {
    let status = null;
    fetch('https://httpstat.us/500?sleep=1000').then(result => {
        status = result.status
        console.log('result', result)
    }).catch(error => {
        console.log('error', error)
    })
    console.log('status = ', status) // status = null
    return status;
}
// const result = testFetch();
// console.log('result : ', result) // result : null


// 修正錯誤
async function testFetch2() {
    return await fetch('https://httpstat.us/500?sleep=1000').then(result =>
        result.status
    ).catch(error => {
        console.log('error = ', error)
        // reject(error)
        return error
    })
}

this.testFetch2().then(data => {
    console.log('testFetch2 resolve  = ', data)
}).catch(error => {
    console.log('testFetch2 reject  = ', error)
})

// async function test2(){
//     const result = await this.testFetch2();
//     console.log('result : ', result) // result
// }

// test2()