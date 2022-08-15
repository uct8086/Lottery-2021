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

export {
    commonBarOption
};