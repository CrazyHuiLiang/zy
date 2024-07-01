const axios = require('axios');
async function get(url) {
    const resp = await axios.get(url, {
        headers: {
            // Token: '3f843d36e46b4f4dab6db516eb95488e',
            // 'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36',
        }
    });
    return resp.data;
}
exports.get = get;

exports.get_school_major = async function(recruitCode) {
    const url = `https://mnzy.gaokao.cn/api/pc/v2/v1/query/recommendMajorList?universityMajorGroup=&year=2024&province=%E6%B2%B3%E5%8D%97&score=447&classify=%E7%90%86%E7%A7%91&ranks=239333&batch=%E6%9C%AC%E7%A7%91%E4%BA%8C%E6%89%B9&artCategory=&entrantType=1&recruitCode=${recruitCode}`;
    return get(url);
}


