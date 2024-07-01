const dian_zi_xin_xi_gong_cheng = require('./data/dian_zi_xin_xi_gong_cheng');
const ji_suan_ji_ke_xue_yu_ji_shu = require('./data/ji_suan_ji_ke_xue_yu_ji_shu');
const both = require('./data/both');
const request = require('./utils');
const fs = require('fs');
const have_5major_schools = require("./data/have_5major_schools.json");
const school_majors = require("./data/majors.json");
const my_score = 447;
const my_rank = 239333;
function print_locations(title, schools) {
    const safe_province = Object.values(schools.reduce((result, s) => {
        result[s.province] = result[s.province] || {
            province: s.province,
            count: 0,
            schools: new Set,
        };
        result[s.province].count++;
        result[s.province].schools.add(s.universityName);
        return result;
    }, {}));

    const all_schools = schools.reduce((result, s) => {
        result.add(s.universityName);
        return result;
    }, new Set);
    console.log(title, safe_province.length, all_schools.size, safe_province.sort((p1, p2) => {
        if (p1.count < p2.count) {
            return 1;
        }
        if (p1.count > p2.count) {
            return -1;
        }
        return 0;
    }));
}

// print_locations('电子信息工程 稳妥院校', dian_zi_xin_xi_gong_cheng.safe);
// print_locations('电子信息工程 兜底院校', dian_zi_xin_xi_gong_cheng.reliable);
// print_locations('电子信息工程', [...dian_zi_xin_xi_gong_cheng.safe, ...dian_zi_xin_xi_gong_cheng.reliable]);
// print_locations('计算机科学与技术', [...ji_suan_ji_ke_xue_yu_ji_shu.safe, ...ji_suan_ji_ke_xue_yu_ji_shu.reliable]);
// print_locations('', [...both.safe, ...both.reliable]);

const majors = [
    '电子信息工程',
    '电子科学与技术',
    '通信工程',
    '人工智能',
    '微电子科学与工程',
    '光电信息科学与工程',
    '信息工程',
    '集成电路设计与集成系统',

    '计算机科学与技术',
    '软件工程',
    '网络工程',
    '信息安全',
    '物联网工程',
    '数据科学与大数据技术',
];

// request.get_school_major(6226).then(console.log);

// 获取所有学院可报名的专业
async function fetch_majors(schools) {
    for (const school of schools) {
        const res = await request.get_school_major(school.recruitCode);
        school.majors = res.body;
        console.log(res.body);
        break;
    }
    return schools;
}


(async () => {

    // 所有 有电子信息工程 或 计算机科学课程的学院
    const all_schools = [
        ...both.safe,
        ...both.reliable,
    ]; // 146
    // console.log(all_schools.length);

    // 学校 和 专业
    // const schools = fetch_majors(all_schools);
    // const s = JSON.stringify(schools);
    // fs.writeFileSync('./majors.json', s);  // 146


    const school_majors = require('./data/majors.json');
    const selected_majors = school_majors.map(s => {
        s.majors.map(item => {
            for (const majorName of majors ) {
                item.isMine = item.majorName.indexOf(majorName.toLowerCase()) !== -1
                if (item.isMine) {
                    break;
                }
            }
        });
        return s;
    });
    console.log(selected_majors.length);
    fs.writeFileSync('./marked_majors.json', JSON.stringify(selected_majors));

    // 学校 和 我选择的专业( 剔除我不关心的专业)  // 146
    // const school_majors = require('./data/majors.json');
    // const selected_majors = school_majors.map(s => {
    //     s.majors = s.majors.filter(item => {
    //         for (const majorName of majors ) {
    //             if (item.majorName.indexOf(majorName.toLowerCase()) !== -1) {
    //                 return true;
    //             }
    //         }
    //         return false;
    //     });
    //     return s;
    // });
    // console.log(selected_majors.length);
    // fs.writeFileSync('./selected_majors.json', JSON.stringify(selected_majors));

        // 至少包含 5 个我关心的专业 的院校 // 44 个
        // const selected_majors = require('./data/selected_majors.json');
        // const have_5major_schools = selected_majors.filter(item => item.majors.length >= 5);
        // // fs.writeFileSync('./have_5major_schools.json', JSON.stringify(have_5major_schools));
        // console.log(have_5major_schools.length);



    // 院校中至少包含3个这样的专业，专业去年录取的最小排名至多领先我 1000 个位次  // 22
    // const have_5major_schools = require('./data/have_5major_schools.json');
    // // console.log('have_5major_schools', have_5major_schools[0]);
    // const all_wen = have_5major_schools.filter(item => {
    //     const wen_items = item.majors.filter(major => /* !major.minRanks||*/  major.minRanks - my_rank > -1000);
    //     // console.log(item.majors);
    //     return wen_items.length >= 3;
    // });
    // console.log(all_wen.length);
    // fs.writeFileSync('./data/all_wen.json', JSON.stringify(all_wen));
    // print_locations('all_win', all_wen);



    // 至少包含3个这样的专业：去年录取排名落后我排名 4w
    // const bao = all_wen.filter(item => {
    //     const wen_items = item.majors.filter(major => /* !major.minRanks||*/  major.minRanks - my_rank > 40000);
    //     // console.log(item.majors);
    //     return wen_items.length >= 3;
    // });
    // // fs.writeFileSync('./data/bao.json', JSON.stringify(bao));
    // console.log('bao', bao.length);
    // print_locations('bao', bao);
    //
    // // 不满足：  包含3个这样的专业：去年录取排名落后我排名 4w
    // const wen = all_wen.filter(item => !bao.includes(item));
    // // fs.writeFileSync('./data/wen.json', JSON.stringify(wen));
    // console.log('wen', wen.length);
    // print_locations('wen', wen);

})();

