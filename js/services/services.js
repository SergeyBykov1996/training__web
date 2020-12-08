

const postData = async (url, data ) => {
    const res = await fetch(url,{           //res Это promiss
        method: 'POST',     
        headers: {
            'Content-type': 'application/json'               // post Data Посылает запрос на сервер , получает ответ и трансформ. ответ в JSON 
        },
        body: data
    });
 
    return await res.json();       
};

const getResourse = async (url) => {
    const res = await fetch(url);

    if(!res.ok){
        throw new Error(`Could not fetch ${url}, status ${res.status}`);
    }

    return await res.json();       
};

export {postData};
export {getResourse};