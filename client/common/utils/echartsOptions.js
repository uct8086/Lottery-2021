const generateList = (num) => (new Array(num).fill(0)).map((v, i) => `${i+1}`);

const commonBarOption = () => {
    return {
        title: {
            // text: '前区各数值出现频率'
        },
        tooltip: {},
        xAxis: {
            type: 'category',
            // data: dataAxis,
            // axisLabel: {
            //     inside: true,
            //     color: "#fff"
            // },
            // z: 10
        },
        yAxis: {},
        series: [{
            name: '出现次数',
            type: 'bar',
            // data: data
        }]
    };
};

const commonPieOption = () => {
    return {
        legend: {
            show: false,
        },
        toolbox: {
            show: true,
            feature: {
                mark: { show: true },
                dataView: { show: true, readOnly: false },
                restore: { show: true },
                saveAsImage: { show: true }
            }
        },
        series: [
            {
                name: '大乐透饼图分析',
                type: 'pie',
                radius: [20, 100],
                center: ['50%', '50%'],
                roseType: 'area',
                itemStyle: {
                    borderRadius: 8
                },
                // data: [
                //     { value: 40, name: 'rose 1' },
                //     { value: 38, name: 'rose 2' },
                //     { value: 32, name: 'rose 3' },
                //     { value: 30, name: 'rose 4' },
                //     { value: 28, name: 'rose 5' },
                //     { value: 26, name: 'rose 6' },
                //     { value: 22, name: 'rose 7' },
                //     { value: 18, name: 'rose 8' }
                // ]
            }
        ]
    };
};

const commonParallelOption = () => {
    const schema = [
        { name: '前1', index: 0, text: '前1' },
        { name: '前2', index: 1, text: '前2' },
        { name: '前3', index: 2, text: '前3' },
        { name: '前4', index: 3, text: '前4' },
        { name: '前5', index: 4, text: '前5' },
        { name: '后1', index: 5, text: '后1' },
        { name: '后2', index: 6, text: '后2' },
    ];
    const lineStyle = {
        width: 1,
        opacity: 0.5
    };
    const axis35 = generateList(35);
    const axis12 = generateList(12);
    return {
        backgroundColor: '#90aac6',
        legend: {
            show: false
        },
        tooltip: {
            padding: 10,
            backgroundColor: '#222',
            borderColor: '#777',
            borderWidth: 1
        },
        parallelAxis: [
            { 
                dim: 0,
                name: schema[0].text,
                interval: 1,
                min: 1,
                max: 35,
                data: axis35
            },
            { 
                dim: 1,
                name: schema[1].text,
                interval: 1,
                min: 1,
                max: 35,
                data: axis35
            },
            { 
                dim: 2,
                name: schema[2].text,
                interval: 1,
                min: 1,
                max: 35,
                data: axis35
            },
            { 
                dim: 3,
                name: schema[3].text,
                interval: 1,
                min: 1,
                max: 35,
                data: axis35
            },
            { 
                dim: 4,
                name: schema[4].text,
                interval: 1,
                min: 1,
                max: 35,
                data: axis35
            },
            { 
                dim: 5,
                name: schema[5].text,
                interval: 1,
                min: 1,
                max: 12,
                data: axis12
            },
            { 
                dim: 6,
                name: schema[6].text,
                interval: 1,
                min: 1,
                max: 12,
                data: axis12
            },
        ],
        visualMap: {
            show: false,
        },
        parallel: {
            left: '5%',
            right: '18%',
            bottom: 30,
            parallelAxisDefault: {
                type: 'value',
                name: 'AQI指数',
                nameLocation: 'end',
                nameGap: 20,
                nameTextStyle: {
                    color: '#fff',
                    fontSize: 12
                },
                axisLine: {
                    lineStyle: {
                        color: '#aaa'
                    }
                },
                axisTick: {
                    lineStyle: {
                        color: '#777'
                    }
                },
                splitLine: {
                    show: false
                },
                axisLabel: {
                    color: '#fff'
                }
            }
        },
        series: [
            {
                name: 'Beijing',
                type: 'parallel',
                lineStyle: lineStyle,
                data: []
            },
        ]
    };
};

export {
    commonBarOption,
    commonPieOption,
    commonParallelOption,
};