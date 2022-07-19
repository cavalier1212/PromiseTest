const delayDivided = (value1, value2, delayTime) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (value2 == 0) {
                reject('can not divided by 0 ')
            } else {
                resolve(value1 / value2);
            }
        }, delayTime);
    })
}


// 一. promise.all
function testPromiseAll() {
    const promise1 = delayDivided(10, 2, 0);
    const promise2 = delayDivided(30, 2, 0);

    // console.log('is Promise(testPromiseAll) : ', promise1 instanceof Promise)
    
    Promise.all([promise1, promise2]).then(results => {
        console.log(results); // Array
        const answer = results.reduce((total, value) => {
            return total + value
        })
        console.log('answer : ', answer)

    }).catch((error)=>{
        console.log('error : ', error)
    })
}
// testPromiseAll();

// 二.async await
// async function always return Promise
async function testAsyncAwait() {
    try {
        // const result1 = await delayDivided(10, 2, 0);
        const result1 = await delayDivided(10, 0, 0);
        const result2 = await delayDivided(30, 2, 0);
        console.log('is Promise(testAsyncAwait) : ', result1 instanceof Promise);
        console.log('typeof result1 : ', typeof result1 );
        const answer = result1 + result2;
        // return Promise.reject(answer);
        // return Promise.resolve(answer);
        return answer;
    } catch (error) {
        console.log('in try catch ----- ')
        return error
    }

}
// console.log('testAsyncAwait type = ', testAsyncAwait())
// testAsyncAwait().then(data => {
//     console.log('resolve = ', data)
// }).catch(error => {
//     console.log('reject = ', error)
// });



// 三. return multi Object error
function testReturnObject() {
    return new Promise((resolve, reject) => {
        // 1. 正常回應
        // resolve({ state: 'ok', result: { successText: ' state ok' } });

        // 2. 錯誤回應
        // resolve(undefined)

        // 3. exception
        // try {
        //     throw new Error('test')
        // } catch (error) {
        //     reject(error.message)
        // }

        // 4. 預期錯誤回應
        setTimeout(() => {
            reject('error massage')
        }, 0);
    })
}

async function testFunction() {
    try {
        let { state, result } = await testReturnObject();
        if (state === 'ok') {
            return result;
        }
    } catch (error) {
        throw new Error(error)
    }
}

testFunction().then(data => {
    console.log(data) // expect result
}).catch(error => {
    console.log('error = ', error)
});